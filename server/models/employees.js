import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  phone: String,
  role: {
    type: String,
    enum: ["Admin", "Manager", "Employee"],
    default: "Employee",
  },
  active: { type: Boolean, default: true },
  added_date: { type: Date, default: Date.now },
  password_hash: String,
});

export default mongoose.model("Employee", employeeSchema);
