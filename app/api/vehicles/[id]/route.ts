import { NextRequest } from "next/server";
import {
  deleteVehicle,
  getVehicleById,
  updateVehicle,
} from "@/lib/server/controllers/vehicleController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, getVehicleById, [
    auth,
    adminOrEmployee,
  ]);
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, updateVehicle, [
    auth,
    adminOrEmployee,
  ]);
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, deleteVehicle, [
    auth,
    adminOrEmployee,
  ]);
}
