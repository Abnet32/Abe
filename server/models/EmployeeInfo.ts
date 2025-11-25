import mongoose, { Document, Schema } from "mongoose";

export interface IEmployeeInfo extends Document {
  employee_id: mongoose.Types.ObjectId;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

const EmployeeInfoSchema = new Schema<IEmployeeInfo>(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.EmployeeInfo ||
  mongoose.model<IEmployeeInfo>("EmployeeInfo", EmployeeInfoSchema);
