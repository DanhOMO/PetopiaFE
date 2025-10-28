"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import { TrendingUp, TrendingDown, Crown, CalendarIcon, X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function PetStatistics() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (type, value) => {
    if (!value) return;
    const newDate = new Date(value);
    setDateRange((prev) => ({
      ...prev,
      [type]: newDate,
    }));
  };

  const toInputFormat = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Data for charts
  const bestSellingData = [
    { name: "Chó Golden", sales: 145, color: "#ec4899" },
    { name: "Mèo Ba Tư", sales: 132, color: "#8b5cf6" },
    { name: "Chó Corgi", sales: 118, color: "#3b82f6" },
    { name: "Mèo Anh", sales: 98, color: "#06b6d4" },
    { name: "Chó Poodle", sales: 87, color: "#f59e0b" },
    { name: "Hamster", sales: 76, color: "#10b981" },
  ];

  const statusData = [
    { name: "Khỏe Mạnh", value: 1547, color: "#10b981" },
    { name: "Đang Điều Trị", value: 234, color: "#f59e0b" },
    { name: "Cần Chăm Sóc", value: 89, color: "#ef4444" },
    { name: "Đang Kiểm Tra", value: 145, color: "#3b82f6" },
  ];

  const salesData = [
    { month: "T1", sold: 145, revenue: 320 },
    { month: "T2", sold: 178, revenue: 398 },
    { month: "T3", sold: 165, revenue: 365 },
    { month: "T4", sold: 198, revenue: 445 },
    { month: "T5", sold: 223, revenue: 502 },
    { month: "T6", sold: 245, revenue: 558 },
    { month: "T7", sold: 267, revenue: 612 },
    { month: "T8", sold: 289, revenue: 665 },
    { month: "T9", sold: 312, revenue: 723 },
    { month: "T10", sold: 298, revenue: 689 },
    { month: "T11", sold: 334, revenue: 778 },
    { month: "T12", sold: 356, revenue: 825 },
  ];

  const topCustomers = [
    {
      name: "Nguyễn Văn A",
      purchases: 45,
      amount: "₫125M",
      avatar: "👨",
      rank: 1,
    },
    {
      name: "Trần Thị B",
      purchases: 38,
      amount: "₫98M",
      avatar: "👩",
      rank: 2,
    },
    { name: "Lê Văn C", purchases: 32, amount: "₫87M", avatar: "👨‍💼", rank: 3 },
    {
      name: "Phạm Thị D",
      purchases: 28,
      amount: "₫76M",
      avatar: "👩‍💼",
      rank: 4,
    },
    {
      name: "Hoàng Văn E",
      purchases: 24,
      amount: "₫65M",
      avatar: "👨‍🦱",
      rank: 5,
    },
  ];

  const statsCards = [
    {
      title: "Thú Cưng Đã Bán",
      value: "1,847",
      change: "+12.5%",
      trend: "up",
      color: "pink",
      icon: "📦",
    },
    {
      title: "Đang Vận Chuyển",
      value: "234",
      change: "+8.2%",
      trend: "up",
      color: "blue",
      icon: "🚚",
    },
    {
      title: "Thú Cưng Bị Bệnh",
      value: "18",
      change: "-3.1%",
      trend: "down",
      color: "orange",
      icon: "🏥",
    },
    {
      title: "Tổng Doanh Thu",
      value: "₫2.4M",
      change: "+15.3%",
      trend: "up",
      color: "green",
      icon: "💰",
    },
  ];

  const colorClasses = {
    pink: {
      bg: "bg-gradient-to-br from-pink-50 to-rose-50",
      border: "border-pink-200",
      text: "text-pink-600",
      badge: "bg-pink-100 text-pink-700",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
      border: "border-blue-200",
      text: "text-blue-600",
      badge: "bg-blue-100 text-blue-700",
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-50 to-amber-50",
      border: "border-orange-200",
      text: "text-orange-600",
      badge: "bg-orange-100 text-orange-700",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50",
      border: "border-green-200",
      text: "text-green-600",
      badge: "bg-green-100 text-green-700",
    },
  };

  const rankColors = {
    1: "bg-gradient-to-br from-yellow-400 to-amber-500",
    2: "bg-gradient-to-br from-gray-300 to-gray-400",
    3: "bg-gradient-to-br from-orange-400 to-amber-600",
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
              <FaPaw className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-balance">
                Quản Lý Thú Cưng
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Thống kê và phân tích dữ liệu
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-colors bg-white font-medium text-sm"
            >
              <CalendarIcon className="h-4 w-4 text-pink-500" />
              <span>
                {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
              </span>
            </button>

            {/* Simple Date Picker Dropdown */}
            {isCalendarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 p-4 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 min-w-[300px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Chọn khoảng thời gian
                  </h3>
                  <button
                    onClick={() => setIsCalendarOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Từ ngày
                    </label>
                    <input
                      type="date"
                      value={toInputFormat(dateRange.from)}
                      onChange={(e) => handleDateChange("from", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Đến ngày
                    </label>
                    <input
                      type="date"
                      value={toInputFormat(dateRange.to)}
                      onChange={(e) => handleDateChange("to", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setIsCalendarOpen(false)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all"
                  >
                    Áp dụng
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statsCards.map((stat) => {
            const colors = colorClasses[stat.color];
            return (
              <motion.div
                key={stat.title}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${colors.badge}`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  {stat.title}
                </h3>
                <p className={`text-3xl font-bold ${colors.text}`}>
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Best Selling Pets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Thú Cưng Bán Chạy Nhất
                </h2>
                <p className="text-sm text-gray-500 mt-1">Top 6 sản phẩm</p>
              </div>
              <div className="text-2xl">🏆</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bestSellingData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "rgba(236, 72, 153, 0.1)" }}
                />
                <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
                  {bestSellingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pet Status Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Tình Trạng Thú Cưng
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Phân bổ theo sức khỏe
                </p>
              </div>
              <div className="text-2xl">🏥</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-gray-700">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Biểu Đồ Doanh Số
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Số lượng bán và doanh thu theo tháng
                  </p>
                </div>
                <div className="text-2xl">📈</div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={salesData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="line"
                    formatter={(value) => (
                      <span className="text-sm text-gray-700">
                        {value === "sold"
                          ? "Số Lượng Bán"
                          : "Doanh Thu (triệu)"}
                      </span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="sold"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ fill: "#ec4899", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Khách Hàng VIP
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Top 5 mua nhiều nhất
                </p>
              </div>
              <Crown className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <motion.div
                  key={customer.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-pink-300 transition-all"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm ${
                      customer.rank <= 3
                        ? rankColors[customer.rank]
                        : "bg-gradient-to-br from-gray-400 to-gray-500"
                    }`}
                  >
                    {customer.rank}
                  </div>
                  <div className="text-2xl">{customer.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {customer.purchases} đơn hàng
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-pink-600 text-sm">
                      {customer.amount}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span>+12%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
