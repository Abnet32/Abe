import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}/employees`;

export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "Employee" | "Manager" | "Admin";
  password: string;
  active: boolean;
}

// GET all employees
export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ADD new employee
export const addEmployee = async (data: EmployeeData) => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
};

// UPDATE existing employee
export const updateEmployee = async (id: string, data: EmployeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// DELETE employee
export const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
