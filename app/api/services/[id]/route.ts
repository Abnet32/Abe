import { NextRequest } from "next/server";
import {
  deleteService,
  getServiceById,
  updateService,
} from "@/lib/server/controllers/serviceController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import {
  adminOrEmployee,
  adminOrEmployeeOrCustomer,
} from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, getServiceById, [
    auth,
    adminOrEmployeeOrCustomer,
  ]);
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, updateService, [
    auth,
    adminOrEmployee,
  ]);
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, deleteService, [
    auth,
    adminOrEmployee,
  ]);
}
