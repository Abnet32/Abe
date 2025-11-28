import type { Request, Response } from "express";
import CustomerIdentifier from "../models/CustomerIdentifier.ts";
import CustomerInfo from "../models/CustomerInfo.ts";
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

// GET all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    // Populate customer info
    const customers = await CustomerIdentifier.find().lean();

    const customerData = await Promise.all(
      customers.map(async (cust) => {
        const info = await CustomerInfo.findOne({ customer_id: cust._id }).lean();
        return {
          id: cust._id,
          email: cust.email,
          phone: cust.phone_number,
          firstName: info?.first_name || "",
          lastName: info?.last_name || "",
          active: true, // default if not stored, or you can add `active` in model
        };
      })
    );

    res.json(customerData);
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    res.status(500).json({ message: "Server error" });
  }
};