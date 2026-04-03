/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response } from "express";
import CustomerIdentifier from "../models/CustomerIdentifier";
import CustomerInfo from "../models/CustomerInfo";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await CustomerIdentifier.find().lean();
    const customerIds = customers.map((cust) => cust._id);
    const infos = await CustomerInfo.find({
      customer_id: { $in: customerIds },
    }).lean();
    const infoByCustomerId = new Map(
      infos.map((info) => [String(info.customer_id), info]),
    );

    const customerData = customers.map((cust) => {
      const info = infoByCustomerId.get(String(cust._id));
      return {
        id: cust._id,
        email: cust.email,
        phone: cust.phone_number,
        firstName: info?.first_name || "",
        lastName: info?.last_name || "",
        active: cust.active_customer_status ?? true,
        addedDate: cust.createdAt,
      };
    });

    res.json(customerData);
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const customerRegister = async (req: Request, res: Response) => {
  try {
    const { email, phone, firstName, lastName } = req.body;

    if (
      !email ||
      !phone ||
      !firstName ||
      !lastName ||
      !emailPattern.test(String(email).trim())
    ) {
      return res.status(400).json({
        message: "firstName, lastName, valid email, and phone are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPhone = String(phone).trim();

    const existing = await CustomerIdentifier.findOne({
      email: normalizedEmail,
    });
    if (existing)
      return res.status(400).json({ message: "Customer already exists" });

    const newCustomer = await CustomerIdentifier.create({
      email: normalizedEmail,
      phone_number: normalizedPhone,
    });

    await CustomerInfo.create({
      customer_id: newCustomer._id,
      first_name: String(firstName).trim(),
      last_name: String(lastName).trim(),
    });

    res
      .status(201)
      .json({ message: "Customer registered", customerId: newCustomer._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // customer id
    const { email, phone, firstName, lastName, active } = req.body;

    // Find and update CustomerIdentifier
    const customer = await CustomerIdentifier.findByIdAndUpdate(
      id,
      { email, phone_number: phone },
      { new: true },
    );
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    // Find and update CustomerInfo
    const info = await CustomerInfo.findOneAndUpdate(
      { customer_id: id },
      { first_name: firstName, last_name: lastName },
      { new: true },
    );

    res.json({
      message: "Customer updated successfully",
      customer: {
        id: customer._id,
        email: customer.email,
        phone: customer.phone_number,
        firstName: info?.first_name || "",
        lastName: info?.last_name || "",
        active: active ?? true,
      },
    });
  } catch (err) {
    console.error("Failed to update customer:", err);
    res.status(500).json({ message: "Server error" });
  }
};
