/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const EmployeeSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true },
);

const Employee =
  (models.Employee as mongoose.Model<any>) ||
  model<any>("Employee", EmployeeSchema);

export default Employee;
