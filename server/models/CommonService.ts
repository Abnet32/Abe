import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  service_name: string;
  service_description?: string;
  active?: boolean;
}

const ServiceSchema = new Schema<IService>(
  {
    service_name: { type: String, required: true, index: true },
    service_description: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.CommonService ||
  mongoose.model<IService>("CommonService", ServiceSchema);
