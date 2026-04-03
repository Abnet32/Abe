/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const EmployeeInfoSchema = new Schema(
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
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const EmployeeInfo =
  (models.EmployeeInfo as mongoose.Model<any>) ||
  model<any>("EmployeeInfo", EmployeeInfoSchema);

export default EmployeeInfo;
