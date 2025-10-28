"use client";

import { useState, useRef, useEffect } from "react";
import {
  HiOutlineDotsVertical,
  HiEye,
  HiTrash,
  HiChevronDown,
  HiDownload,
  HiDocumentReport,
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiRefresh,
  HiCurrencyDollar,
  HiTrendingUp,
  HiShoppingCart,
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiCalendar,
} from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

const statusColors = {
  Completed:
    "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200",
  Failed:
    "bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border border-rose-200",
  Pending:
    "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200",
  Refunded:
    "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border border-purple-200",
};

const statusIcons = {
  Completed: HiCheckCircle,
  Failed: HiXCircle,
  Pending: HiClock,
  Refunded: HiRefresh,
};

const fakeData = [
  {
    id: "#1846325",
    customer: "Flowbite LLC",
    email: "flowbite@example.com",
    total: "$466",
    dueDate: "09 Mar 2025",
    status: "Completed",
    delivery: "Instant (digital)",
    products: [
      {
        name: "Flowbite Developer Edition",
        qty: 2,
        price: "$200",
        discount: "10%",
        total: "$360",
      },
      {
        name: "Flowbite Designer Edition",
        qty: 1,
        price: "$106",
        discount: "0%",
        total: "$106",
      },
    ],
    customerDetails: {
      name: "Flowbite LLC",
      email: "flowbite@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Louisville, USA",
    },
    orderHistory: [
      {
        id: "#1846320",
        date: "01 Jan 2025",
        total: "$300",
        status: "Completed",
      },
      {
        id: "#1846321",
        date: "15 Feb 2025",
        total: "$150",
        status: "Completed",
      },
    ],
  },
  {
    id: "#1846326",
    customer: "Jese Leos",
    email: "name@example.com",
    total: "$2000",
    dueDate: "07 Mar 2025",
    status: "Failed",
    delivery: "Instant (Digital)",
    products: [
      {
        name: "Premium Subscription",
        qty: 1,
        price: "$2000",
        discount: "0%",
        total: "$2000",
      },
    ],
    customerDetails: {
      name: "Jese Leos",
      email: "name@example.com",
      phone: "987-654-3210",
      address: "456 Oak St, City, USA",
    },
    orderHistory: [
      { id: "#1846322", date: "10 Feb 2025", total: "$500", status: "Failed" },
    ],
  },
  {
    id: "#1846327",
    customer: "Bonnie Green",
    email: "name@company.com",
    total: "$245",
    dueDate: "12 Mar 2025",
    status: "Completed",
    delivery: "Scheduled (Digital)",
    products: [
      {
        name: "Basic Plan",
        qty: 1,
        price: "$245",
        discount: "0%",
        total: "$245",
      },
    ],
    customerDetails: {
      name: "Bonnie Green",
      email: "name@company.com",
      phone: "555-123-4567",
      address: "789 Pine St, City, USA",
    },
    orderHistory: [
      {
        id: "#1846323",
        date: "20 Jan 2025",
        total: "$200",
        status: "Completed",
      },
    ],
  },
  {
    id: "#1846328",
    customer: "Themesberg LLC",
    email: "company@example.com",
    total: "$90",
    dueDate: "18 Apr 2025",
    status: "Refunded",
    delivery: "Scheduled (Digital)",
    products: [
      {
        name: "Themesberg Template",
        qty: 1,
        price: "$90",
        discount: "0%",
        total: "$90",
      },
    ],
    customerDetails: {
      name: "Themesberg LLC",
      email: "company@example.com",
      phone: "222-333-4444",
      address: "101 Elm St, City, USA",
    },
    orderHistory: [
      {
        id: "#1846324",
        date: "05 Mar 2025",
        total: "$100",
        status: "Refunded",
      },
    ],
  },
  {
    id: "#1846329",
    customer: "Micheal Gough",
    email: "name@example.com",
    total: "$3040",
    dueDate: "21 Apr 2025",
    status: "Pending",
    delivery: "Shipment (Packaging)",
    products: [
      {
        name: "Enterprise Plan",
        qty: 1,
        price: "$3040",
        discount: "0%",
        total: "$3040",
      },
    ],
    customerDetails: {
      name: "Micheal Gough",
      email: "name@example.com",
      phone: "111-222-3333",
      address: "202 Birch St, City, USA",
    },
    orderHistory: [],
  },
  {
    id: "#1846330",
    customer: "Lana Byrd",
    email: "name@example.com",
    total: "$2999",
    dueDate: "24 Apr 2025",
    status: "Completed",
    delivery: "Instant (Digital)",
    products: [
      {
        name: "Pro Subscription",
        qty: 1,
        price: "$2999",
        discount: "0%",
        total: "$2999",
      },
    ],
    customerDetails: {
      name: "Lana Byrd",
      email: "name@example.com",
      phone: "444-555-6666",
      address: "303 Cedar St, City, USA",
    },
    orderHistory: [],
  },
  {
    id: "#1846331",
    customer: "Netflix LLC",
    email: "company@example.com",
    total: "$1870",
    dueDate: "05 May 2025",
    status: "Completed",
    delivery: "Shipment (Packaging)",
    products: [
      {
        name: "Streaming License",
        qty: 1,
        price: "$1870",
        discount: "0%",
        total: "$1870",
      },
    ],
    customerDetails: {
      name: "Netflix LLC",
      email: "company@example.com",
      phone: "777-888-9999",
      address: "404 Maple St, City, USA",
    },
    orderHistory: [],
  },
  {
    id: "#1846332",
    customer: "Leslie Livingston",
    email: "name@example.com",
    total: "$5067",
    dueDate: "08 May 2025",
    status: "Refunded",
    delivery: "Shipment (Packaging)",
    products: [
      {
        name: "Enterprise Software",
        qty: 1,
        price: "$5067",
        discount: "0%",
        total: "$5067",
      },
    ],
    customerDetails: {
      name: "Leslie Livingston",
      email: "name@example.com",
      phone: "666-777-8888",
      address: "505 Walnut St, City, USA",
    },
    orderHistory: [],
  },
  {
    id: "#1846333",
    customer: "Bergside LLC",
    email: "company@example.com",
    total: "$60",
    dueDate: "02 May 2025",
    status: "Pending",
    delivery: "Instant (Digital)",
    products: [
      {
        name: "Basic Tool",
        qty: 1,
        price: "$60",
        discount: "0%",
        total: "$60",
      },
    ],
    customerDetails: {
      name: "Bergside LLC",
      email: "company@example.com",
      phone: "999-000-1111",
      address: "606 Spruce St, City, USA",
    },
    orderHistory: [],
  },
  {
    id: "#1846334",
    customer: "Robert Brown",
    email: "name@example.com",
    total: "$499",
    dueDate: "20 Jun 2025",
    status: "Completed",
    delivery: "Instant (Digital)",
    products: [
      {
        name: "Standard Plan",
        qty: 1,
        price: "$499",
        discount: "0%",
        total: "$499",
      },
    ],
    customerDetails: {
      name: "Robert Brown",
      email: "name@example.com",
      phone: "123-123-1234",
      address: "707 Oak St, City, USA",
    },
    orderHistory: [],
  },
  {
    id: "#1846335",
    customer: "Joseph McFall",
    email: "name@example.com",
    total: "$76",
    dueDate: "22 Jun 2025",
    status: "Completed",
    delivery: "Instant (Digital)",
    products: [
      { name: "Mini Tool", qty: 1, price: "$76", discount: "0%", total: "$76" },
    ],
    customerDetails: {
      name: "Joseph McFall",
      email: "name@example.com",
      phone: "234-234-2345",
      address: "808 Pine St, City, USA",
    },
    orderHistory: [],
  },
  {
    id: "#1846336",
    customer: "Neil Sims",
    email: "name@example.com",
    total: "$284",
    dueDate: "31 Jul 2025",
    status: "Completed",
    delivery: "Shipment (Packaging)",
    products: [
      {
        name: "Advanced Tool",
        qty: 1,
        price: "$284",
        discount: "0%",
        total: "$284",
      },
    ],
    customerDetails: {
      name: "Neil Sims",
      email: "name@example.com",
      phone: "345-345-3456",
      address: "909 Elm St, City, USA",
    },
    orderHistory: [],
  },
];
export default function Transactions({ onSelectTransaction }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
    label: "Tất cả",
  });
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportFromDate, setReportFromDate] = useState("");
  const [reportToDate, setReportToDate] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [actionMenuPosition, setActionMenuPosition] = useState({
    top: 0,
    right: 0,
  });
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectingFrom, setSelectingFrom] = useState(true);
  const [dateDropdownPosition, setDateDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const dateButtonRef = useRef(null);
  const dateDropdownRef = useRef(null);
  const actionDropdownRef = useRef(null);
  const actionButtonRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target) &&
        !dateButtonRef.current?.contains(event.target)
      ) {
        setShowDateDropdown(false);
      }
    };

    if (showDateDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDateDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionDropdownRef.current &&
        !actionDropdownRef.current.contains(event.target) &&
        !Object.values(actionButtonRefs.current).some((ref) =>
          ref?.contains(event.target)
        )
      ) {
        setShowActionMenu(null);
      }
    };

    if (showActionMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActionMenu]);

  useEffect(() => {
    if (showDateDropdown && dateButtonRef.current) {
      const rect = dateButtonRef.current.getBoundingClientRect();
      const dropdownHeight = 500; // Approximate height of dropdown
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Center the dropdown with padding from top and bottom
      const top = (windowHeight - dropdownHeight) / 2; // Center vertically
      const left = (windowWidth - 650) / 2; // Center horizontally (width is 650px)

      setDateDropdownPosition({
        top: Math.max(50, Math.min(top, windowHeight - dropdownHeight - 50)), // Ensure padding of 50px from top/bottom
        left: Math.max(0, left), // Ensure it stays within left boundary
      });
    }
  }, [showDateDropdown]);

  useEffect(() => {
    if (showActionMenu && actionButtonRefs.current[showActionMenu]) {
      const rect =
        actionButtonRefs.current[showActionMenu].getBoundingClientRect();
      setActionMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [showActionMenu]);

  const today = new Date("2025-10-03");
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);
  const last30 = new Date(today);
  last30.setDate(today.getDate() - 30);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const yearStart = new Date(today.getFullYear(), 0, 1);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const parseDueDate = (dueDateStr) => {
    const [day, month] = dueDateStr.split(" ");
    return new Date(`${month} ${day}, 2025`);
  };

  const filteredByDate = fakeData.filter((tx) => {
    const txDate = parseDueDate(tx.dueDate);
    if (!dateRange.from && !dateRange.to) return true;
    if (dateRange.from && !dateRange.to) return txDate >= dateRange.from;
    if (!dateRange.from && dateRange.to) return txDate <= dateRange.to;
    return txDate >= dateRange.from && txDate <= dateRange.to;
  });

  const filtered = filteredByDate.filter((tx) => {
    const matchSearch =
      tx.id.toLowerCase().includes(search.toLowerCase()) ||
      tx.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "All" || tx.status === filter;
    return matchSearch && matchStatus;
  });

  const getReportData = () => {
    const fromDate = reportFromDate ? new Date(reportFromDate) : null;
    const toDate = reportToDate ? new Date(reportToDate) : null;

    const reportData = fakeData.filter((tx) => {
      const txDate = parseDueDate(tx.dueDate);
      const isAfterFrom = !fromDate || txDate >= fromDate;
      const isBeforeTo = !toDate || txDate <= toDate;
      return isAfterFrom && isBeforeTo;
    });

    return reportData;
  };

  const reportData = getReportData();
  const totalTransactions = reportData.length;
  const totalAmount = reportData.reduce((sum, tx) => {
    const amount = Number.parseFloat(
      tx.total.replace("$", "").replace(",", "")
    );
    return isNaN(amount) ? sum : sum + amount;
  }, 0);
  const statusDistribution = reportData.reduce((acc, tx) => {
    acc[tx.status] = (acc[tx.status] || 0) + 1;
    return acc;
  }, {});

  const generateReport = () => {
    const reportDataObj = {
      generatedOn: new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      }),
      fromDate: reportFromDate || "N/A",
      toDate: reportToDate || "N/A",
      totalTransactions,
      totalAmount: `$${totalAmount.toFixed(2)}`,
      statusDistribution,
    };
    console.log("Report data:", reportDataObj);
    alert(
      "Report has been generated! Check console for details. (Download simulation)"
    );
    setShowReportModal(false);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isDateInRange = (date) => {
    if (!dateRange.from && !dateRange.to) return false;
    if (dateRange.from && !dateRange.to) {
      return date.toDateString() === dateRange.from.toDateString();
    }
    if (!dateRange.from && dateRange.to) {
      return date.toDateString() === dateRange.toDateString();
    }
    return date >= dateRange.from && date <= dateRange.to;
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date) => {
    if (selectingFrom) {
      setDateRange({ from: date, to: null, label: "Custom Range" });
      setSelectingFrom(false);
    } else {
      if (date < dateRange.from) {
        setDateRange({ from: date, to: dateRange.from, label: "Custom Range" });
      } else {
        setDateRange({ ...dateRange, to: date, label: "Custom Range" });
      }
      setSelectingFrom(true);
    }
  };

  const handlePresetClick = (preset) => {
    switch (preset) {
      case "today":
        setDateRange({ from: today, to: today, label: "Hôm nay" });
        break;
      case "yesterday":
        setDateRange({ from: yesterday, to: yesterday, label: "Hôm qua" });
        break;
      case "last7":
        setDateRange({ from: last7Days, to: today, label: "7 ngày qua" });
        break;
      case "last30":
        setDateRange({ from: last30, to: today, label: "30 ngày qua" });
        break;
      case "thisMonth":
        setDateRange({ from: monthStart, to: today, label: "Tháng này" });
        break;
      case "allTime":
        setDateRange({ from: null, to: null, label: "Tất cả" });
        break;
    }
    setSelectingFrom(true);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } =
      getDaysInMonth(calendarMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const inRange = isDateInRange(date);
      const isCurrentDay = isToday(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`calendar-day h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-110 ${
            inRange
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
              : isCurrentDay
              ? "bg-blue-100 text-blue-700 font-bold ring-2 ring-blue-400"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <style>{`
        @keyframes glow-move {
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .stat-card {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; opacity: 0; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; opacity: 0; }

        .table-row {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .calendar-day {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .calendar-day:hover {
          transform: scale(1.1);
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg">
            <HiShoppingCart className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Transactions</h2>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý và theo dõi tất cả giao dịch
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="glow-button flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-semibold hover:scale-105"
        >
          <HiDocumentReport className="text-lg" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-3 rounded-xl">
              <HiCheckCircle className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
              <HiTrendingUp className="text-sm" />
              +12.5%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Hoàn thành</h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$15,835</p>
          <p className="text-sm text-gray-500">7 giao dịch</p>
        </div>

        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl">
              <HiClock className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1">
              <HiTrendingUp className="text-sm" />
              +5.2%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Đang chờ</h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$3,100</p>
          <p className="text-sm text-gray-500">2 giao dịch</p>
        </div>

        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-purple-400 to-violet-500 p-3 rounded-xl">
              <HiRefresh className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full flex items-center gap-1">
              <HiTrendingUp className="text-sm" />
              +2.1%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Hoàn tiền</h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$90</p>
          <p className="text-sm text-gray-500">1 giao dịch</p>
        </div>

        <div className="stat-card bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-xl">
              <HiCurrencyDollar className="text-white text-2xl" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1">
              <HiTrendingUp className="text-sm" />
              +8.3%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Tổng doanh thu
          </h3>
          <p className="text-3xl font-bold text-gray-800 mb-1">$19,025</p>
          <p className="text-sm text-gray-500">10 giao dịch</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4 animate-fade-in-up">
        <div className="relative w-full md:w-1/3 flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm theo ID hoặc Khách hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300 bg-white shadow-md hover:shadow-lg"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <button
              ref={dateButtonRef}
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-3 px-6 py-3 border-2 border-blue-200 rounded-xl bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-semibold hover:scale-105 hover:border-blue-300"
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <HiCalendar className="text-white text-lg" />
              </div>
              <span className="text-gray-700">{dateRange.label}</span>
              <HiChevronDown
                className={`transition-transform duration-300 text-blue-600 ${
                  showDateDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <button className="glow-button flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-semibold hover:scale-105">
            <HiDownload className="text-lg" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white rounded-xl shadow-md p-1.5 inline-flex gap-1.5 animate-fade-in-up border border-gray-100">
        {[
          { label: "All", value: "All", icon: null },
          { label: "Completed", value: "Completed", icon: HiCheckCircle },
          { label: "Pending", value: "Pending", icon: HiClock },
          { label: "Refunded", value: "Refunded", icon: HiRefresh },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`px-5 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2 ${
                filter === s.value
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {Icon && <Icon className="text-lg" />}
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="overflow-auto bg-white rounded-2xl shadow-lg animate-fade-in-up border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-slate-50 border-b-2 border-blue-200">
              <th className="px-4 py-4 text-left">
                <input type="checkbox" className="rounded w-4 h-4" />
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider">
                Customer
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider">
                Email
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider">
                Total
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider">
                Delivery
              </th>
              <th className="px-4 py-4 text-left font-bold text-gray-700 uppercase text-xs tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx, index) => {
              const StatusIcon = statusIcons[tx.status];
              return (
                <tr
                  key={tx.id}
                  className="table-row border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-md"
                  style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                >
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded w-4 h-4" />
                  </td>
                  <td className="px-4 py-4 font-bold text-gray-900">{tx.id}</td>
                  <td className="px-4 py-4 font-semibold text-gray-700">
                    {tx.customer}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{tx.email}</td>
                  <td className="px-4 py-4 font-bold text-blue-600">
                    {tx.total}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{tx.dueDate}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        statusColors[tx.status]
                      } shadow-sm`}
                    >
                      <StatusIcon className="text-sm" />
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{tx.delivery}</td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <button
                        ref={(el) => (actionButtonRefs.current[tx.id] = el)}
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === tx.id ? null : tx.id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
                      >
                        <HiOutlineDotsVertical className="text-gray-600 text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showDateDropdown && (
        <div
          ref={dateDropdownRef}
          className="fixed w-[650px] h-[600px] bg-white rounded-3xl shadow-3xl border-2 border-blue-100 overflow-hidden animate-scale-in"
          style={{
            top: `${dateDropdownPosition.top}px`,
            left: `${dateDropdownPosition.left}px`,
            zIndex: 10000,
          }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <HiCalendar className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Select Date Range</h3>
                <p className="text-xs text-blue-100">
                  Choose from presets or pick custom dates
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDateDropdown(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <HiX className="text-2xl" />
            </button>
          </div>

          <div className="flex h-[440px]">
            <div className="w-48 bg-gradient-to-b from-slate-50 via-gray-50 to-blue-50 border-r-2 border-blue-100 p-4 space-y-2 overflow-y-auto">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Quick Select
              </p>
              {[
                { label: "Hôm nay", value: "today", icon: "📅" },
                { label: "Hôm qua", value: "yesterday", icon: "⏮️" },
                { label: "7 ngày qua", value: "last7", icon: "📊" },
                { label: "30 ngày qua", value: "last30", icon: "📈" },
                { label: "Tháng này", value: "thisMonth", icon: "🗓️" },
                { label: "Tất cả", value: "allTime", icon: "♾️" },
              ].map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetClick(preset.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold flex items-center gap-3 group ${
                    dateRange.label === preset.label
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:scale-105"
                  }`}
                >
                  <span className="text-lg">{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => {
                    const newMonth = new Date(calendarMonth);
                    newMonth.setMonth(newMonth.getMonth() - 1);
                    setCalendarMonth(newMonth);
                  }}
                  className="p-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 rounded-xl transition-all duration-200 hover:scale-110 shadow-md"
                >
                  <HiChevronLeft className="text-xl text-blue-700" />
                </button>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {calendarMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <button
                  onClick={() => {
                    const newMonth = new Date(calendarMonth);
                    newMonth.setMonth(newMonth.getMonth() + 1);
                    setCalendarMonth(newMonth);
                  }}
                  className="p-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 rounded-xl transition-all duration-200 hover:scale-110 shadow-md"
                >
                  <HiChevronRight className="text-xl text-blue-700" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-3">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="h-10 flex items-center justify-center text-xs font-bold text-gray-500 uppercase"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 mb-6">
                {renderCalendar()}
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg">
                    <HiCalendar className="text-white text-sm" />
                  </div>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {selectingFrom
                      ? "📍 Selecting Start Date"
                      : "📍 Selecting End Date"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm mb-4">
                  <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-blue-200">
                    <p className="text-xs text-gray-500 mb-1">From</p>
                    <p className="font-bold text-gray-800">
                      {dateRange.from
                        ? formatDate(dateRange.from)
                        : "Select start"}
                    </p>
                  </div>
                  <div className="text-blue-600 text-xl">→</div>
                  <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-blue-200">
                    <p className="text-xs text-gray-500 mb-1">To</p>
                    <p className="font-bold text-gray-800">
                      {dateRange.to ? formatDate(dateRange.to) : "Select end"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDateDropdown(false);
                    setSelectingFrom(true);
                  }}
                  className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <HiCheckCircle className="text-lg" />
                  Apply Date Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10002] flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <HiDocumentReport className="text-3xl" />
                <h3 className="text-2xl font-bold">
                  Generate Transaction Report
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <HiX className="text-2xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={reportFromDate}
                    onChange={(e) => setReportFromDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={reportToDate}
                    onChange={(e) => setReportToDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HiDocumentReport className="text-blue-600" />
                  Report Summary
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {totalTransactions}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Status Distribution
                  </p>
                  <div className="space-y-2">
                    {Object.entries(statusDistribution).map(
                      ([status, count]) => (
                        <div
                          key={status}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-600">
                            {status}
                          </span>
                          <span className="text-sm font-bold text-gray-800">
                            {count}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateReport}
                  className="flex-1 glow-button flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-semibold hover:scale-105"
                >
                  <HiDownload className="text-lg" />
                  Download Report
                </button>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 text-sm font-semibold text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showActionMenu && (
        <div
          ref={actionDropdownRef}
          className="fixed w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in-up"
          style={{
            top: `${actionMenuPosition.top}px`,
            right: `${actionMenuPosition.right}px`,
            zIndex: 10001,
          }}
        >
          <button
            onClick={() => {
              onSelectTransaction(
                filtered.find((tx) => tx.id === showActionMenu)
              );
              setShowActionMenu(null);
            }}
            className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 flex items-center gap-3 text-sm font-medium text-gray-700 group"
          >
            <HiEye className="text-blue-600 text-lg group-hover:scale-110 transition-transform duration-200" />
            View Details
          </button>
          <hr className="border-gray-200" />
          <button
            onClick={() => setShowActionMenu(null)}
            className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-200 flex items-center gap-3 text-red-600 text-sm font-medium group"
          >
            <HiTrash className="text-lg group-hover:scale-110 transition-transform duration-200" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
