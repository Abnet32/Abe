/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import connectDB from "@/lib/server/configs/db";
import CustomerIdentifier from "@/lib/server/models/CustomerIdentifier";
import CustomerInfo from "@/lib/server/models/CustomerInfo";
import { auth } from "@/lib/server/middleware/authMiddleware";
import { adminOrEmployee } from "@/lib/server/middleware/roleMiddleware";
import { runExpressChain } from "@/lib/server/adapter";

export async function GET(request: NextRequest) {
  await connectDB();

  return runExpressChain({
    request,
    middlewares: [auth, adminOrEmployee],
    handler: async (
      req: { query?: { q?: string } },
      res: { json: (value: unknown) => void },
    ) => {
      const q = String(req.query?.q || "").trim();
      if (!q) {
        return res.json([]);
      }

      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      const customers = await CustomerIdentifier.find({
        $or: [{ email: regex }, { phone_number: regex }],
      })
        .limit(20)
        .lean();

      const infos = await CustomerInfo.find({
        customer_id: { $in: customers.map((customer) => customer._id) },
      }).lean();

      const infoMap = new Map(
        infos.map((info) => [String(info.customer_id), info]),
      );

      res.json(
        customers.map((customer) => {
          const info = infoMap.get(String(customer._id));
          return {
            id: String(customer._id),
            email: customer.email,
            phone: customer.phone_number,
            firstName: info?.first_name || "",
            lastName: info?.last_name || "",
          };
        }),
      );
    },
  });
}
