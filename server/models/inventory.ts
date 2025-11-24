import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  part_number: { type: String, unique: true },
  category: String,
  quantity: { type: Number, default: 0 },
  price: Number,
  min_stock_level: { type: Number, default: 5 },
});

export default mongoose.model("Inventory", inventorySchema);
