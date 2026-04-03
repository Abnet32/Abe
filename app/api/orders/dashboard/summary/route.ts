import { NextRequest } from "next/server";
import { getDashboardSummary } from "@/lib/server/controllers/orderController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function GET(request: NextRequest) {
  return runRoute(request, {}, getDashboardSummary, [auth, adminOrEmployee]);
}
