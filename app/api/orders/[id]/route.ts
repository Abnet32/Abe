import { NextRequest } from "next/server";
import {
  deleteOrder,
  getOrderById,
  updateOrder,
} from "@/lib/server/controllers/orderController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, getOrderById, [
    auth,
    adminOrEmployee,
  ]);
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, updateOrder, [
    auth,
    adminOrEmployee,
  ]);
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, deleteOrder, [
    auth,
    adminOrEmployee,
  ]);
}
