import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Employee from "../models/Employee.ts";
import EmployeeInfo from "../models/EmployeeInfo.ts";
import EmployeePass from "../models/EmployeePass.ts";
import EmployeeRole from "../models/EmployeeRole.ts";
import CompanyRole from "../models/CompanyRole.ts";

// Get all employees
export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    const detailedEmployees = await Promise.all(
      employees.map(async (emp) => {
        const info = await EmployeeInfo.findOne({ employee_id: emp._id });
        const roleEntry = await EmployeeRole.findOne({ employee_id: emp._id });
        const role = roleEntry
          ? await CompanyRole.findById(roleEntry.company_role_id)
          : null;

        return {
          id: emp._id,
          firstName: info?.first_name || "",
          lastName: info?.last_name || "",
          email: emp.email,
          phone: info?.phone || "",
          role: role?.company_role_name || "Employee",
          active: info?.active ?? true,
          addedDate: emp.createdAt?.toISOString().split("T")[0] || "",
        };
      })
    );

    res.json(detailedEmployees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new employee
export const addEmployee = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, role, password, active } =
      req.body;

    // Check if email exists
    const existing = await Employee.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const employee = await Employee.create({ email });

    await EmployeeInfo.create({
      employee_id: employee._id,
      first_name: firstName,
      last_name: lastName,
      phone,
      active,
    });

    const hashed = await bcrypt.hash(password, 10);
    await EmployeePass.create({
      employee_id: employee._id,
      employee_password_hashed: hashed,
    });

    const roleDoc = await CompanyRole.findOne({ company_role_name: role });
    if (roleDoc) {
      await EmployeeRole.create({
        employee_id: employee._id,
        company_role_id: roleDoc._id,
      });
    }

    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, role, password, active } =
      req.body;

    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.email = email;
    await employee.save();

    const info = await EmployeeInfo.findOne({ employee_id: id });
    if (info) {
      info.first_name = firstName;
      info.last_name = lastName;
      info.phone = phone;
      info.active = active;
      await info.save();
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      const empPass = await EmployeePass.findOne({ employee_id: id });
      if (empPass) {
        empPass.employee_password_hashed = hashed;
        await empPass.save();
      }
    }

    // Update role
    const roleDoc = await CompanyRole.findOne({ company_role_name: role });
    const empRole = await EmployeeRole.findOne({ employee_id: id });
    if (roleDoc && empRole) {
      empRole.company_role_id = roleDoc._id;
      await empRole.save();
    }

    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Promise.all([
      Employee.findByIdAndDelete(id),
      EmployeeInfo.findOneAndDelete({ employee_id: id }),
      EmployeePass.findOneAndDelete({ employee_id: id }),
      EmployeeRole.findOneAndDelete({ employee_id: id }),
    ]);

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
