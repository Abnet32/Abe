import mongoose, { Document, Schema } from "mongoose";

export interface IOrderStatus extends Document {
  order_id: mongoose.Types.ObjectId;
  order_status_code: number; // store as numeric code if desired
  note?: string;
  changed_at?: Date;
}

const OrderStatusSchema = new Schema<IOrderStatus>(
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
  { timestamps: true }
);

export default mongoose.models.OrderStatus ||
  mongoose.model<IOrderStatus>("OrderStatus", OrderStatusSchema);
