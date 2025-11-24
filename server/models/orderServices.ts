import mongoose from "mongoose";

const orderServiceSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
});

export default mongoose.model("OrderService", orderServiceSchema);
