"use client";

import { useState, useRef, useEffect } from "react";
import {
  HiOutlineDotsVertical,
  HiCalendar,
  HiSearch,
  HiFilter,
  HiCog,
  HiPlus,
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiExclamationCircle,
  HiPencil,
  HiEye,
  HiArchive,
  HiTrash,
  HiDocumentText,
} from "react-icons/hi";
import EditInvoice from "./EditInvoice";

const invoicesData = [
  {
    id: "#1846325",
    client: "Flowbite LLC",
    email: "flowbite@example.com",
    startDate: "2025-03-02",
    dueDate: "2025-03-09",
    amount: "$466",
    status: "Paid",
  },
  {
    id: "#1846326",
    client: "Jese Leos",
    email: "name@example.com",
    startDate: "2025-03-06",
    dueDate: "2025-03-07",
    amount: "$2000",
    status: "Unpaid",
  },
  {
    id: "#1846327",
    client: "Bonnie Green",
    email: "name@company.com",
    startDate: "2025-03-08",
    dueDate: "2025-03-12",
    amount: "$245",
    status: "Paid",
  },
  {
    id: "#1846328",
    client: "Themesberg LLC",
    email: "company@example.com",
    startDate: "2025-04-15",
    dueDate: "2025-04-18",
    amount: "$90",
    status: "Overdue",
  },
  {
    id: "#1846329",
    client: "Micheal Gough",
    email: "name@example.com",
    startDate: "2025-04-18",
    dueDate: "2025-04-21",
    amount: "$3040",
    status: "Pending",
  },
];

const statusColors = {
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Unpaid: "bg-rose-50 text-rose-700 border-rose-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Overdue: "bg-slate-50 text-slate-700 border-slate-200",
};

const statusIcons = {
  Paid: HiCheckCircle,
  Unpaid: HiXCircle,
  Pending: HiClock,
  Overdue: HiExclamationCircle,
};

export default function MyInvoices({ onCreateInvoice }) {
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    startDate: "",
    dueDate: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef();
  const filterButtonRef = useRef();

  const filteredInvoices = invoicesData.filter((inv) => {
    const matchesStatus =
      !filterOptions.status || inv.status === filterOptions.status;
    const matchesStartDate =
      !filterOptions.startDate ||
      new Date(inv.startDate) >= new Date(filterOptions.startDate);
    const matchesDueDate =
      !filterOptions.dueDate ||
      new Date(inv.dueDate) <= new Date(filterOptions.dueDate);
    const matchesSearch =
      !searchQuery ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesStartDate && matchesDueDate && matchesSearch;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
      if (
        showActionMenu &&
        !event.target.closest(`#action-menu-${showActionMenu}`)
      ) {
        setShowActionMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActionMenu]);

  const getDropdownPosition = () => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      };
    }
    return { top: 0, left: 0 };
  };

  if (selectedInvoice) {
    return (
      <EditInvoice
        invoice={selectedInvoice}
        onBack={() => setSelectedInvoice(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .glow-button {
          position: relative;
          overflow: visible;
        }
        
        .glow-button::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 20px;
          background: currentColor;
          filter: blur(12px);
          opacity: 0.4;
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        
        .glow-button:hover::after {
          height: 24px;
          filter: blur(16px);
          opacity: 0.5;
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

        .stat-card {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; opacity: 0; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <HiDocumentText className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Invoices</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track all your invoices
            </p>
          </div>
        </div>
        <button
          className="glow-button bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium hover:scale-105"
          onClick={() => onCreateInvoice()}
        >
          <HiPlus className="text-lg" />
          Create Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-3 rounded-xl">
              <HiCheckCircle className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Paid Invoices
          </h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$76,940</p>
          <p className="text-sm text-gray-500">350 invoices</p>
        </div>

        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-rose-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-rose-400 to-red-500 p-3 rounded-xl">
              <HiXCircle className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              -3.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Unpaid Invoices
          </h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$23,145</p>
          <p className="text-sm text-gray-500">64 invoices</p>
        </div>

        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl">
              <HiClock className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              +5.7%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Pending Invoices
          </h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$7,431</p>
          <p className="text-sm text-gray-500">14 invoices</p>
        </div>

        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-slate-400 to-gray-500 p-3 rounded-xl">
              <HiExclamationCircle className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
              +2.1%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Overdue Invoices
          </h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$2,826</p>
          <p className="text-sm text-gray-500">10 invoices</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fade-in-up border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by invoice ID, client, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex gap-3">
            <button
              ref={filterButtonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className="glow-button bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium hover:scale-105"
            >
              <HiFilter className="text-lg" />
              Filter
            </button>
            <button className="glow-button bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium hover:scale-105">
              <HiCog className="text-lg" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 z-50 animate-fade-in-up"
          style={{
            top: `${getDropdownPosition().top}px`,
            left: `${getDropdownPosition().left}px`,
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiFilter className="text-blue-600" />
            Filter Invoices
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={filterOptions.startDate}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      startDate: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <div className="relative">
                <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={filterOptions.dueDate}
                  onChange={(e) =>
                    setFilterOptions({
                      ...filterOptions,
                      dueDate: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Paid",
                  value: "Paid",
                  icon: HiCheckCircle,
                  color: "emerald",
                },
                {
                  label: "Unpaid",
                  value: "Unpaid",
                  icon: HiXCircle,
                  color: "rose",
                },
                {
                  label: "Pending",
                  value: "Pending",
                  icon: HiClock,
                  color: "amber",
                },
                {
                  label: "Overdue",
                  value: "Overdue",
                  icon: HiExclamationCircle,
                  color: "slate",
                },
              ].map((status) => {
                const Icon = status.icon;
                const isSelected = filterOptions.status === status.value;
                return (
                  <button
                    key={status.value}
                    onClick={() =>
                      setFilterOptions({
                        ...filterOptions,
                        status: isSelected ? "" : status.value,
                      })
                    }
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isSelected
                        ? `bg-${status.color}-50 border-${status.color}-400 text-${status.color}-700 shadow-md`
                        : `border-gray-200 text-gray-600 hover:border-${status.color}-300 hover:bg-${status.color}-50`
                    }`}
                  >
                    <Icon className="text-lg" />
                    {status.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() =>
                setFilterOptions({ status: "", startDate: "", dueDate: "" })
              }
              className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
            >
              Reset
            </button>
            <button
              onClick={() => setShowDropdown(false)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              Show {filteredInvoices.length} Results
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv, index) => {
                const StatusIcon = statusIcons[inv.status];
                return (
                  <tr
                    key={index}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 relative"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-800">
                        {inv.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-700">
                        {inv.client}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-600">{inv.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-600">{inv.startDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-600">{inv.dueDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-gray-800">
                        {inv.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold border ${
                          statusColors[inv.status]
                        }`}
                      >
                        <StatusIcon className="text-sm" />
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap relative">
                      <button
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === index ? null : index
                          )
                        }
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-all duration-300"
                      >
                        <HiOutlineDotsVertical className="text-gray-500 text-xl" />
                      </button>
                      {showActionMenu === index && (
                        <div
                          id={`action-menu-${index}`}
                          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up"
                        >
                          <button
                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 w-full transition-all duration-300 group"
                            onClick={() => setSelectedInvoice(inv)}
                          >
                            <HiPencil className="text-blue-600 text-lg group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">Edit Invoice</span>
                          </button>
                          <button className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 text-sm text-gray-700 w-full transition-all duration-300 group">
                            <HiEye className="text-green-600 text-lg group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">View Details</span>
                          </button>
                          <button className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-sm text-gray-700 w-full transition-all duration-300 group">
                            <HiArchive className="text-purple-600 text-lg group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">Archive</span>
                          </button>
                          <div className="border-t border-gray-100" />
                          <button className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 w-full transition-all duration-300 group">
                            <HiTrash className="text-lg group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
