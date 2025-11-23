import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  phone: String,
  active: { type: Boolean, default: true },
  added_date: { type: Date, default: Date.now },
  hash: String,
});

export default mongoose.model("Customer", customerSchema);
