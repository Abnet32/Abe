import mongoose, { Document, Schema } from "mongoose";

export interface ICustomerInfo extends Document {
  customer_id: mongoose.Types.ObjectId;
  first_name?: string;
  last_name?: string;
}

const CustomerInfoSchema = new Schema<ICustomerInfo>(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "CustomerIdentifier",
      required: true,
      index: true,
      unique: true,
    },
    first_name: { type: String },
    last_name: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.CustomerInfo ||
  mongoose.model<ICustomerInfo>("CustomerInfo", CustomerInfoSchema);
