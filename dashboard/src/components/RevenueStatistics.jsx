"use client";

import { useState } from "react";
import CountUp from "react-countup";
import {HiCash, HiChartBar, HiShoppingCart,
  HiClock,
  HiXCircle,
  HiUsers,
  HiTrendingUp,
  HiTrendingDown,
  HiChartPie,
  HiGlobe,
  HiFilter,
  HiDownload,
} from "react-icons/hi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { motion } from "framer-motion"; // For smooth animations
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"; // For tabbed interface
import "react-tabs/style/react-tabs.css"; // Tab styles

export default function Revenue() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filter, setFilter] = useState("all"); // Filter state
  const [reportType, setReportType] = useState("pdf"); // Report type state

  // Revenue data for trend chart
  const revenueData = [
    { date: "1/1", revenue: 28000 },
    { date: "5/1", revenue: 32000 },
    { date: "10/1", revenue: 29500 },
    { date: "15/1", revenue: 35000 },
    { date: "20/1", revenue: 33000 },
    { date: "25/1", revenue: 38000 },
    { date: "30/1", revenue: 42000 },
    { date: "1/2", revenue: 40000 },
    { date: "5/2", revenue: 45000 },
    { date: "10/2", revenue: 43000 },
    { date: "15/2", revenue: 48000 },
    { date: "20/2", revenue: 52000 },
  ];

  // Filtered revenue data based on filter
  const getFilteredRevenueData = () => {
    const today = new Date("2025-10-06");
    return revenueData.filter((item) => {
      const itemDate = new Date(
        `2025-${item.date.split("/")[1]}-${item.date.split("/")[0]}`
      );
      switch (filter) {
        case "daily":
          return itemDate.toDateString() === today.toDateString();
        case "weekly":
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          return itemDate >= oneWeekAgo && itemDate <= today;
        case "monthly":
          return (
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  // Orders status data
  const ordersStatusData = [
    { name: "Đã Hoàn Thành", value: 1543, color: "#34D399" },
    { name: "Đang Chờ", value: 432, color: "#FACC15" },
    { name: "Đã Hủy", value: 128, color: "#EF4444" },
    { name: "Đặt Trước", value: 234, color: "#8B5CF6" },
  ];

  // Monthly growth data
  const monthlyGrowthData = [
    { month: "T1", revenue: 850 },
    { month: "T2", revenue: 1770 },
    { month: "T3", revenue: 2650 },
    { month: "T4", revenue: 3700 },
    { month: "T5", revenue: 4680 },
    { month: "T6", revenue: 5700 },
    { month: "T7", revenue: 6650 },
    { month: "T8", revenue: 7750 },
    { month: "T9", revenue: 8830 },
    { month: "T10", revenue: 9980 },
    { month: "T11", revenue: 10950 },
    { month: "T12", revenue: 12150 },
  ];

  // Country sales data
  const countryData = [
    { name: "Đức", value: 11300000, percentage: 32.34 },
    { name: "Thụy Sĩ", value: 11970000, percentage: 34.26 },
    { name: "Áo", value: 11670000, percentage: 33.4 },
  ];

  const COUNTRY_COLORS = ["#5FB3B3", "#7CC5C5", "#99D7D7"];

  // ARPU data
  const arpuData = [
    { month: "T1", value: 100 },
    { month: "T2", value: 99 },
    { month: "T3", value: 100 },
    { month: "T4", value: 99 },
    { month: "T5", value: 99 },
    { month: "T6", value: 100 },
    { month: "T7", value: 108 },
    { month: "T8", value: 134 },
  ];

  // CLV data
  const clvData = [
    { month: "T1", value: 45 },
    { month: "T2", value: 105 },
    { month: "T3", value: 209 },
    { month: "T4", value: 154 },
    { month: "T5", value: 232 },
    { month: "T6", value: 256 },
    { month: "T7", value: 270 },
    { month: "T8", value: 303 },
  ];

  // CAC data
  const cacData = [
    { month: "T1", value: 363 },
    { month: "T2", value: 329 },
    { month: "T3", value: 303 },
    { month: "T4", value: 309 },
    { month: "T5", value: 278 },
    { month: "T6", value: 278 },
    { month: "T7", value: 255 },
    { month: "T8", value: 249 },
  ];

  // New line chart data for main stats tab
  const mainStatsLineData = [
    { month: "T1", doanhThu: 850000, loiNhuan: 150000 },
    { month: "T2", doanhThu: 920000, loiNhuan: 180000 },
    { month: "T3", doanhThu: 880000, loiNhuan: 160000 },
    { month: "T4", doanhThu: 1050000, loiNhuan: 220000 },
    { month: "T5", doanhThu: 980000, loiNhuan: 200000 },
    { month: "T6", doanhThu: 1020000, loiNhuan: 210000 },
    { month: "T7", doanhThu: 950000, loiNhuan: 190000 },
    { month: "T8", doanhThu: 1100000, loiNhuan: 230000 },
    { month: "T9", doanhThu: 1080000, loiNhuan: 220000 },
    { month: "T10", doanhThu: 1150000, loiNhuan: 240000 },
    { month: "T11", doanhThu: 970000, loiNhuan: 200000 },
    { month: "T12", doanhThu: 1200000, loiNhuan: 250000 },
  ];

  // Filter handler
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Report generation handler
  const generateReport = () => {
    alert(`Generating ${reportType} report for ${filter} data.`);
    // Add report generation logic here (e.g., API call or file download)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-bold text-teal-800 text-center flex items-center justify-center gap-3">
          <HiChartPie className="w-10 h-10 text-teal-600" />
          Tổng Quan Hiệu Suất Kinh Doanh
        </h1>

        {/* Filter and Report Controls */}
        <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <HiFilter className="w-6 h-6 text-teal-600" />
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border border-teal-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Tất Cả</option>
              <option value="monthly">Tháng Này</option>
              <option value="weekly">Tuần Này</option>
              <option value="daily">Hôm Nay</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border border-teal-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
            <button
              onClick={generateReport}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <HiDownload className="w-5 h-5" />
              Tạo Báo Cáo
            </button>
          </div>
        </div>

        {/* Tabs for better organization */}
        <Tabs
          selectedIndex={selectedTab}
          onSelect={(index) => setSelectedTab(index)}
        >
          <TabList className="flex border-b border-teal-200 mb-6 bg-white rounded-t-xl shadow-md">
            <Tab className="px-6 py-3 text-teal-600 cursor-pointer hover:bg-teal-100 transition-colors font-semibold rounded-tl-xl">
              Thống Kê Chính
            </Tab>
            <Tab className="px-6 py-3 text-teal-600 cursor-pointer hover:bg-teal-100 transition-colors font-semibold">
              Biểu Đồ Doanh Thu
            </Tab>
            <Tab className="px-6 py-3 text-teal-600 cursor-pointer hover:bg-teal-100 transition-colors font-semibold">
              Phân Tích Đơn Hàng
            </Tab>
            <Tab className="px-6 py-3 text-teal-600 cursor-pointer hover:bg-teal-100 transition-colors font-semibold rounded-tr-xl">
              Theo Quốc Gia & Chỉ Số
            </Tab>
          </TabList>

          {/* Tab 1: Key Stats - Enhanced with highlight and new line chart */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl shadow-xl p-8 space-y-8"
            >
              <h2 className="text-2xl font-bold text-teal-800 text-center mb-6 flex items-center justify-center gap-2">
                <HiChartBar className="w-8 h-8 text-teal-600" />
                Thống Kê Chính Nổi Bật
              </h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {/* Today's Revenue */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:bg-teal-50 transition-colors"
                >
                  <HiCash className="w-12 h-12 text-teal-600 mb-4" />
                  <div className="text-3xl font-bold text-teal-800">
                    €
                    <CountUp
                      end={52450}
                      duration={2}
                      separator="."
                      decimal=","
                    />
                  </div>
                  <p className="text-sm text-teal-700 font-medium">
                    Doanh Thu Hôm Nay
                  </p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <HiTrendingUp className="w-4 h-4" />
                    8.5% so với hôm qua
                  </div>
                  <p className="text-xs text-teal-600 mt-2">
                    Số liệu: €48,300 hôm qua, tăng €4,150 (8.5%).
                  </p>
                </motion.div>

                {/* Weekly Revenue */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:bg-teal-50 transition-colors"
                >
                  <HiChartBar className="w-12 h-12 text-teal-600 mb-4" />
                  <div className="text-3xl font-bold text-teal-800">
                    €
                    <CountUp
                      end={287300}
                      duration={2}
                      separator="."
                      decimal=","
                    />
                  </div>
                  <p className="text-sm text-teal-700 font-medium">
                    Doanh Thu Tuần Này
                  </p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <HiTrendingUp className="w-4 h-4" />
                    12.3% so với tuần trước
                  </div>
                  <p className="text-xs text-teal-600 mt-2">
                    Số liệu: €256,000 tuần trước, tăng €31,300 (12.3%).
                  </p>
                </motion.div>

                {/* Monthly Revenue */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:bg-teal-50 transition-colors"
                >
                  <HiChartBar className="w-12 h-12 text-teal-600 mb-4" />
                  <div className="text-3xl font-bold text-teal-800">
                    €
                    <CountUp
                      end={970907}
                      duration={2}
                      separator="."
                      decimal=","
                    />
                  </div>
                  <p className="text-sm text-teal-700 font-medium">
                    Doanh Thu Tháng Này
                  </p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <HiTrendingUp className="w-4 h-4" />
                    5.7% so với tháng trước
                  </div>
                  <p className="text-xs text-teal-600 mt-2">
                    Số liệu: €918,000 tháng trước, tăng €52,907 (5.7%).
                  </p>
                </motion.div>

                {/* Orders Placed */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:bg-teal-50 transition-colors"
                >
                  <HiShoppingCart className="w-12 h-12 text-teal-600 mb-4" />
                  <div className="text-3xl font-bold text-teal-800">
                    <CountUp
                      end={1543}
                      duration={2}
                      separator="."
                      decimal=","
                    />
                  </div>
                  <p className="text-sm text-teal-700 font-medium">
                    Đơn Hàng Đã Đặt
                  </p>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <HiTrendingUp className="w-4 h-4" />
                    15.2% so với trước
                  </div>
                  <p className="text-xs text-teal-600 mt-2">
                    Số liệu: 1,340 đơn trước, tăng 203 đơn (15.2%).
                  </p>
                </motion.div>

                {/* Pre-Orders */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:bg-teal-50 transition-colors"
                >
                  <HiClock className="w-12 h-12 text-teal-600 mb-4" />
                  <div className="text-3xl font-bold text-teal-800">
                    <CountUp end={234} duration={2} separator="." decimal="," />
                  </div>
                  <p className="text-sm text-teal-700 font-medium">
                    Đơn Đặt Trước
                  </p>
                  <div className="flex items-center gap-1 text-sm text-red-600 mt-2">
                    <HiTrendingDown className="w-4 h-4" />
                    3.1% so với trước
                  </div>
                  <p className="text-xs text-teal-600 mt-2">
                    Số liệu: 241 đơn trước, giảm 7 đơn (3.1%).
                  </p>
                </motion.div>

                {/* Cancelled Orders */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:bg-teal-50 transition-colors"
                >
                  <HiXCircle className="w-12 h-12 text-teal-600 mb-4" />
                  <div className="text-3xl font-bold text-teal-800">
                    <CountUp end={128} duration={2} separator="." decimal="," />
                  </div>
                  <p className="text-sm text-teal-700 font-medium">
                    Đơn Đã Hủy
                  </p>
                  <div className="flex items-center gap-1 text-sm text-red-600 mt-2">
                    <HiTrendingDown className="w-4 h-4" />
                    8.4% so với trước
                  </div>
                  <p className="text-xs text-teal-600 mt-2">
                    Số liệu: 140 đơn trước, giảm 12 đơn (8.4%).
                  </p>
                </motion.div>
              </div>

              {/* New Line Chart with Animation and Filter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-xl shadow-md p-6 mt-8"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-teal-800 flex items-center gap-2">
                    <HiTrendingUp className="w-6 h-6 text-teal-600" />
                    Biểu Đồ Doanh Thu & Lợi Nhuận Hàng Tháng
                  </h3>
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="border border-teal-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="all">Tất Cả</option>
                    <option value="monthly">Tháng Này</option>
                    <option value="weekly">Tuần Này</option>
                    <option value="daily">Hôm Nay</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={mainStatsLineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#5FB3B3" />
                    <YAxis
                      stroke="#5FB3B3"
                      tickFormatter={(value) =>
                        `€${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip
                      formatter={(value) => `€${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="doanhThu"
                      stroke="#5FB3B3"
                      strokeWidth={3}
                      name="Doanh Thu"
                      dot={{ r: 4 }}
                      animationDuration={1500}
                    />
                    <Line
                      type="monotone"
                      dataKey="loiNhuan"
                      stroke="#34D399"
                      strokeWidth={3}
                      name="Lợi Nhuận"
                      dot={{ r: 4 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-center text-sm text-teal-600 mt-4">
                  Phân tích: Doanh thu tăng trung bình 10% mỗi tháng, lợi nhuận
                  ổn định ở mức 20-25% doanh thu.
                </p>
              </motion.div>
            </motion.div>
          </TabPanel>

          {/* Tab 2: Revenue Charts */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Revenue Trend Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-teal-800 flex items-center gap-2">
                    <HiTrendingUp className="w-6 h-6 text-teal-600" />
                    Xu Hướng Doanh Thu
                  </h3>
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="border border-teal-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="all">Tất Cả</option>
                    <option value="monthly">Tháng Này</option>
                    <option value="weekly">Tuần Này</option>
                    <option value="daily">Hôm Nay</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={getFilteredRevenueData()}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#5FB3B3"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#5FB3B3"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#5FB3B3" />
                    <YAxis
                      stroke="#5FB3B3"
                      tickFormatter={(value) =>
                        `€${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip
                      formatter={(value) => `€${value.toLocaleString()}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#5FB3B3"
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Growth Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-teal-800 mb-4 flex items-center gap-2">
                  <HiChartBar className="w-6 h-6 text-teal-600" />
                  Tăng Trưởng Hàng Tháng
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold">
                    13.00%
                  </div>
                  <p className="text-sm text-teal-700">Mục Tiêu: 15%</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#5FB3B3" />
                    <YAxis
                      stroke="#5FB3B3"
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value) => `€${value.toLocaleString()}`}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#5FB3B3"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </TabPanel>

          {/* Tab 3: Order Analysis */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-teal-800 mb-4 flex items-center gap-2">
                <HiShoppingCart className="w-6 h-6 text-teal-600" />
                Trạng Thái Đơn Hàng
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={ordersStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {ordersStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} đơn hàng`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </TabPanel>

          {/* Tab 4: Country & Metrics */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Sales by Country */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-teal-800 mb-4 flex items-center gap-2">
                  <HiGlobe className="w-6 h-6 text-teal-600" />
                  Hiệu Suất Bán Hàng Theo Quốc Gia
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage.toFixed(1)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {countryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COUNTRY_COLORS[index % COUNTRY_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `€${(value / 1000000).toFixed(2)}M`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {countryData.map((country, index) => (
                    <div
                      key={country.name}
                      className="flex justify-between text-sm text-teal-700"
                    >
                      <span>{country.name}</span>
                      <span>€{(country.value / 1000000).toFixed(2)}M</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                {/* ARPU */}
                <div>
                  <h4 className="text-sm font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <HiChartBar className="w-5 h-5 text-teal-600" />
                    Doanh Thu Trung Bình Mỗi Đơn Vị (ARPU)
                  </h4>
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-lg inline-block mb-2">
                    €104.92
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={arpuData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#5FB3B3"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* CLV */}
                <div>
                  <h4 className="text-sm font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <HiUsers className="w-5 h-5 text-teal-600" />
                    Giá Trị Khách Hàng Trọn Đời (CLV)
                  </h4>
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-lg inline-block mb-2">
                    €250.08
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={clvData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#5FB3B3"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* CAC */}
                <div>
                  <h4 className="text-sm font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <HiCash className="w-5 h-5 text-teal-600" />
                    Chi Phí Thu Hút Khách Hàng (CAC)
                  </h4>
                  <div className="bg-teal-600 text-white px-4 py-2 rounded-lg inline-block mb-2">
                    €282.67
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={cacData}>
                      <Bar
                        dataKey="value"
                        fill="#5FB3B3"
                        radius={[4, 4, 0, 0]}
                      />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </TabPanel>
        </Tabs>

        {/* Additional KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-teal-800 mb-6 flex items-center gap-2">
            <HiChartPie className="w-6 h-6 text-teal-600" />
            Các Chỉ Số Chính
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg shadow-sm">
              <HiUsers className="w-8 h-8 text-teal-600" />
              <div>
                <div className="text-2xl font-bold text-teal-800">809</div>
                <p className="text-xs text-teal-700">Khách Hàng Mới (YTD)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg shadow-sm">
              <HiChartBar className="w-8 h-8 text-teal-600" />
              <div>
                <div className="text-2xl font-bold text-teal-800">€34.95M</div>
                <p className="text-xs text-teal-700">
                  Doanh Thu Bán Hàng (YTD)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg shadow-sm">
              <HiCash className="w-8 h-8 text-teal-600" />
              <div>
                <div className="text-2xl font-bold text-teal-800">€5.32M</div>
                <p className="text-xs text-teal-700">Lợi Nhuận (YTD)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg shadow-sm">
              <HiChartPie className="w-8 h-8 text-teal-600" />
              <div>
                <div className="text-2xl font-bold text-teal-800">80.91%</div>
                <p className="text-xs text-teal-700">
                  Tiến Độ Mục Tiêu Doanh Thu
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
