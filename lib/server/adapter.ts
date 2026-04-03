/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

type RunOptions = {
  request: NextRequest;
  params?: Record<string, string>;
  middlewares?: Array<(...args: any[]) => unknown>;
  handler: (...args: any[]) => unknown;
};

const parseBody = async (request: NextRequest) => {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD") {
    return undefined;
  }

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await request.text();
    return Object.fromEntries(new URLSearchParams(text));
  }

  const text = await request.text();
  return text ? { raw: text } : {};
};

export const runExpressChain = async ({
  request,
  params = {},
  middlewares = [],
  handler,
}: RunOptions): Promise<NextResponse> => {
  const body = await parseBody(request);
  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const headers = Object.fromEntries(request.headers.entries());

  const req: any = {
    method: request.method,
    params,
    query,
    body,
    headers,
    nextUrl: request.nextUrl,
    url: request.url,
  };

  const responseHeaders: Record<string, string> = {};
  let statusCode = 200;
  let settled = false;
  let resolvedResponse: NextResponse | null = null;

  const settle = (response: NextResponse) => {
    settled = true;
    resolvedResponse = response;
    return response;
  };

  const res: any = {
    locals: {},
    setHeader(key: string, value: string) {
      responseHeaders[key] = value;
    },
    status(code: number) {
      statusCode = code;
      return res;
    },
    json(payload: unknown) {
      return settle(
        NextResponse.json(payload, {
          status: statusCode,
          headers: responseHeaders,
        }),
      );
    },
    send(payload: unknown) {
      if (typeof payload === "object") {
        return res.json(payload);
      }

      return settle(
        new NextResponse(String(payload ?? ""), {
          status: statusCode,
          headers: responseHeaders,
        }),
      );
    },
  };

  const chain: Array<(...args: any[]) => unknown> = [...middlewares, handler];
  let index = -1;

  const dispatch = async (nextIndex: number): Promise<void> => {
    if (nextIndex <= index) {
      throw new Error("next() called multiple times");
    }

    index = nextIndex;
    const fn = chain[nextIndex];
    if (!fn || settled) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      let nextCalled = false;

      const next = (err?: unknown) => {
        if (nextCalled) {
          return;
        }
        nextCalled = true;

        if (err) {
          reject(err);
          return;
        }

        resolve();
      };

      Promise.resolve(fn(req, res, next))
        .then(() => {
          if (!nextCalled) {
            resolve();
          }
        })
        .catch(reject);
    });

    if (!settled) {
      await dispatch(nextIndex + 1);
    }
  };

  try {
    await dispatch(0);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }

  return (
    resolvedResponse ||
    NextResponse.json({ message: "No response from handler" }, { status: 500 })
  );
};
