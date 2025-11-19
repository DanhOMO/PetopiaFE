"use client";
import React, { useState, useMemo } from "react";
// Import thư viện animation và lịch
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
// Import CSS BẮT BUỘC của thư viện
import "react-datepicker/dist/react-datepicker.css";

// Import BỘ ICON MỚI (Lucide)
import {
  Syringe,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCheck,
  Clock3,
  AlertTriangle,
  Plus,
  FilePenLine,
  Trash2,
  X,
  Search,
  Calendar,
  Eye,
} from "lucide-react";

// Import dữ liệu giả (đảm bảo đúng đường dẫn)
import {
  allPets,
  allVaccinationSchedules,
  fakeUsers,
} from "../../data/fakeData"; // Sửa đường dẫn nếu cần

// ===================================================================
// Định nghĩa hiệu ứng cho Modal (Nâng cấp Backdrop)
// ===================================================================
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.95, y: 30, transition: { duration: 0.2 } },
};

// ===================================================================
// Component Thẻ Thống Kê (StatsCard)
// ===================================================================
const StatsCard = ({ title, value, icon, variant }) => {
  const isBlinking = variant === "blinking";
  const isBright = variant === "bright";
  const IconComponent = icon;
  let iconColor = "text-gray-500";
  let bgColor = "bg-gray-100";

  // Đổi sang màu Xanh dương cho đồng bộ
  if (isBlinking) {
    iconColor = "text-blue-600";
    bgColor = "bg-blue-100";
  }
  if (isBright) {
    iconColor = "text-green-600";
    bgColor = "bg-green-100";
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4 transition-shadow hover:shadow-md">
      <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>
        {isBlinking ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <IconComponent size={24} strokeWidth={2.5} />
          </motion.div>
        ) : (
          <IconComponent size={24} strokeWidth={2.5} />
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// ===================================================================
// Component Modal Xem Lịch Tiêm (ViewSchedulesModal) - Nâng cấp UI
// ===================================================================
const ViewSchedulesModal = ({ pet, schedules, onClose, onEdit, onDelete }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
      >
        {/* Header Modal - Thiết kế Sạch sẽ */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Lịch tiêm của: {pet.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Modal */}
        <div className="p-6 space-y-3">
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <div
                key={schedule.schedule_id}
                className="p-3 border rounded-lg flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-blue-700">
                    {schedule.vaccineName}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar className="inline mr-1.5 h-4 w-4" />
                    {new Date(schedule.date).toLocaleDateString("vi-VN")}
                    {" - "}
                    {schedule.time}
                  </p>
                  <p className="text-sm text-gray-500 italic mt-1">
                    Trạng thái: <StatusPill status={schedule.status} />
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(schedule)}
                    className="p-1.5 rounded-md text-blue-600 hover:bg-blue-100"
                    title="Sửa"
                  >
                    <FilePenLine size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(schedule.schedule_id)}
                    className="p-1.5 rounded-md text-red-600 hover:bg-red-100"
                    title="Hủy"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              Thú cưng này chưa có lịch tiêm nào.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================================================
// Component Modal Lên Lịch (ScheduleModal) - SỬA LỖI & NÂNG CẤP UI
// ===================================================================
const ScheduleModal = ({ mode, data, onClose, onSave }) => {
  // Use a date range [start, end] and expand it into discrete dates
  const [selectedRange, setSelectedRange] = useState(
    mode === "EDIT" ? [new Date(data.schedule.date), new Date(data.schedule.date)] : [null, null]
  );
  const [vaccineType, setVaccineType] = useState(
    mode === "EDIT" ? data.schedule.vaccineName : ""
  );
  const [time, setTime] = useState(
    mode === "EDIT" ? data.schedule.time : "09:00"
  );
  const [notes, setNotes] = useState(
    mode === "EDIT" ? data.schedule.notes : ""
  );
  const [instructions, setInstructions] = useState(
    mode === "EDIT" ? data.schedule.instructions : "Kiêng tắm 3 ngày."
  );
  const [sendEmail, setSendEmail] = useState(true);

  let title = "Thêm lịch tiêm mới";
  if (mode === "EDIT") title = "Chỉnh sửa lịch tiêm";
  if (mode === "BULK")
    title = `Lên lịch chung cho ${data.petIds.length} thú cưng`;

  // Expand selectedRange into concrete date objects (inclusive)
  const selectedExpandedDates = useMemo(() => {
    const [start, end] = selectedRange || [null, null];
    if (!start) return [];
    if (!end) return [start];
    const dates = [];
    const cur = new Date(start);
    cur.setHours(0, 0, 0, 0);
    const last = new Date(end);
    last.setHours(0, 0, 0, 0);
    while (cur <= last) {
      dates.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return dates;
  }, [selectedRange]);

  const handleSaveClick = () => {
    if (selectedExpandedDates.length === 0 || !vaccineType) {
      return alert("Vui lòng chọn ít nhất 1 ngày và loại vaccine!");
    }
    onSave({
      mode,
      data,
      formData: {
        dates: selectedExpandedDates.map((d) => d.toISOString()),
        vaccineName: vaccineType,
        time,
        notes,
        instructions,
        sendEmail,
      },
    });
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
      >
        {/* Header Modal - Thiết kế Sạch sẽ */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Modal */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột 1: Chọn lịch (ĐÃ SỬA LỖI) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn ngày tiêm (có thể chọn nhiều ngày)
            </label>
            <div className="flex justify-center p-2 border rounded-md">
              {/* ====== PHẦN SỬA LỖI ====== */}
              <DatePicker
                // Use selectsRange so user picks a start and end date
                selected={selectedRange[0] || null}
                startDate={selectedRange[0]}
                endDate={selectedRange[1]}
                onChange={(update) => setSelectedRange(update)}
                selectsRange
                inline
                // Thêm các class Tailwind (Theme màu XANH)
                calendarClassName="bg-white border-0"
                headerClassName="bg-blue-50 p-2 border-b-0 rounded-t-lg flex justify-between items-center"
                monthClassName={() => "text-blue-900 font-semibold"}
                dayNameClassName={() =>
                  "w-9 text-center text-sm font-semibold text-blue-800"
                }
                weekClassName={() => "flex"}
                dayClassName={(date) => {
                  const base =
                    "m-0.5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-100";
                  // Kiểm tra xem ngày này có trong mảng `selectedExpandedDates` không
                  const isSelected = selectedExpandedDates.some(
                    (d) => d.toDateString() === date.toDateString()
                  );
                  return isSelected
                    ? `${base} !bg-blue-600 !text-white` // Dùng ! (important)
                    : base;
                }}
              />
              {/* ====== KẾT THÚC PHẦN SỬA ====== */}
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700">Ngày đã chọn:</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedExpandedDates.length > 0 ? (
                  selectedExpandedDates.map((date) => (
                    <span
                      key={date.toString()}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    >
                      {date.toLocaleDateString("vi-VN")}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">Chưa chọn ngày</p>
                )}
              </div>
            </div>
          </div>

          {/* Cột 2: Thông tin */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loại Vaccine
              </label>
              <select
                value={vaccineType}
                onChange={(e) => setVaccineType(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">-- Chọn loại vaccine --</option>
                <option value="Dại (Rabies)">Dại (Rabies)</option>
                <option value="5-trong-1">5-trong-1</option>
                <option value="Parvovirus">Parvovirus</option>
                <option value="Bordetella">Bordetella</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giờ tiêm
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hướng dẫn
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
                className="mt-1 p-2 w-full border rounded-md"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ghi chú
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1 p-2 w-full border rounded-md"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Nút bấm (Footer Modal) */}
        <div className="flex justify-between items-center mt-6 p-4 bg-slate-100 rounded-b-lg">
          <div className="flex items-center">
            <input
              id="sendEmail"
              type="checkbox"
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="sendEmail"
              className="ml-2 block text-sm text-gray-900"
            >
              Gửi email thông báo cho chủ sở hữu
            </label>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Lưu Lịch Tiêm
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================================================
// Component Thẻ Trạng Thái (StatusPill)
// ===================================================================
const StatusPill = ({ status }) => {
  const styles = {
    SCHEDULED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
  };
  const text = {
    SCHEDULED: "Đã lên lịch",
    COMPLETED: "Hoàn thành",
    PENDING: "Chờ",
  };
  return (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {text[status] || "Chưa có"}
    </span>
  );
};

// ===================================================================
// Component Chính: Quản Lý Lịch Tiêm (VaccinationManagement)
// ===================================================================
export default function VaccinationManagement() {
  const [schedules, setSchedules] = useState(allVaccinationSchedules);
  const [pets] = useState(allPets);
  const [users] = useState(fakeUsers);

  const [selectedPetIds, setSelectedPetIds] = useState([]);
  const [page, setPage] = useState(1);
  
  // State của Filter (ĐÃ ĐƠN GIẢN HÓA)
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    // Đã xóa startDate và endDate
  });
  
  const [modalState, setModalState] = useState({ type: null, data: null });

  const perPage = 10;

  // Tính toán Stats
  const stats = useMemo(() => {
    const now = new Date();
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(now.getDate() + 3);

    const upcoming = schedules.filter(
      (s) =>
        s.status === "SCHEDULED" &&
        new Date(s.date) > now &&
        new Date(s.date) <= threeDaysFromNow
    ).length;

    const completed = schedules.filter(
      (s) => s.status === "COMPLETED"
    ).length;

    const petsWithSchedules = new Set(schedules.map((s) => s.pet_id));
    const needsVaccine = pets.filter(
      (p) => !petsWithSchedules.has(p.id)
    ).length;

    return {
      total: schedules.length,
      upcoming,
      completed,
      needsVaccine,
    };
  }, [schedules, pets]);

  // Lọc dữ liệu (ĐÃ ĐƠN GIẢN HÓA)
  const petsToDisplay = useMemo(() => {
    // 1. Lọc thú cưng theo tên
    const searchedPets = pets.filter((p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase())
    );

    // 2. Lọc thú cưng dựa trên trạng thái (Đã bỏ lọc ngày)
    if (filters.status === "all") {
      return searchedPets;
    }

    const filteredPetIds = new Set();
    schedules.forEach((schedule) => {
      let statusMatch = true;
      if (filters.status !== "all") {
        if (filters.status === "NOT_COMPLETED") {
          statusMatch =
            schedule.status === "SCHEDULED" || schedule.status === "PENDING";
        } else {
          statusMatch = schedule.status === filters.status;
        }
      }

      if (statusMatch) {
        filteredPetIds.add(schedule.pet_id);
      }
    });
    return searchedPets.filter((p) => filteredPetIds.has(p.id));
  }, [pets, schedules, filters]);

  // Phân trang
  const totalPages = Math.ceil(petsToDisplay.length / perPage);
  const paginatedPets = petsToDisplay.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Xử lý Checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPetIds(paginatedPets.map((p) => p.id));
    } else {
      setSelectedPetIds([]);
    }
  };

  // Xử lý Modal
  const handleOpenModal = (type, data = null) => setModalState({ type, data });
  const handleCloseModal = () => setModalState({ type: null, data: null });

  // Xử lý Lưu (CRUD)
  const handleSaveSchedule = ({ mode, data, formData }) => {
    console.log("Saving:", { mode, data, formData });
    if (formData.sendEmail) {
      if (mode === "BULK") {
        alert(`Đã gửi email thông báo tới ${data.petIds.length} chủ sở hữu!`);
      } else {
        const pet =
          mode === "ADD"
            ? data.pet
            : pets.find((p) => p.id === data.schedule.pet_id);
        const owner = users.find((u) => u.userId === pet.ownerId);
        alert(`Đã gửi email tới ${owner.email} cho thú cưng ${pet.name}!`);
      }
    }
    if (mode === "ADD") {
      formData.dates.forEach((date) => {
        const newSchedule = {
          ...formData,
          schedule_id: `S${Date.now()}${Math.random()}`,
          pet_id: data.pet.id,
          date,
          status: "SCHEDULED",
        };
        setSchedules((prev) => [...prev, newSchedule]);
      });
    } else if (mode === "EDIT") {
      setSchedules((prev) =>
        prev.map((s) =>
          s.schedule_id === data.schedule.schedule_id
            ? { ...s, ...formData, date: formData.dates[0] }
            : s
        )
      );
    } else if (mode === "BULK") {
      const newSchedules = [];
      data.petIds.forEach((petId) => {
        formData.dates.forEach((date) => {
          newSchedules.push({
            ...formData,
            schedule_id: `S${Date.now()}${Math.random()}`,
            pet_id: petId,
            date,
            status: "SCHEDULED",
          });
        });
      });
      setSchedules((prev) => [...prev, ...newSchedules]);
      setSelectedPetIds([]);
    }
  };

  // Xử lý Xóa
  const handleDeleteSchedule = (schedule_id) => {
    if (window.confirm("Bạn có chắc muốn hủy lịch tiêm này?")) {
      setSchedules((prev) => prev.filter((s) => s.schedule_id !== schedule_id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Quản Lý Lịch Tiêm Phòng
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Tổng lịch tiêm"
            value={stats.total}
            icon={FileText}
          />
          <StatsCard
            title="Sắp tới (3 ngày)"
            value={stats.upcoming}
            icon={Clock3}
            variant="blinking"
          />
          <StatsCard
            title="Đã hoàn thành"
            value={stats.completed}
            icon={CheckCheck}
            variant="bright"
          />
          <StatsCard
            title="Thú cưng cần tiêm"
            value={stats.needsVaccine}
            icon={AlertTriangle}
            variant="blinking"
          />
        </div>

        {/* Filters (ĐÃ ĐƠN GIẢN HÓA) */}
        <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tìm thú cưng
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Tìm theo tên thú cưng..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="SCHEDULED">Đã lên lịch</option>
                <option value="NOT_COMPLETED">Chưa hoàn thành</option>
                <option value="PENDING">Chờ</option>
                <option value="COMPLETED">Hoàn thành</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-start items-center mb-4 gap-2">
          <button
            onClick={() => handleOpenModal("BULK", { petIds: selectedPetIds })}
            disabled={selectedPetIds.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-sm"
          >
            <Syringe size={16} /> Lên Lịch Chung ({selectedPetIds.length})
          </button>
        </div>

        {/* Table - NÂNG CẤP HÀNG XEN KẼ */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Thú cưng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Chủ sở hữu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Lịch tiêm sắp tới
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedPets.map((pet, index) => {
                const petSchedules = schedules.filter(
                  (s) => s.pet_id === pet.id
                );
                const petOwner = users.find((u) => u.userId === pet.ownerId);
                const nextSchedule = petSchedules
                  .filter(
                    (s) =>
                      new Date(s.date) > new Date() && s.status !== "COMPLETED"
                  )
                  .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

                // Class cho hàng xen kẽ
                const isEven = index % 2 === 0;
                const rowClass = `${
                  isEven ? "bg-white" : "bg-slate-50"
                } hover:bg-blue-50 transition-colors duration-150`;

                return (
                  <tr key={pet.id} className={rowClass}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPetIds.includes(pet.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onChange={() =>
                          setSelectedPetIds((prev) =>
                            prev.includes(pet.id)
                              ? prev.filter((id) => id !== pet.id)
                              : [...prev, pet.id]
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            pet.images.find((img) => img.is_thumbnail)
                              ?.image_url || pet.images[0].image_url
                          }
                          alt={pet.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {pet.name}
                          </p>
                          <p className="text-xs text-gray-500">{pet.breed}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {petOwner ? petOwner.name : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {nextSchedule ? (
                        <div>
                          <p className="font-semibold">
                            {nextSchedule.vaccineName}
                          </p>
                          <p className="text-gray-600">
                            {new Date(nextSchedule.date).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">Chưa có</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {nextSchedule ? (
                        <StatusPill status={nextSchedule.status} />
                      ) : (
                        <StatusPill status="NONE" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleOpenModal("VIEW", {
                              pet,
                              schedules: petSchedules,
                            })
                          }
                          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
                          title="Xem tất cả lịch tiêm"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleOpenModal("ADD", { pet })}
                          className="p-1.5 rounded-md text-green-600 hover:bg-green-100"
                          title="Thêm lịch tiêm mới"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded border disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span>
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded border disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Khu vực render Modal (với AnimatePresence) */}
        <AnimatePresence>
          {modalState.type === "VIEW" && (
            <ViewSchedulesModal
              pet={modalState.data.pet}
              schedules={modalState.data.schedules}
              onClose={handleCloseModal}
              onEdit={(schedule) => handleOpenModal("EDIT", { schedule })}
              onDelete={handleDeleteSchedule}
            />
          )}

          {(modalState.type === "ADD" ||
            modalState.type === "EDIT" ||
            modalState.type === "BULK") && (
            <ScheduleModal
              mode={modalState.type}
              data={modalState.data}
              onClose={handleCloseModal}
              onSave={handleSaveSchedule}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}