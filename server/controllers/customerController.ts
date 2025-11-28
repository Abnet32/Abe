import type { Request, Response } from "express";
import CustomerIdentifier from "../models/CustomerIdentifier.ts";
import CustomerInfo from "../models/CustomerInfo.ts";
import Vehicle from "../models/Vehicle.ts";
import bcrypt from "bcryptjs"; // optional if you want password
import jwt from "jsonwebtoken";

export const customerLogin = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.body;

    // Find customer by email
    const customer = await CustomerIdentifier.findOne({ email });
    if (!customer)
      return res.status(400).json({ message: "Invalid email or phone" });

    // For now, login via phone number as a simple check
    if (customer.phone_number !== phone) {
      return res.status(400).json({ message: "Invalid email or phone" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: customer._id, type: "customer" },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      customer_id: customer._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const registerCustomer = async (req: Request, res: Response) => {
  try {
    const { email, phone, firstName, lastName, vehicles } = req.body;

    // Check if customer exists
    const existing = await CustomerIdentifier.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Customer already exists" });

    // Create customer identifier
    const customer = await CustomerIdentifier.create({
      email,
      phone_number: phone,
      customer_hash: `cust_${Date.now()}`, // simple hash
    });

    // Create customer info
    await CustomerInfo.create({
      customer_id: customer._id,
      first_name: firstName,
      last_name: lastName,
    });

    // Create vehicles (array of vehicles)
    if (vehicles && vehicles.length > 0) {
      for (const v of vehicles) {
        await Vehicle.create({
          customer_id: customer._id,
          year: v.year,
          make: v.make,
          model: v.model,
          mileage: v.mileage,
          tag: v.tag,
        });
      }
    }

    res.status(201).json({
      message: "Customer registered successfully",
      customer_id: customer._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
