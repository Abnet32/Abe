/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const InventorySchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    part_number: { type: String, unique: true, sparse: true },
    category: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number },
    min_stock_level: { type: Number, default: 5 },
  },
  { timestamps: true },
);

const Inventory =
  (models.Inventory as mongoose.Model<any>) ||
  model<any>("Inventory", InventorySchema);

export default Inventory;
