/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/service.ts
import type { Service } from "../types.ts";

const API_URL = "http://localhost:5000/api/services"; // adjust if needed

// ✅ Convert backend → frontend format
const transform = (s: any): Service => ({
  id: s._id,
  name: s.service_name,
  description: s.service_description,
  names: "",
  descriptions: ""
});

export const getServices = async (): Promise<Service[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch services");

  const data = await res.json();
  return data.map(transform);
};

export const addServiceAPI = async (
  service: Omit<Service, "id">
): Promise<Service> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_name: service.name,
      service_description: service.description,
    }),
  });

  if (!res.ok) throw new Error("Failed to add service");

  const data = await res.json();
  return transform(data);
};

export const updateServiceAPI = async (
  id: string,
  service: Omit<Service, "id">
): Promise<Service> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_name: service.name,
      service_description: service.description,
    }),
  });

  if (!res.ok) throw new Error("Failed to update service");

  const data = await res.json();
  return transform(data);
};

export const deleteServiceAPI = async (
  id: string
): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete service");
  return res.json();
};
