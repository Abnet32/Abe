import { NextRequest } from "next/server";
import {
  createService,
  getAllServices,
} from "@/lib/server/controllers/serviceController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import {
  adminOrEmployee,
  adminOrEmployeeOrCustomer,
} from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function GET(request: NextRequest) {
  return runRoute(request, {}, getAllServices, [
    auth,
    adminOrEmployeeOrCustomer,
  ]);
}

export async function POST(request: NextRequest) {
  return runRoute(request, {}, createService, [auth, adminOrEmployee]);
}
