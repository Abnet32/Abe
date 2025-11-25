import mongoose, { Document, Schema } from "mongoose";

export interface IInventory extends Document {
  name: string;
  part_number?: string;
  category?: string;
  quantity?: number;
  price?: number;
  min_stock_level?: number;
}

const InventorySchema = new Schema<IInventory>(
  {
    name: { type: String, required: true, index: true },
    part_number: { type: String, unique: true, sparse: true },
    category: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number },
    min_stock_level: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export default mongoose.models.Inventory ||
  mongoose.model<IInventory>("Inventory", InventorySchema);
