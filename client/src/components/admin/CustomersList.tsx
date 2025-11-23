import React from "react";
import type { Customer } from "../../types.ts";
import { Edit, Trash2, ExternalLink } from "lucide-react";

interface CustomersListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

const CustomersList: React.FC<CustomersListProps> = ({
  customers,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-heading relative inline-block">
          Customers
          <div className="absolute -right-20 top-1/2 h-[3px] w-16 bg-brand-red hidden md:block"></div>
        </h2>
      </div>

      <div className="bg-white p-6 mb-6 rounded-lg border border-gray-200 shadow-sm">
        <input
          type="text"
          placeholder="Search for a customer using first name, last name, email address or phone number"
          className="w-full text-sm p-3 outline-none placeholder-gray-400 bg-white text-gray-800"
        />
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-700">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Added Date</th>
                <th className="px-6 py-4">Active</th>
                <th className="px-6 py-4">Edit</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr
                  key={cust.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold">{cust.id}</td>
                  <td className="px-6 py-4 font-bold text-brand-blue">
                    {cust.firstName}
                  </td>
                  <td className="px-6 py-4">{cust.lastName}</td>
                  <td className="px-6 py-4">{cust.email}</td>
                  <td className="px-6 py-4">{cust.phone}</td>
                  <td className="px-6 py-4">{cust.addedDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        cust.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cust.active ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => onEdit(cust)}
                      className="text-gray-400 hover:text-brand-blue transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(cust.id)}
                      className="text-gray-400 hover:text-brand-red transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-brand-blue">
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-8 text-center text-gray-500 italic"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
