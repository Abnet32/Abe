import mongoose, { Document, Schema } from "mongoose";

export interface IVehicle extends Omit<Document, "model"> {
  customer_id: mongoose.Types.ObjectId;
  year?: string;
  make?: string;
  model?: string;
  type?: string;
  mileage?: number;
  tag?: string;
  serial_number?: string;
  color?: string;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "CustomerIdentifier",
      required: true,
      index: true,
    },
    year: { type: String },
    make: { type: String },
    model: { type: String },
    type: { type: String },
    mileage: { type: Number, default: 0 },
    tag: { type: String },
    serial_number: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Vehicle ||
  mongoose.model<IVehicle>("Vehicle", VehicleSchema);
