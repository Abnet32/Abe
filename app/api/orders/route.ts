import { NextRequest } from "next/server";
import {
  createOrder,
  getOrders,
} from "@/lib/server/controllers/orderController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOnly } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function GET(request: NextRequest) {
  return runRoute(request, {}, getOrders, [auth, adminOnly] as unknown as Array<(...args: unknown[]) => unknown>);
}

export async function POST(request: NextRequest) {
  return runRoute(request, {}, createOrder, [auth, adminOnly] as unknown as Array<(...args: unknown[]) => unknown>);
}
