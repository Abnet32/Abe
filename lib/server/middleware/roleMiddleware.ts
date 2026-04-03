import { type NextFunction, type Request, type Response } from "express";

export type AppRole = "admin" | "employee" | "customer";

const normalizeRole = (rawRole: unknown): AppRole | "" => {
  const role = String(rawRole || "").toLowerCase();
  if (role === "user") {
    return "customer";
  }
  if (role === "admin" || role === "employee" || role === "customer") {
    return role;
  }
  return "";
};

const hasAnyRole = (userRole: unknown, allowedRoles: AppRole[]) => {
  const normalizedRole = normalizeRole(userRole);
  return normalizedRole && allowedRoles.includes(normalizedRole);
};

const requireRoles = (allowedRoles: AppRole[], errorMessage: string) => {
  return (req: Request, res: Response, next?: NextFunction) => {
    const user = (req as Request & { user?: { role?: unknown } }).user;

    if (!user || !hasAnyRole(user.role, allowedRoles)) {
      return res.status(403).json({ message: errorMessage });
    }

    next?.();
  };
};

export const adminOnly = (req: Request, res: Response, next?: NextFunction) => {
  return requireRoles(["admin"], "Admin access only")(req, res, next);
};

export const adminOrEmployee = requireRoles(
  ["admin", "employee"],
  "Admin or employee access only",
);

export const adminOrEmployeeOrCustomer = requireRoles(
  ["admin", "employee", "customer"],
  "You do not have access to this resource",
);

export const customerOnly = requireRoles(["customer"], "Customer access only");
