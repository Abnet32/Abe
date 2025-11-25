import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  // use ObjectId as employee_id (alias to _id)
  email: string;
  active_employee?: boolean;
  added_date?: Date;
  // other fields via EmployeeInfo/EmployeePass
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    email: { type: String, required: true, unique: true, index: true },
    active_employee: { type: Boolean, default: true },
    added_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", EmployeeSchema);
