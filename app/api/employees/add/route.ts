import { NextRequest } from "next/server";
import { addEmployee } from "@/lib/server/controllers/employeeController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOnly } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function POST(request: NextRequest) {
  return runRoute(request, {}, addEmployee, [auth, adminOnly] as unknown as Array<(...args: unknown[]) => unknown>);
}
