/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/AdminDashboard.tsx
import React, { useEffect, useState, useCallback } from "react";
import { getAllData as getAllDataAPI } from "@/lib/api/order";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Users,
  UserPlus,
  Wrench,
  Menu,
  TrendingUp,
  CalendarDays,
  Package,
  X,
  LogOut,
  Home,
} from "lucide-react";
import type {
  Employee,
  Customer,
  Vehicle,
  Service,
  Order,
  InventoryItem,
  AdminView,
} from "@/types";

// Sub-components
import DashboardHome from "./admin/DashboardHome";
import DashboardOverview from "./admin/DashboardOverview";
import OrdersList from "./admin/OrdersList";
import CreateOrder from "./admin/CreateOrder";
import EmployeesList from "./admin/EmployeesList";
import AddEmployee from "./admin/AddEmployee";
import EmployeeDetail from "./admin/EmployeeDetail";
import CustomersList from "./admin/CustomersList";
import AddCustomer from "./admin/AddCustomer";
import CustomerDetail from "./admin/CustomerDetail";
import ServicesManager from "./admin/ServicesManager";
import InventoryManager from "./admin/InventoryManager";
import AppointmentCalendar from "./admin/AppointmentCalendar";

import Footer from "./Footer";

interface AdminDashboardProps {
  initialView?: AdminView;
  onNavigate: (view: AdminView, sectionId?: string) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialView = "dashboard",
  onNavigate,
  onLogout,
}) => {
  const [currentView, setCurrentView] = useState<AdminView>(initialView);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Backend-driven state
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services] = useState<Service[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string>("");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  // Selection states
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);

  const navigateTo = (view: AdminView, sectionId?: string) => {
    setCurrentView(view);
    onNavigate(view, sectionId);
  };

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  const handleEmployeeDone = async (nextView: AdminView = "employees") => {
    await fetchAllData();
    navigateTo(nextView);
  };

  const handleCustomerDone = async (nextView: AdminView = "customers") => {
    await fetchAllData();
    navigateTo(nextView);
  };

  const handleEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp);
    navigateTo("edit-employee");
  };

  const handleViewEmployee = (emp: Employee) => {
    setViewingEmployee(emp);
    navigateTo("employee-detail");
  };

  const handleEditCustomer = (cust: Customer) => {
    setEditingCustomer(cust);
    navigateTo("edit-customer");
  };
  const handleViewCustomer = (cust: Customer) => {
    setViewingCustomer(cust);
    navigateTo("customer-detail");
  };

  const addVehicle = (veh: Omit<Vehicle, "id">) =>
    setVehicles((prev) => [...prev, { ...veh, id: Date.now() }]);

  // --- Fetch backend data ---
  const fetchAllData = useCallback(async () => {
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const {
        orders: fetchedOrders,
        customers: fetchedCustomers,
        vehicles: fetchedVehicles,
        employees: fetchedEmployees,
      } = await getAllDataAPI();
      setOrders(fetchedOrders);

      setCustomers((prev) => {
        const map = new Map(prev.map((c) => [c.id, c]));
        for (const c of fetchedCustomers) map.set(c.id, c);
        return Array.from(map.values());
      });
      setVehicles((prev) => {
        const map = new Map(prev.map((v) => [v.id, v]));
        for (const v of fetchedVehicles) map.set(v.id, v);
        return Array.from(map.values());
      });
      setEmployees((prev) => {
        const map = new Map(prev.map((e) => [e.id, e]));
        for (const e of fetchedEmployees) map.set(e.id, e);
        return Array.from(map.values());
      });
    } catch (err: any) {
      console.error("Failed to fetch data:", err);
      setOrdersError(err?.message || "Failed to fetch orders");
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const addOrder = async () => {
    await fetchAllData();
    navigateTo("orders");
  };
  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    navigateTo("edit-order");
  };
  const handleUpdateOrder = (ord: Omit<Order, "status" | "id" | "date">) => {
    if (!editingOrder) return;
    setOrders((prev) =>
      prev.map((e) => (e.id === editingOrder.id ? { ...e, ...ord } : e)),
    );
    setEditingOrder(null);
    navigateTo("orders");
  };
  const updateOrderStatus = async (_id: number, _status: Order["status"]) => {
    await fetchAllData();
  };

  const addInventoryItem = (item: Omit<InventoryItem, "id">) => {
    // create an id matching InventoryItem['id'] (string or number depending on the type)
    const newItem = {
      ...item,
      id: String(Date.now()) as InventoryItem["id"],
    } as InventoryItem;
    setInventory((prev) => [...prev, newItem]);
  };
  const updateInventoryItem = (
    id: InventoryItem["id"],
    itemData: Partial<InventoryItem>,
  ) =>
    setInventory((prev) =>
      prev.map((i) =>
        i.id === id ? ({ ...i, ...itemData } as InventoryItem) : i,
      ),
    );
  const deleteInventoryItem = (id: InventoryItem["id"]) => {
    if (window.confirm("Delete this inventory item?"))
      setInventory((prev) => prev.filter((i) => i.id !== id));
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { id: "overview", label: "Overview", icon: <TrendingUp size={18} /> },
    { id: "inventory", label: "Inventory", icon: <Package size={18} /> },
    { id: "calendar", label: "Calendar", icon: <CalendarDays size={18} /> },
    { id: "new-order", label: "New Order", icon: <PlusCircle size={18} /> },
    { id: "orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { id: "add-employee", label: "Add Employee", icon: <UserPlus size={18} /> },
    { id: "employees", label: "Employees", icon: <Users size={18} /> },
    { id: "add-customer", label: "Add Customer", icon: <UserPlus size={18} /> },
    { id: "customers", label: "Customers", icon: <Users size={18} /> },
    { id: "services", label: "Services", icon: <Wrench size={18} /> },
  ];

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardHome setCurrentView={navigateTo} />;
      case "overview":
        return (
          <DashboardOverview
            orders={orders}
            employees={employees}
            customers={customers}
            services={services}
          />
        );
      case "calendar":
        return <AppointmentCalendar orders={orders} customers={customers} />;
      case "orders":
        if (ordersLoading)
          return <p className="text-center py-10">Loading orders...</p>;
        if (ordersError)
          return (
            <p className="text-center py-10 text-red-500">{ordersError}</p>
          );
        return (
          <OrdersList
            orders={orders}
            customers={customers}
            vehicles={vehicles}
            employees={employees}
            onEdit={handleEditOrder}
            onUpdateStatus={updateOrderStatus}
            onViewCustomer={handleViewCustomer}
          />
        );
      case "new-order":
        return (
          <CreateOrder
            customers={customers}
            vehicles={vehicles}
            services={services}
            employees={employees}
            onSubmit={addOrder}
            onAddVehicle={addVehicle}
            onAddCustomerClick={() => navigateTo("add-customer")}
          />
        );
      case "edit-order":
        return (
          <CreateOrder
            customers={customers}
            vehicles={vehicles}
            services={services}
            employees={employees}
            onSubmit={handleUpdateOrder}
            onAddVehicle={addVehicle}
            {...({
              initialData: editingOrder || undefined,
              isEditing: true,
              onAddCustomerClick: () => navigateTo("add-customer"),
            } as any)}
          />
        );
      case "inventory":
        return (
          <InventoryManager
            {...({
              inventory,
              onAdd: addInventoryItem,
              onUpdate: updateInventoryItem,
              onDelete: deleteInventoryItem,
            } as any)}
          />
        );
      case "employees":
        return (
          <EmployeesList
            {...({
              employees,
              onEdit: handleEditEmployee,
              onView: handleViewEmployee,
            } as any)}
          />
        );
      case "add-employee":
        return <AddEmployee onDone={() => handleEmployeeDone("employees")} />;
      case "edit-employee":
        return (
          <AddEmployee
            initialData={
              editingEmployee
                ? ({
                    ...editingEmployee,
                    id: String(editingEmployee.id),
                    password: editingEmployee.password ?? "",
                  } as any)
                : undefined
            }
            isEditing
            onDone={() => {
              setEditingEmployee(null);
              void handleEmployeeDone("employees");
            }}
          />
        );
      case "employee-detail":
        return viewingEmployee ? (
          <EmployeeDetail
            employee={viewingEmployee}
            orders={orders}
            vehicles={vehicles}
            customers={customers}
            onEdit={handleEditEmployee}
          />
        ) : (
          <EmployeesList
            {...({
              employees,
              onEdit: handleEditEmployee,
              onView: handleViewEmployee,
            } as any)}
          />
        );
      case "customers":
        return (
          <CustomersList
            onEdit={handleEditCustomer}
            onView={handleViewCustomer}
          />
        );
      case "add-customer":
        return <AddCustomer onDone={() => handleCustomerDone("customers")} />;
      case "edit-customer":
        return (
          <AddCustomer
            initialData={editingCustomer || undefined}
            isEditing
            onDone={() => {
              setEditingCustomer(null);
              void handleCustomerDone("customers");
            }}
          />
        );
      case "customer-detail":
        return viewingCustomer ? (
          <CustomerDetail
            {...({
              customer: viewingCustomer,
              orders,
              vehicles,
              onBack: () => navigateTo("customers"),
              onEdit: handleEditCustomer,
            } as any)}
          />
        ) : (
          <CustomersList
            onEdit={handleEditCustomer}
            onView={handleViewCustomer}
          />
        );
      case "services":
        return <ServicesManager />;
      default:
        return <DashboardHome setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <header className="lg:hidden h-16 bg-white shadow-md flex items-center justify-between px-4 shrink-0 sticky top-0 z-40">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-brand-blue hover:bg-gray-100 rounded transition-colors"
        >
          <Menu size={28} />
        </button>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-wide text-brand-blue font-heading">
            <span className="text-brand-red">Admin</span> Panel
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 flex">
          <div className="h-full w-1/2 bg-brand-red"></div>
          <div className="h-full w-1/2 bg-brand-blue"></div>
        </div>
      </header>
      <div className="flex flex-1 relative items-stretch">
        <aside
          className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 lg:z-40 w-64 md:w-72 bg-brand-blue border-r border-gray-700 transform transition-transform duration-200 ease-in-out flex flex-col lg:h-screen ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-24 shrink-0 flex items-center justify-between px-6 lg:justify-center border-b border-gray-700 bg-brand-blue">
            <div className="relative w-fit hidden lg:block">
              <div className="flex items-baseline gap-2">
                <h2
                  className="text-3xl font-bold text-white tracking-tight font-amharic cursor-pointer"
                  onClick={() => onNavigate("dashboard")}
                >
                  <span className="text-brand-red">አቤ</span> ጋራዥ
                </h2>
              </div>
              <div className="h-1 w-full bg-gray-800 mt-1 rounded-full overflow-hidden flex">
                <div className="h-full w-1/2 bg-white"></div>
                <div className="h-full w-1/2 bg-brand-red"></div>
              </div>
            </div>
            <div className="font-bold  text-xl text-white lg:hidden">
              <h2
                className="text-2xl font-bold text-white tracking-tight font-amharic cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <span className="text-brand-red">አቤ</span> ጋራዥ
              </h2>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>
          <nav
            className="flex-1 py-4 px-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id as AdminView);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-lg transition-colors ${
                  currentView === item.id
                    ? "bg-brand-red text-white shadow-md"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="pt-6 mt-6 border-t border-gray-700 space-y-2 mb-8">
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-lg text-gray-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Home size={18} />
                Back to Home
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 bg-gray-50 p-6 lg:p-10 overflow-x-hidden">
          {renderView()}
        </main>
      </div>
      <Footer
        onNavigate={(view, sectionId) => {
          // Map Footer views to AdminView or fallback to "dashboard"
          const adminViews: AdminView[] = [
            "dashboard",
            "overview",
            "inventory",
            "calendar",
            "new-order",
            "orders",
            "add-employee",
            "employees",
            "edit-employee",
            "employee-detail",
            "add-customer",
            "customers",
            "edit-customer",
            "customer-detail",
            "services",
            "edit-order",
          ];
          if (adminViews.includes(view as AdminView)) {
            onNavigate(view as AdminView, sectionId);
          } else {
            // Default to dashboard for non-AdminView values
            navigateTo("dashboard");
          }
        }}
        showAppointmentBanner={false}
      />
    </div>
  );
};

export default AdminDashboard;
