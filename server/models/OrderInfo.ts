import mongoose, { Document, Schema } from "mongoose";

export interface IOrderInfo extends Document {
  order_id: mongoose.Types.ObjectId;
  order_total_price?: number;
  order_estimated_completion_date?: Date;
  order_completion_date?: Date;
  order_additional_requests?: string;
  order_additional_requests_completed?: boolean;
}

const OrderInfoSchema = new Schema<IOrderInfo>(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
      unique: true,
    },
    order_total_price: { type: Number, default: 0 },
    order_estimated_completion_date: { type: Date },
    order_completion_date: { type: Date },
    order_additional_requests: { type: String },
    order_additional_requests_completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.OrderInfo ||
  mongoose.model<IOrderInfo>("OrderInfo", OrderInfoSchema);
