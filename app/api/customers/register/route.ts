import { NextRequest } from "next/server";
import { customerRegister } from "@/lib/server/controllers/customerController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOnly } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function POST(request: NextRequest) {
  return runRoute(request, {}, customerRegister, [auth, adminOnly] as unknown as Array<(...args: unknown[]) => unknown>);
}
