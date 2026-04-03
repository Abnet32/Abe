/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const CompanyRoleSchema = new mongoose.Schema(
  {
    company_role_name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
);

const CompanyRole =
  (mongoose.models.CompanyRole as mongoose.Model<any>) ||
  mongoose.model<any>("CompanyRole", CompanyRoleSchema);

export default CompanyRole;
