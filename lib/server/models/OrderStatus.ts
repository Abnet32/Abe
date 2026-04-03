/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const OrderStatusSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    order_status_code: { type: Number, required: true },
    note: { type: String },
    changed_at: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const OrderStatus =
  (models.OrderStatus as mongoose.Model<any>) ||
  model<any>("OrderStatus", OrderStatusSchema);

export default OrderStatus;
