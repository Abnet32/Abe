import type{ Request, Response } from "express";
import Order from "../models/Order.ts";
import OrderInfo from "../models/OrderInfo.ts";
import OrderService from "../models/OrderService.ts";
import CustomerIdentifier from "../models/CustomerIdentifier.ts";
import CustomerInfo from "../models/CustomerInfo.ts";
import Vehicle from "../models/Vehicle.ts";
import EmployeeInfo from "../models/EmployeeInfo.ts";
import CommonService from "../models/CommonService.ts";

// -----------------------------
// GET ALL ORDERS
// -----------------------------
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("customer_id")
      .populate("employee_id")
      .populate("vehicle_id");

    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const info = await OrderInfo.findOne({ order_id: order._id });
        const services = await OrderService.find({
          order_id: order._id,
        }).populate("service_id");

        return {
          ...order.toObject(),
          info,
          services,
        };
      })
    );

    res.json(enrichedOrders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// -----------------------------
// GET ORDER BY ID
// -----------------------------
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer_id")
      .populate("employee_id")
      .populate("vehicle_id");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const info = await OrderInfo.findOne({ order_id: order._id });
    const services = await OrderService.find({ order_id: order._id }).populate(
      "service_id"
    );

    res.json({ ...order.toObject(), info, services });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// -----------------------------
// CREATE NEW ORDER
// -----------------------------
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customer_id, employee_id, vehicle_id, services, total_price } =
      req.body;

    const order = await Order.create({
      customer_id,
      employee_id,
      vehicle_id,
      order_status: "Received",
      order_hash: `ord_${Date.now()}`,
    });

    await OrderInfo.create({
      order_id: order._id,
      order_total_price: total_price || 0,
      order_estimated_completion_date: new Date(Date.now() + 86400000),
    });

    if (services && Array.isArray(services)) {
      for (const serviceId of services) {
        await OrderService.create({
          order_id: order._id,
          service_id: serviceId,
        });
      }
    }

    res.json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

// -----------------------------
// UPDATE ORDER STATUS
// -----------------------------
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { order_status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { order_status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
};

// -----------------------------
// DELETE ORDER
// -----------------------------
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.id;

    await OrderInfo.deleteOne({ order_id });
    await OrderService.deleteMany({ order_id });
    await Order.findByIdAndDelete(order_id);

    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};
