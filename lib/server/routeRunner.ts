/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/server/configs/db";
import { runExpressChain } from "@/lib/server/adapter";

type RouteContext = {
  params?: Record<string, string>;
};

type Handler = (req: any, res: any, next?: (err?: unknown) => void) => unknown;

export const runRoute = async (
  request: NextRequest,
  context: RouteContext,
  handler: Handler,
  middlewares: Handler[] = [],
): Promise<NextResponse> => {
  await connectDB();

  return runExpressChain({
    request,
    params: context.params,
    middlewares,
    handler,
  });
};
