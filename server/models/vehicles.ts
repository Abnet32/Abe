import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  year: String,
  make: String,
  model: String,
  type: String,
  mileage: String,
  tag: String,
  serial: String,
  color: String,
});

export default mongoose.model("Vehicle", vehicleSchema);
