import { NextRequest } from "next/server";
import {
  createVehicle,
  getVehicles,
} from "@/lib/server/controllers/vehicleController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function GET(request: NextRequest) {
  return runRoute(request, {}, getVehicles, [auth, adminOrEmployee]);
}

export async function POST(request: NextRequest) {
  return runRoute(request, {}, createVehicle, [auth, adminOrEmployee]);
}
