import { type NextFunction, type Request, type Response } from "express";
import { auth as betterAuth } from "@/lib/auth";

type SessionUser = NonNullable<
  Awaited<ReturnType<typeof betterAuth.api.getSession>>
>["user"];

const SESSION_LOOKUP_TIMEOUT_MS = 5000;

const getSessionWithTimeout = async (headers: Headers) => {
  return Promise.race([
    betterAuth.api.getSession({ headers }),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), SESSION_LOOKUP_TIMEOUT_MS);
    }),
  ]);
};

export const auth = async (
  req: Request,
  res: Response,
  next?: NextFunction,
) => {
  let session: Awaited<ReturnType<typeof getSessionWithTimeout>>;

  try {
    session = await getSessionWithTimeout(
      new Headers(req.headers as Record<string, string>),
    );
  } catch {
    return res.status(503).json({ message: "Auth service unavailable" });
  }

  if (!session) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  (req as Request & { user?: SessionUser }).user = session.user;
  next?.();
};
