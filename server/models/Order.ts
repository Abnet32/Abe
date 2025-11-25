import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  customer_id: mongoose.Types.ObjectId;
  employee_id?: mongoose.Types.ObjectId;
  vehicle_id?: mongoose.Types.ObjectId;
  order_date?: Date;
  order_hash?: string;
  order_status?: string; // better to store code, but keep string per design
}

const OrderSchema = new Schema<IOrder>(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "CustomerIdentifier",
      required: true,
      index: true,
    },
    employee_id: { type: Schema.Types.ObjectId, ref: "Employee" },
    vehicle_id: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    order_date: { type: Date, default: Date.now },
    order_hash: { type: String, unique: true, sparse: true, index: true },
    order_status: { type: String, default: "Received" },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
