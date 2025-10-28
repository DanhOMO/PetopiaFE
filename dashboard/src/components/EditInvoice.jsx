"use client";

import { useState } from "react";
import {
  HiArrowLeft,
  HiUser,
  HiMail,
  HiCalendar,
  HiCurrencyDollar,
  HiCheckCircle,
  HiSave,
  HiX,
} from "react-icons/hi";

export default function EditInvoice({ invoice, onBack }) {
  const [formData, setFormData] = useState({
    id: invoice.id,
    client: invoice.client,
    email: invoice.email,
    startDate: invoice.startDate,
    dueDate: invoice.dueDate,
    amount: invoice.amount.replace("$", ""),
    status: invoice.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updated invoice:", formData);
    onBack();
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .glow-button {
          position: relative;
          overflow: hidden;
        }
        
        .glow-button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, 
            rgba(236, 72, 153, 0.8),
            rgba(139, 92, 246, 0.8),
            rgba(59, 130, 246, 0.8),
            rgba(236, 72, 153, 0.8)
          );
          background-size: 200% 100%;
          animation: gradient-shift 3s ease infinite;
          filter: blur(4px);
          opacity: 1;
        }
        
        .glow-button:hover::after {
          animation: gradient-shift 1.5s ease infinite;
          filter: blur(6px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-300"
        >
          <HiArrowLeft className="text-xl" />
          <span className="font-medium">Back to Invoices</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <HiCheckCircle className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Edit Invoice</h1>
            <p className="text-sm text-gray-500 mt-1">
              Update invoice details for {invoice.id}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Invoice ID (Read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Invoice ID
            </label>
            <input
              type="text"
              value={formData.id}
              disabled
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Client Name
            </label>
            <div className="relative">
              <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={formData.client}
                onChange={(e) => handleChange("client", e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter client name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <HiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="client@example.com"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <HiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Due Date
              </label>
              <div className="relative">
                <HiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <HiCurrencyDollar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
            >
              <HiX className="text-lg" />
              Cancel
            </button>
            <button
              type="submit"
              className="glow-button flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <HiSave className="text-lg" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
