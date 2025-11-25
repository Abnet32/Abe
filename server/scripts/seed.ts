import dotenv from "dotenv";
dotenv.config();
import connectDB from "../configs/db.js";
import Employee from "../models/Employee.js";
import EmployeeInfo from "../models/EmployeeInfo.js";
import EmployeePass from "../models/EmployeePass.js";
import CompanyRole from "../models/CompanyRole.js";
import EmployeeRole from "../models/EmployeeRole.js";
import CustomerIdentifier from "../models/CustomerIdentifier.js";
import CustomerInfo from "../models/CustomerInfo.js";
import CommonService from "../models/CommonService.js";
import Vehicle from "../models/Vehicle.js";
import Order from "../models/Order.js";
import OrderInfo from "../models/OrderInfo.js";
import OrderService from "../models/OrderService.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  await connectDB();
  // Clear some collections (be careful)
  await Employee.deleteMany({});
  await EmployeeInfo.deleteMany({});
  await EmployeePass.deleteMany({});
  await CompanyRole.deleteMany({});
  await EmployeeRole.deleteMany({});
  await CustomerIdentifier.deleteMany({});
  await CustomerInfo.deleteMany({});
  await CommonService.deleteMany({});
  await Vehicle.deleteMany({});
  await Order.deleteMany({});
  await OrderInfo.deleteMany({});
  await OrderService.deleteMany({});

  // Roles
  const adminRole = await CompanyRole.create({ company_role_name: "Admin" });
  const managerRole = await CompanyRole.create({
    company_role_name: "Manager",
  });
  const employeeRole = await CompanyRole.create({
    company_role_name: "Employee",
  });

  // Employee
  const emp = await Employee.create({ email: "admin@abe-garage.com" });
  await EmployeeInfo.create({
    employee_id: emp._id,
    first_name: "Abnet",
    last_name: "Mekonen",
    phone: "+251...",
  });
  const hashed = await bcrypt.hash("password123", 10);
  await EmployeePass.create({
    employee_id: emp._id,
    employee_password_hashed: hashed,
  });
  await EmployeeRole.create({
    employee_id: emp._id,
    company_role_id: adminRole._id,
  });

  // Customer + vehicle + service + order
  const cust = await CustomerIdentifier.create({
    email: "john@example.com",
    phone_number: "091...",
    customer_hash: "cust_abc123",
  });
  await CustomerInfo.create({
    customer_id: cust._id,
    first_name: "John",
    last_name: "Doe",
  });
  const vehicle = await Vehicle.create({
    customer_id: cust._id,
    year: "2022",
    make: "Toyota",
    model: "Corolla",
    mileage: 12000,
    tag: "AB1234",
  });
  const svc = await CommonService.create({
    service_name: "Oil change",
    service_description: "Change engine oil",
  });

  const order = await Order.create({
    customer_id: cust._id,
    employee_id: emp._id,
    vehicle_id: vehicle._id,
    order_hash: "ord_001",
    order_status: "Received",
  });
  await OrderInfo.create({
    order_id: order._id,
    order_total_price: 50,
    order_estimated_completion_date: new Date(Date.now() + 24 * 3600 * 1000),
  });
  await OrderService.create({ order_id: order._id, service_id: svc._id });

  console.log("Seed complete");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
