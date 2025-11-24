import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Received", "In Progress", "Completed", "Canceled"],
    default: "Received",
  },
  description: String,
  hash: String,
  estimated_completion_date: Date,
});

export default mongoose.model("Order", orderSchema);
