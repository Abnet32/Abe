import mongoose, { Document, Schema } from "mongoose";

export interface IOrderService extends Document {
  order_id: mongoose.Types.ObjectId;
  service_id: mongoose.Types.ObjectId;
  service_completed?: boolean;
}

const OrderServiceSchema = new Schema<IOrderService>(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    service_id: {
      type: Schema.Types.ObjectId,
      ref: "CommonService",
      required: true,
    },
    service_completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OrderServiceSchema.index({ order_id: 1, service_id: 1 }, { unique: true }); // composite unique

export default mongoose.models.OrderService ||
  mongoose.model<IOrderService>("OrderService", OrderServiceSchema);
