import mongoose, { Document, Schema } from "mongoose";

export interface ICompanyRole extends Document {
  company_role_name: string;
  // e.g. Admin, Manager, Employee
}

const CompanyRoleSchema = new Schema<ICompanyRole>(
  {
    company_role_name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CompanyRole ||
  mongoose.model<ICompanyRole>("CompanyRole", CompanyRoleSchema);
