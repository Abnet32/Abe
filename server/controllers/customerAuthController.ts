import type { Request, Response } from "express";
import CustomerIdentifier from "../models/CustomerIdentifier.js";
import CustomerInfo from "../models/CustomerInfo.js";
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
