import { NextRequest } from "next/server";
import {
  createInventoryItem,
  getInventory,
} from "@/lib/server/controllers/inventoryController";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runRoute } from "@/lib/server/routeRunner";

export async function GET(request: NextRequest) {
  return runRoute(request, {}, getInventory, [auth, adminOrEmployee]);
}

export async function POST(request: NextRequest) {
  return runRoute(request, {}, createInventoryItem, [auth, adminOrEmployee]);
}
