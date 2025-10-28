// Dashboard.jsx
import React, { useMemo, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  FaPaw,
  FaUsers,
  FaChartLine,
  FaDollarSign,
  FaBell,
  FaCog,
  FaPlus,
  FaCalendarAlt,
  FaBox,
  FaClipboardList,
  FaArrowRight,
  FaComment,
  FaHeart,
} from "react-icons/fa";

/* ---------------------------
  Helper / Small components
----------------------------*/

// Stat card (mini)
const StatCard = ({ icon, label, value, delta, color, darkMode }) => (
  <div
    className={`flex items-center p-5 rounded-2xl shadow-lg h-full transition-all hover:-translate-y-1 hover:shadow-2xl ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}
  >
    <div
      className="p-3 rounded-lg mr-4"
      style={{ backgroundColor: `${color}20` }}
    >
      {React.cloneElement(icon, { style: { color, fontSize: 22 } })}
    </div>
    <div className="flex-1 min-w-0">
      <p
        className={`text-sm font-medium ${
          darkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <p
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          {value}
        </p>
        {delta && (
          <span className="text-xs font-semibold bg-green-500/20 text-green-500 py-1 px-2 rounded-md whitespace-nowrap">
            {delta}
          </span>
        )}
      </div>
    </div>
  </div>
);

// Activity item
const ActivityItem = ({ user, action, time, darkMode }) => (
  <div
    className={`flex items-center justify-between py-2 border-b ${
      darkMode ? "border-slate-700" : "border-slate-200"
    }`}
  >
    <div>
      <p
        className={`font-semibold ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        {user}
      </p>
      <p
        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
      >
        {action}
      </p>
    </div>
    <span className="text-xs opacity-70">{time}</span>
  </div>
);

// Featured item (product / pet)
const FeaturedCard = ({ name, image, sold, darkMode }) => (
  <div
    className={`p-4 rounded-xl flex items-center justify-between shadow ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}
  >
    <div className="flex items-center space-x-3">
      <img
        src={image}
        alt={name}
        className="w-14 h-14 rounded-full border-2 border-orange-400 object-cover"
      />
      <div>
        <h3
          className={`font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
        >
          {name}
        </h3>
        <p className="text-sm opacity-70">{sold} lượt mua</p>
      </div>
    </div>
    <button className="text-orange-500 hover:text-orange-600 text-sm font-semibold flex items-center">
      Xem <FaArrowRight className="ml-1" />
    </button>
  </div>
);

// Interaction notification item
const InteractionItem = ({ user, avatar, petName, action, time, darkMode }) => (
  <div
    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
      darkMode
        ? "hover:bg-slate-700/50 border-b border-slate-700"
        : "hover:bg-gray-50 border-b border-gray-100"
    }`}
  >
    <img
      src={avatar}
      alt={user}
      className="w-10 h-10 rounded-full border-2 border-orange-300"
    />
    <div className="flex-1">
      <p className={`text-sm ${darkMode ? "text-white" : "text-slate-900"}`}>
        <span className="font-semibold">{user}</span>{" "}
        <span className={darkMode ? "text-slate-400" : "text-slate-600"}>
          {action}
        </span>{" "}
        <span className="font-medium text-orange-500">"{petName}"</span>
      </p>
      <p className="text-xs opacity-60 mt-1">{time}</p>
    </div>
  </div>
);

/* ---------------------------
  Main Dashboard
----------------------------*/

export default function Dashboard({ darkMode = false }) {
  // Fake data — bạn có thể thay bằng API
  const [liveUsers, setLiveUsers] = useState(128);
  useEffect(() => {
    // Fake "live" change mỗi 5s để demo
    const t = setInterval(() => {
      setLiveUsers((v) =>
        Math.max(10, v + Math.round((Math.random() - 0.4) * 10))
      );
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: { show: false },
        background: "transparent",
      },
      colors: ["#f97316", "#3b82f6"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: { style: { colors: darkMode ? "#94a3b8" : "#475569" } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { style: { colors: darkMode ? "#94a3b8" : "#475569" } },
      },
      grid: {
        borderColor: darkMode ? "#334155" : "#e2e8f0",
        strokeDashArray: 4,
      },
      tooltip: { theme: darkMode ? "dark" : "light" },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.08,
          stops: [0, 90],
        },
      },
    }),
    [darkMode]
  );

  const chartSeries = [
    { name: "Doanh thu", data: [4500, 5600, 4800, 7000, 6500, 8200, 9100] },
    { name: "Khách hàng", data: [12, 14, 10, 20, 18, 24, 30] },
  ];

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-slate-200" : "bg-gray-100 text-slate-800"
      }`}
    >
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1
            className={`text-3xl font-extrabold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            👋 Xin chào, Admin!
          </h1>
          <p className="opacity-70">
            Tổng quan hệ thống — cập nhật nhanh cho bạn.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className={`p-3 rounded-full ${
              darkMode ? "bg-slate-800" : "bg-white"
            } hover:bg-orange-500 hover:text-white transition`}
          >
            <FaBell />
          </button>
          <button
            className={`p-3 rounded-full ${
              darkMode ? "bg-slate-800" : "bg-white"
            } hover:bg-orange-500 hover:text-white transition`}
          >
            <FaCog />
          </button>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-orange-400"
          />
        </div>
      </header>

      {/* BANNER CHÀO MỪNG */}
      <div
        className={`relative overflow-hidden p-6 rounded-2xl shadow-lg mb-6 ${
          darkMode
            ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white"
            : "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-1">
              🎉 Chào mừng trở lại!
            </h2>
            <p className="opacity-90 mb-3">
              Có gì mới hôm nay? Dưới đây là tóm tắt nhanh.
            </p>
            <div className="flex flex-wrap gap-4 text-sm opacity-90">
              <span>
                👤 <strong>1.234</strong> người truy cập
              </span>
              <span>
                💰 <strong>$12.3K</strong> doanh thu
              </span>
              <span>
                📦 <strong>8</strong> đơn mới
              </span>
            </div>
          </div>
          <img
            src="https://i.imgur.com/wY3FUZV.png"
            alt="welcome"
            className="w-36 md:w-48 drop-shadow-lg"
          />
        </div>
      </div>

      {/* MINI STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-6">
        <StatCard
          icon={<FaPaw />}
          label="Thú cưng mới"
          value="24"
          delta="+4%"
          color="#f97316"
          darkMode={darkMode}
        />
        <StatCard
          icon={<FaUsers />}
          label="Khách hàng mới"
          value="18"
          delta="+12%"
          color="#10b981"
          darkMode={darkMode}
        />
        <StatCard
          icon={<FaDollarSign />}
          label="Doanh thu tháng"
          value="$52.4K"
          delta="+8.6%"
          color="#3b82f6"
          darkMode={darkMode}
        />
        <StatCard
          icon={<FaComment />}
          label="Bình luận mới"
          value="34"
          delta="+18%"
          color="#ec4899"
          darkMode={darkMode}
        />
        <StatCard
          icon={<FaClipboardList />}
          label="Đơn xử lý"
          value="7"
          delta="-2%"
          color="#8b5cf6"
          darkMode={darkMode}
        />
      </div>

      {/* TREND + LIVE USERS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Chart (col-span 2 on xl) */}
        <div
          className={`xl:col-span-2 p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold">Tổng quan tuần này</h3>
              <p className="text-sm opacity-70">Doanh thu & lượng khách</p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Tăng so với tuần trước</div>
              <div className="text-green-500 font-semibold">+15.2%</div>
            </div>
          </div>

          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={260}
          />
        </div>

        {/* Live users */}
        <div
          className={`p-6 rounded-2xl shadow-lg flex flex-col justify-between ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div>
            <h3 className="text-lg font-bold mb-2">
              🌍 Người dùng đang online
            </h3>
            <p className="text-sm opacity-70 mb-4">
              Số người đang tương tác thời gian thực (giả lập)
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-3xl font-extrabold text-green-500">
                  {liveUsers}
                </p>
                <p className="text-sm opacity-70">đang hoạt động</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (liveUsers / 200) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs opacity-70 mt-2">
                  Hiệu suất hệ thống ổn định
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <img
              src="https://i.imgur.com/jL6V3dO.png"
              alt="map"
              className="w-full rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ACTIVITY + TOP */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Activity */}
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Hoạt động gần đây</h3>
            <button className="text-sm text-slate-500 hover:text-slate-700">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-2">
            <ActivityItem
              user="Nguyễn An"
              action="Đặt lịch khám cho 'Bé Miu'"
              time="5 phút trước"
              darkMode={darkMode}
            />
            <ActivityItem
              user="Hoàng Minh"
              action="Thêm thú cưng mới 'Corgi'"
              time="15 phút trước"
              darkMode={darkMode}
            />
            <ActivityItem
              user="Trần Lan"
              action="Hoàn tất đơn hàng #00432"
              time="1 giờ trước"
              darkMode={darkMode}
            />
            <ActivityItem
              user="Admin"
              action="Cập nhật bảng giá dịch vụ"
              time="2 giờ trước"
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Top items (span 2) */}
        <div
          className={`xl:col-span-2 p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Top thú cưng / sản phẩm</h3>
            <div className="text-sm opacity-70">Xếp hạng theo lượt mua</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FeaturedCard
              name="Milo The Corgi"
              image="https://i.imgur.com/k5N0o2p.png"
              sold={42}
              darkMode={darkMode}
            />
            <FeaturedCard
              name="Bé Miu"
              image="https://i.imgur.com/y6J8J8z.png"
              sold={36}
              darkMode={darkMode}
            />
            <FeaturedCard
              name="Dầu gội PetCare"
              image="https://i.imgur.com/Ym7YjRj.png"
              sold={29}
              darkMode={darkMode}
            />
            <FeaturedCard
              name="Thức ăn Royal"
              image="https://i.imgur.com/kbjsNzk.png"
              sold={26}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* USER INTERACTIONS & NOTIFICATIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Bình luận và tương tác */}
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold flex items-center">
                <FaComment className="mr-2 text-pink-500" />
                Tương tác gần đây
              </h3>
              <p className="text-sm opacity-70">Bình luận & yêu thích</p>
            </div>
            <button className="text-sm text-orange-500 hover:text-orange-600 font-semibold">
              Xem tất cả
            </button>
          </div>

          <div className="space-y-1">
            <InteractionItem
              user="Mai Anh"
              avatar="https://i.pravatar.cc/100?img=1"
              petName="Milo The Corgi"
              action="đã bình luận:"
              time="2 phút trước"
              darkMode={darkMode}
            />
            <InteractionItem
              user="Tuấn Kiệt"
              avatar="https://i.pravatar.cc/100?img=2"
              petName="Bé Miu"
              action="đã yêu thích"
              time="10 phút trước"
              darkMode={darkMode}
            />
            <InteractionItem
              user="Hương Ly"
              avatar="https://i.pravatar.cc/100?img=3"
              petName="Golden Retriever"
              action="đã bình luận:"
              time="25 phút trước"
              darkMode={darkMode}
            />
            <InteractionItem
              user="Đức Minh"
              avatar="https://i.pravatar.cc/100?img=4"
              petName="Mèo Ba Tư"
              action="đã bình luận:"
              time="1 giờ trước"
              darkMode={darkMode}
            />
            <InteractionItem
              user="Thảo Nguyên"
              avatar="https://i.pravatar.cc/100?img=5"
              petName="Dầu gội PetCare"
              action="đã yêu thích"
              time="2 giờ trước"
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Thông báo quan tâm */}
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold flex items-center">
                <FaHeart className="mr-2 text-red-500" />
                Thống kê yêu thích
              </h3>
              <p className="text-sm opacity-70">Người dùng quan tâm nhất</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Top liked pets */}
            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-slate-700/50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Milo The Corgi</span>
                <span className="text-red-500 flex items-center">
                  <FaHeart className="mr-1" /> 156
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-slate-700/50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Bé Miu</span>
                <span className="text-red-500 flex items-center">
                  <FaHeart className="mr-1" /> 142
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "71%" }}
                />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-slate-700/50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Golden Retriever</span>
                <span className="text-red-500 flex items-center">
                  <FaHeart className="mr-1" /> 128
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "64%" }}
                />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                darkMode ? "bg-slate-700/50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Dầu gội PetCare</span>
                <span className="text-red-500 flex items-center">
                  <FaHeart className="mr-1" /> 98
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "49%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div
        className={`p-6 rounded-2xl shadow-lg ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Thao tác nhanh</h3>
          <div className="text-sm opacity-70">Các tác vụ thường dùng</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
            <FaPlus className="text-2xl mb-2" /> Thêm thú cưng
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
            <FaCalendarAlt className="text-2xl mb-2" /> Đặt lịch hẹn
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
            <FaBox className="text-2xl mb-2" /> Quản lý sản phẩm
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition">
            <FaChartLine className="text-2xl mb-2" /> Xem báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}
