"use client";
import React, { useState } from "react";
// Import thư viện animation
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPlus,
  HiMail,
  HiPencil,
  HiTrash,
  HiChevronDown,
  HiChevronUp,
  HiX,
  HiFilter,
  HiOutlineCube,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiSearch,
} from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Import dữ liệu giả (bao gồm cả fakeUsers)
import { allPets, categories, fakeUsers } from "../../data/fakeData";

// ===================================================================
// Định nghĩa hiệu ứng cho Modal
// ===================================================================
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
};

// ===================================================================
// Component Form Thú Cưng (Dùng chung cho Thêm & Sửa)
// ===================================================================
const PetForm = ({ initialData, onDataChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onDataChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cột 1: Thông tin cơ bản */}
      <div className="md:col-span-2 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên thú cưng
          </label>
          <input
            type="text"
            name="name"
            value={initialData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            name="description"
            value={initialData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phân loại (Category)
            </label>
            <select
              name="category_id"
              value={initialData.category_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              name="status"
              value={initialData.status}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="AVAILABLE">Sẵn sàng (Available)</option>
              <option value="SOLD">Đã bán (Sold)</option>
              <option value="DRAFT">Nháp (Draft)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cột 2: Chi tiết & Giá */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giá (VNĐ)
          </label>
          <input
            type="number"
            name="price"
            value={initialData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giá giảm giá (VNĐ)
          </label>
          <input
            type="number"
            name="discount_price"
            value={initialData.discount_price || ""}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số lượng tồn kho
          </label>
          <input
            type="number"
            name="stock_quantity"
            value={initialData.stock_quantity}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </div>

      {/* Hàng 2: Chi tiết vật lý & Sức khỏe */}
      <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tuổi
          </label>
          <input
            type="number"
            name="age"
            value={initialData.age}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Giới tính
          </label>
          <select
            name="gender"
            value={initialData.gender}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="MALE">Đực</option>
            <option value="FEMALE">Cái</option>
            <option value="UNKNOWN">Chưa rõ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Màu sắc
          </label>
          <input
            type="text"
            name="color"
            value={initialData.color}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Loại lông
          </label>
          <select
            name="fur_type"
            value={initialData.fur_type}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="SHORT">Ngắn</option>
            <option value="LONG">Dài</option>
            <option value="CURLY">Xoăn</option>
            <option value="NONE">Không lông</option>
            <option value="OTHER">Khác</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// ===================================================================
// Component Modal Thêm Thú Cưng (AddPetModal)
// ===================================================================
const AddPetModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: categories[0]?.category_id || "",
    age: 1,
    gender: "UNKNOWN",
    price: 0,
    discount_price: null,
    stock_quantity: 1,
    status: "DRAFT",
    weight: 1,
    height: 20,
    color: "Trắng",
    fur_type: "SHORT",
    health_status: "Tốt",
  });

  const handleSave = () => {
    console.log("Adding new pet:", formData);
    onClose(); // Đóng modal sau khi lưu
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Thêm thú cưng mới</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Form chung */}
        <PetForm initialData={formData} onDataChange={setFormData} />

        {/* Nút bấm */}
        <div className="flex justify-end items-center mt-6 pt-4 border-t">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm thú cưng
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================================================
// Component Modal Chỉnh Sửa Thú Cưng (EditPetModal)
// ===================================================================
const EditPetModal = ({ pet, onClose }) => {
  // Hooks must be called unconditionally
  const [formData, setFormData] = React.useState(
    pet || {
      name: "",
      description: "",
      category_id: categories[0]?.category_id || "",
      age: 1,
      gender: "UNKNOWN",
      price: 0,
      discount_price: null,
      stock_quantity: 1,
      status: "DRAFT",
      weight: 1,
      height: 20,
      color: "Trắng",
      fur_type: "SHORT",
      health_status: "Tốt",
    }
  );

  React.useEffect(() => {
    setFormData(pet || {});
  }, [pet]);

  if (!pet) return null;

  const handleSave = () => {
    console.log("Saving pet:", formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa thú cưng ${pet.name}?`)) {
      console.log("Deleting pet:", pet.pet_id);
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Chỉnh sửa thú cưng: {formData.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Form chung */}
        <PetForm initialData={formData} onDataChange={setFormData} />

        {/* Nút bấm */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <HiTrash /> Xóa
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================================================
// Component Modal Bộ Lọc (FilterModal)
// ===================================================================
const FilterModal = ({ onClose, filters, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = { category_id: "", status: "", price: "" };
    setLocalFilters(clearedFilters);
    onApply(clearedFilters);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full"
        variants={modalVariants}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Bộ lọc thú cưng</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <HiX size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phân loại
            </label>
            <select
              name="category_id"
              value={localFilters.category_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Tất cả phân loại</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              name="status"
              value={localFilters.status}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="AVAILABLE">Sẵn sàng</option>
              <option value="SOLD">Đã bán</option>
              <option value="DRAFT">Nháp</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Khoảng giá
            </label>
            <select
              name="price"
              value={localFilters.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Tất cả giá</option>
              <option value="under-5m">Dưới 5,000,000đ</option>
              <option value="5m-10m">5,000,000đ - 10,000,000đ</option>
              <option value="over-10m">Trên 10,000,000đ</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-6 pt-4 border-t">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Xóa bộ lọc
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Áp dụng
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================================================
// Component Modal Email (EmailModal) - NÂNG CẤP
// ===================================================================
const EmailModal = ({ onClose, petsToSend, allUsers }) => {
  const [emailContent, setEmailContent] = useState("");

  const petNames = petsToSend.map((p) => p.name).join(", ");
  const userCount = allUsers.length;

  const handleConfirmEmail = () => {
    if (!emailContent.trim()) return alert("Nhập nội dung email!");
    alert(`Đã gửi email về "${petNames}" tới ${userCount} khách hàng!`);
    onClose();
    setEmailContent("");
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
        variants={modalVariants}
      >
        <h3 className="text-lg font-bold mb-2">Gửi email quảng bá</h3>
        <p className="text-sm text-gray-600 mb-4">
          Nội dung email sẽ được gửi tới <strong>{userCount} khách hàng</strong>{" "}
          về {petsToSend.length} thú cưng.
        </p>
        <textarea
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          rows={5}
          placeholder={`Nội dung quảng bá cho: ${petNames}...`}
        ></textarea>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirmEmail}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded"
          >
            Gửi
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================================================
// Component Chính: Quản Lý Thú Cưng (PetsManagement)
// ===================================================================
export default function PetsManagement() {
  const [selectedPetIds, setSelectedPetIds] = useState([]); // Đổi tên state
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category_id: "",
    status: "",
    price: "",
  });
  const [expandedItems, setExpandedItems] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  const perPage = 10;

  // Lọc dữ liệu
  const filteredPets = allPets.filter((p) => {
    const priceVal = p.discount_price || p.price;
    const priceFilter =
      !filters.price ||
      (filters.price === "under-5m" && priceVal < 5000000) ||
      (filters.price === "5m-10m" &&
        priceVal >= 5000000 &&
        priceVal <= 10000000) ||
      (filters.price === "over-10m" && priceVal > 10000000);
    const searchFilter = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryFilter =
      !filters.category_id || p.category_id === filters.category_id;
    const statusFilter = !filters.status || p.status === filters.status;
    return searchFilter && categoryFilter && statusFilter && priceFilter;
  });

  const totalPages = Math.ceil(filteredPets.length / perPage);
  const paginatedData = filteredPets.slice(
    (page - 1) * perPage,
    page * perPage
  );

  // Stats
  const stats = [
    {
      title: "Tổng kho",
      value: allPets.reduce((sum, p) => sum + p.stock_quantity, 0),
      icon: HiOutlineCube,
      color: "blue",
    },
    {
      title: "Sẵn sàng bán",
      value: allPets.filter((p) => p.status === "AVAILABLE").length,
      icon: HiOutlineCheckCircle,
      color: "green",
    },
    {
      title: "Đã bán",
      value: allPets.filter((p) => p.status === "SOLD").length,
      icon: HiOutlineXCircle,
      color: "red",
    },
    {
      title: "Đang nháp",
      value: allPets.filter((p) => p.status === "DRAFT").length,
      icon: HiOutlineClock,
      color: "yellow",
    },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPetIds(paginatedData.map((p) => p.pet_id));
    } else {
      setSelectedPetIds([]);
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenEditModal = (pet) => {
    setCurrentPet(pet);
    setIsEditModalOpen(true);
  };

  const handleSendEmail = () => {
    if (selectedPetIds.length === 0)
      return alert("Bạn phải chọn ít nhất 1 thú cưng để gửi email quảng bá!");
    setIsEmailModalOpen(true);
  };

  const handleCloseEmail = () => {
    setIsEmailModalOpen(false);
    setSelectedPetIds([]); // Xóa chọn sau khi gửi
  };

  // Hàm helper
  const StatusPill = ({ status }) => {
    const styles = {
      AVAILABLE: "bg-green-100 text-green-800",
      SOLD: "bg-red-100 text-red-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
    };
    const text = { AVAILABLE: "Sẵn sàng", SOLD: "Đã bán", DRAFT: "Nháp" };
    return (
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {text[status] || status}
      </span>
    );
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  // Lấy danh sách pet đầy đủ cho modal email
  const selectedPetsData = allPets.filter((p) =>
    selectedPetIds.includes(p.pet_id)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Quản Lý Thú Cưng
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-4"
            >
              <div
                className={`p-3 rounded-full bg-${s.color}-100 text-${s.color}-600`}
              >
                <s.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{s.title}</p>
                <p className="text-2xl font-bold text-gray-800">
                  {s.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ====== LAYOUT ĐÃ SỬA ====== */}
        {/* Hàng 1: Tìm kiếm & Lọc (Căn phải) - ĐÃ HOÁN ĐỔI */}
        <div className="flex justify-end items-center mb-4 gap-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Tìm theo tên thú cưng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border rounded-lg hover:bg-gray-50 shadow-sm"
          >
            <HiFilter />
            <span className="hidden md:inline">Bộ lọc</span>
          </button>
        </div>

        {/* Hàng 2: Nút chức năng (Căn trái) - ĐÃ HOÁN ĐỔI */}
        <div className="flex justify-start items-center mb-4 gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
          >
            <HiPlus /> Thêm Mới
          </button>
          <button
            onClick={handleSendEmail}
            disabled={selectedPetIds.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-sm"
          >
            <HiMail /> Gửi Email ({selectedPetIds.length})
          </button>
        </div>
        {/* ====== KẾT THÚC LAYOUT ĐÃ SỬA ====== */}

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" onChange={handleSelectAll} />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thú cưng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <React.Fragment key={item.pet_id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPetIds.includes(item.pet_id)}
                        onChange={() =>
                          setSelectedPetIds((prev) =>
                            prev.includes(item.pet_id)
                              ? prev.filter((id) => id !== item.pet_id)
                              : [...prev, item.pet_id]
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.images.find((img) => img.is_thumbnail)
                              ?.image_url
                          }
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.category_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.stock_quantity}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item.discount_price ? (
                        <div>
                          <p className="font-semibold text-red-600">
                            {formatCurrency(item.discount_price)}
                          </p>
                          <p className="line-through text-gray-500 text-xs">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      ) : (
                        <p className="font-semibold text-gray-700">
                          {formatCurrency(item.price)}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill status={item.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {/* ====== NÚT ĐÃ SỬA HOVER ====== */}
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                          title="Sửa"
                        >
                          <HiPencil size={20} />
                        </button>
                        <button
                          onClick={() => toggleExpand(item.pet_id)}
                          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                          title="Xem chi tiết"
                        >
                          {expandedItems[item.pet_id] ? (
                            <HiChevronUp size={20} />
                          ) : (
                            <HiChevronDown size={20} />
                          )}
                        </button>
                        {/* ====== KẾT THÚC SỬA HOVER ====== */}
                      </div>
                    </td>
                  </tr>

                  {/* Hàng mở rộng chi tiết - (Style viền xanh) */}
                  {expandedItems[item.pet_id] && (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-4 bg-blue-50 border-l-4 border-blue-500"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <p className="text-sm font-semibold mb-2">
                              Hình ảnh
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {item.images.map((img) => (
                                <img
                                  key={img.image_id}
                                  src={img.image_url}
                                  alt="Pet"
                                  className="w-full h-24 object-cover rounded-md border shadow-sm"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-semibold mb-2">
                              Chi tiết thú cưng
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                              <p>
                                <strong className="text-gray-600">
                                  Màu sắc:
                                </strong>{" "}
                                {item.color}
                              </p>
                              <p>
                                <strong className="text-gray-600">
                                  Giới tính:
                                </strong>{" "}
                                {item.gender}
                              </p>
                              <p>
                                <strong className="text-gray-600">Tuổi:</strong>{" "}
                                {item.age}
                              </p>
                              <p>
                                <strong className="text-gray-600">
                                  Cân nặng:
                                </strong>{" "}
                                {item.weight} kg
                              </p>
                              <p>
                                <strong className="text-gray-600">
                                  Chiều cao:
                                </strong>{" "}
                                {item.height} cm
                              </p>
                              <p>
                                <strong className="text-gray-600">Lông:</strong>{" "}
                                {item.fur_type}
                              </p>
                            </div>
                            <p className="mt-2 text-sm">
                              <strong className="text-gray-600">Mô tả:</strong>{" "}
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
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
            <FaChevronLeft />
          </button>
          <span>
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded border disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Khu vực render Modal (với AnimatePresence) */}
        <AnimatePresence>
          {isAddModalOpen && (
            <AddPetModal onClose={() => setIsAddModalOpen(false)} />
          )}

          {isEditModalOpen && currentPet && (
            <EditPetModal
              pet={currentPet}
              onClose={() => setIsEditModalOpen(false)}
            />
          )}

          {isFilterModalOpen && (
            <FilterModal
              onClose={() => setIsFilterModalOpen(false)}
              filters={filters}
              onApply={(newFilters) => {
                setFilters(newFilters);
                setPage(1);
              }}
            />
          )}

          {isEmailModalOpen && (
            <EmailModal
              onClose={handleCloseEmail}
              petsToSend={selectedPetsData} // Truyền dữ liệu pet đã chọn
              allUsers={fakeUsers} // Truyền danh sách user
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
