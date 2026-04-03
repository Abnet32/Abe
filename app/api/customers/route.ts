import { NextRequest } from "next/server";
import {
  customerRegister,
  getAllCustomers,
} from "@/lib/server/controllers/customerController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOnly } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function GET(request: NextRequest) {
  return runRoute(request, {}, getAllCustomers, [auth, adminOnly] as unknown as Array<(...args: unknown[]) => unknown>);
}

export async function POST(request: NextRequest) {
  return runRoute(request, {}, customerRegister, [auth, adminOnly] as unknown as Array<(...args: unknown[]) => unknown>);
}
