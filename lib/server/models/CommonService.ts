/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    service_name: { type: String, required: true, index: true },
    service_description: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const CommonService =
  (mongoose.models.CommonService as mongoose.Model<any>) ||
  mongoose.model<any>("CommonService", ServiceSchema);

export default CommonService;
