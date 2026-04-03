/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CustomerIdentifierSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    phone_number: { type: String }, // you can set unique: true if needed
    added_date: { type: Date, default: Date.now },
    customer_hash: { type: String, unique: true, sparse: true },
    active_customer_status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const CustomerIdentifier =
  (models.CustomerIdentifier as mongoose.Model<any>) ||
  model<any>("CustomerIdentifier", CustomerIdentifierSchema);

export default CustomerIdentifier;
