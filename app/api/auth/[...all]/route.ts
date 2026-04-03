import { toNextJsHandler } from "better-auth/next-js";
import { auth, ensureAuthMongoConnected } from "@/lib/auth";

const handlers = toNextJsHandler(auth);

const withAuthDb =
  (handler: (...args: never[]) => unknown) =>
  async (...args: never[]) => {
    await ensureAuthMongoConnected();
    return handler(...args);
  };

export const GET = withAuthDb(handlers.GET);
export const POST = withAuthDb(handlers.POST);
export const PUT = withAuthDb(handlers.PUT);
export const PATCH = withAuthDb(handlers.PATCH);
export const DELETE = withAuthDb(handlers.DELETE);
