import mongoose, { Document, Schema } from "mongoose";

export interface IEmployeeRole extends Document {
  employee_id: mongoose.Types.ObjectId;
  company_role_id: mongoose.Types.ObjectId;
}

const EmployeeRoleSchema = new Schema<IEmployeeRole>(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
      unique: true,
    },
    company_role_id: {
      type: Schema.Types.ObjectId,
      ref: "CompanyRole",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.EmployeeRole ||
  mongoose.model<IEmployeeRole>("EmployeeRole", EmployeeRoleSchema);
