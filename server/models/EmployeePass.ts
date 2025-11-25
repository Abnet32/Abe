import mongoose, { Document, Schema } from "mongoose";

export interface IEmployeePass extends Document {
  employee_id: mongoose.Types.ObjectId;
  employee_password_hashed: string;
}

const EmployeePassSchema = new Schema<IEmployeePass>(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
      index: true,
    },
    employee_password_hashed: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.EmployeePass ||
  mongoose.model<IEmployeePass>("EmployeePass", EmployeePassSchema);
