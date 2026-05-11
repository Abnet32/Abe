import React, { useMemo, useState } from "react";
import type { Order, Customer, Vehicle, Employee, Service } from "@/types";
import {
  Edit,
  ExternalLink,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
} from "lucide-react";
import { updateOrderStatus as updateOrderStatusAPI } from "@/lib/api/order";
import { useToast } from "@/components/ui/ToastProvider";
import { getApiErrorMessage } from "@/lib/api/errorMessage";

interface OrdersListProps {
  orders: Order[];
  customers: Customer[];
  vehicles: Vehicle[];
  employees: Employee[];
  services: Service[];
  onEdit: (order: Order) => void;
  onUpdateStatus: (id: number, status: Order["status"]) => void;
  onViewCustomer: (customer: Customer) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  customers,
  vehicles,
  employees,
  services,
  onEdit,
  onUpdateStatus,
  onViewCustomer,
}) => {
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Order["status"]>(
    "All",
  );
  const { showToast } = useToast();

  // Helper function to get status badge styling and info
  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "Completed":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          badge: "bg-green-500 text-white",
          icon: CheckCircle,
          label: "Completed",
        };
      case "In Progress":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          badge: "bg-red-500 text-white",
          icon: Clock,
          label: "In Progress",
        };
      case "Canceled":
        return {
          bg: "bg-slate-50",
          text: "text-slate-700",
          badge: "bg-slate-500 text-white",
          icon: AlertCircle,
          label: "Canceled",
        };
      default: // Received
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          badge: "bg-amber-500 text-white",
          icon: Package,
          label: "Received",
        };
    }
  };

  const handleStatusUpdate = async (
    orderId: number | string,
    currentStatus: Order["status"],
  ) => {
    const nextStatus =
      currentStatus === "Received"
        ? "In Progress"
        : currentStatus === "In Progress"
          ? "Completed"
          : "Received";

    setUpdatingStatus(Number(orderId));
    try {
      await updateOrderStatusAPI(String(orderId), nextStatus);
      onUpdateStatus(Number(orderId), nextStatus);
      showToast("Order status updated", "success", 2200);
    } catch (error) {
      console.error("Failed to update order status:", error);
      showToast(
        `Failed to update order status: ${getApiErrorMessage(error)}`,
        "error",
      );
    } finally {
      setUpdatingStatus(null);
    }
  };

  const statusCounts = useMemo(() => {
    const counts: Record<Order["status"], number> = {
      Received: 0,
      "In Progress": 0,
      Completed: 0,
      Canceled: 0,
    };
    for (const order of orders) {
      counts[order.status] += 1;
    }
    return counts;
  }, [orders]);

  const pendingCount = statusCounts.Received + statusCounts["In Progress"];

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== "All" && order.status !== statusFilter) {
        return false;
      }

      if (!term) return true;

      const customer = customers.find((c) => c.id === order.customerId);
      const vehicle = vehicles.find((v) => v.id === order.vehicleId);
      const employee = employees.find((e) => e.id === order.employeeId);
      const haystack = [
        String(order.id),
        order.hash || "",
        order.description || "",
        customer?.firstName || "",
        customer?.lastName || "",
        customer?.email || "",
        customer?.phone || "",
        vehicle?.make || "",
        vehicle?.model || "",
        vehicle?.tag || "",
        employee?.firstName || "",
        employee?.lastName || "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [customers, employees, orders, searchTerm, statusFilter, vehicles]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-heading">
            Orders Management
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Track, manage, and update order statuses in real-time
          </p>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
          Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-blue-600 uppercase font-bold tracking-wider">
              Total Orders
            </p>
            <p className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">
              {orders.length}
            </p>
            <p className="text-xs text-blue-600 mt-2">All time</p>
          </div>

          <div className="bg-linear-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-amber-600 uppercase font-bold tracking-wider">
              Pending
            </p>
            <p className="text-3xl md:text-4xl font-bold text-amber-900 mt-2">
              {pendingCount}
            </p>
            <p className="text-xs text-amber-600 mt-2">Needs action</p>
          </div>

          <div className="bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 uppercase font-bold tracking-wider">
              Received
            </p>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {statusCounts.Received}
            </p>
            <p className="text-xs text-gray-600 mt-2">Awaiting start</p>
          </div>

          <div className="bg-linear-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-red-600 uppercase font-bold tracking-wider">
              In Progress
            </p>
            <p className="text-3xl md:text-4xl font-bold text-red-900 mt-2">
              {statusCounts["In Progress"]}
            </p>
            <p className="text-xs text-red-600 mt-2">Being worked on</p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <p className="text-xs text-green-600 uppercase font-bold tracking-wider">
              Completed
            </p>
            <p className="text-3xl md:text-4xl font-bold text-green-900 mt-2">
              {statusCounts.Completed}
            </p>
            <p className="text-xs text-green-600 mt-2">Finished</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            Filters
          </h3>
          <span className="text-xs text-gray-500">
            {filteredOrders.length} of {orders.length} orders
          </span>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order ID, customer, vehicle, phone, email..."
              className="w-full border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
            />
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("All")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === "All"
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("Received")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === "Received"
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Received
            </button>
            <button
              onClick={() => setStatusFilter("In Progress")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === "In Progress"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter("Completed")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === "Completed"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatusFilter("Canceled")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === "Canceled"
                  ? "bg-slate-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Canceled
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-linear-to-r from-gray-50 to-gray-100 text-xs uppercase font-bold text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, idx) => {
                    const customer = customers.find(
                      (c) => c.id === order.customerId,
                    );
                    const vehicle = vehicles.find(
                      (v) => v.id === order.vehicleId,
                    );
                    const statusStyle = getStatusStyle(order.status);

                    return (
                      <tr
                        key={order.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-brand-blue">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {customer
                                ? `${customer.firstName} ${customer.lastName}`
                                : "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {customer?.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {vehicle
                                ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
                                : "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {vehicle?.tag}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              if (updatingStatus === order.id) return;
                              handleStatusUpdate(order.id, order.status);
                            }}
                            disabled={updatingStatus === order.id}
                            className={`px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                              updatingStatus === order.id
                                ? `${statusStyle.badge} opacity-50 cursor-not-allowed`
                                : `${statusStyle.badge} hover:shadow-md cursor-pointer`
                            }`}
                          >
                            {updatingStatus === order.id
                              ? "Updating..."
                              : order.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 flex gap-2 justify-end">
                          <button
                            onClick={() => onEdit(order)}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-brand-blue hover:bg-gray-100 transition-all"
                            title="Edit order"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => {
                              if (customer) onViewCustomer(customer);
                            }}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-brand-blue hover:bg-gray-100 transition-all"
                            title="View customer details"
                          >
                            <ExternalLink size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Package size={40} className="text-gray-300" />
                        <p className="text-gray-500 font-medium">
                          No orders found
                        </p>
                        <p className="text-gray-400 text-sm">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 lg:hidden">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const customer = customers.find((c) => c.id === order.customerId);
            const vehicle = vehicles.find((v) => v.id === order.vehicleId);
            const statusStyle = getStatusStyle(order.status);
            const StatusIcon = statusStyle.icon;

            return (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div
                  className={`${statusStyle.bg} border-b border-gray-100 px-4 py-4`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <StatusIcon size={18} className={statusStyle.text} />
                      <div>
                        <p className="font-bold text-brand-blue">
                          Order #{order.id}
                        </p>
                        {order.hash && (
                          <p className="text-xs text-gray-600">
                            Ref: {order.hash}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (updatingStatus === order.id) return;
                        handleStatusUpdate(order.id, order.status);
                      }}
                      disabled={updatingStatus === order.id}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                        updatingStatus === order.id
                          ? `${statusStyle.badge} opacity-50 cursor-not-allowed`
                          : `${statusStyle.badge} hover:shadow-md`
                      }`}
                    >
                      {updatingStatus === order.id
                        ? "Updating..."
                        : order.status}
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-4 py-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:border-r sm:border-gray-100 sm:pr-4">
                      <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2">
                        Customer
                      </p>
                      <p className="font-semibold text-gray-900">
                        {customer
                          ? `${customer.firstName} ${customer.lastName}`
                          : "Unknown customer"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {customer?.phone || "No phone"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {customer?.email || "No email"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2">
                        Vehicle
                      </p>
                      <p className="font-semibold text-gray-900">
                        {vehicle
                          ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
                          : "Unknown vehicle"}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Tag: {vehicle?.tag || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-gray-50 px-4 py-4 flex gap-2 border-t border-gray-100">
                  <button
                    onClick={() => onEdit(order)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-brand-blue border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (customer) onViewCustomer(customer);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-brand-blue border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <ExternalLink size={16} /> Customer
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 font-medium text-lg mb-1">
              No orders found
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
