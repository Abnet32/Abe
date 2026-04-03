import { NextRequest } from "next/server";
import {
  deleteEmployee,
  updateEmployee,
} from "@/lib/server/controllers/employeeController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOnly } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, updateEmployee, [
    auth,
    adminOnly,
  ]);
}

export async function DELETE(request: NextRequest, context: Context) {
  const { id } = await context.params;
  return runRoute(request, { params: { id } }, deleteEmployee, [
    auth,
    adminOnly,
  ]);
}
