import axios from "axios";

// Base URL for your backend
const API_BASE_URL = "http://localhost:5000/api";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
  message?: string;
}

// Employee / Admin login
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/auth/login`,
    data
  );
  return response.data;
};

// You can also add register function
interface RegisterData {
  email: string;
  password: string;
  role?: "admin" | "employee";
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
  return response.data;
};
