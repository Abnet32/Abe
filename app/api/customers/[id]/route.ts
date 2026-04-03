import { NextRequest } from "next/server";
import { updateCustomer } from "@/lib/server/controllers/customerController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, updateCustomer, [
    auth,
    adminOrEmployee,
  ]);
}
