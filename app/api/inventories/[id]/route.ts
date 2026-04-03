import { NextRequest } from "next/server";
import {
  deleteInventoryItem,
  getInventoryById,
  updateInventoryItem,
} from "@/lib/server/controllers/inventoryController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, getInventoryById, [
    auth,
    adminOrEmployee,
  ]);
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, updateInventoryItem, [
    auth,
    adminOrEmployee,
  ]);
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, deleteInventoryItem, [
    auth,
    adminOrEmployee,
  ]);
}
