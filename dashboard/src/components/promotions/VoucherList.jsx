"use client"

import { useState } from "react"
import { HiSearch, HiPlus, HiPencil, HiTrash, HiTrendingUp, HiX, HiDuplicate, HiClipboardCopy } from "react-icons/hi"
import AddVoucherModal from "./AddVoucherModal"
import EditVoucherModal from "./EditVoucherModal"
import ViewVoucherModal from "./ViewVoucherModal"

function ImageLightbox({ image, alt, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <HiX className="w-6 h-6" />
      </button>
      <img
        src={image || "/placeholder.svg"}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default function VoucherList({ darkMode }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)
  const itemsPerPage = 9

  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      code: "SUMMER2024",
      description: "Giảm giá mùa hè",
      discountType: "percentage",
      discountValue: 20,
      minOrderValue: 100000,
      maxDiscount: 50000,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      usageLimit: 100,
      usedCount: 45,
      status: "active",
      image: "/images/summer-sale-20--discount-voucher.jpg",
    },
    {
      id: 2,
      code: "WELCOME10",
      description: "Voucher chào mừng",
      discountType: "fixed",
      discountValue: 50000,
      minOrderValue: 200000,
      maxDiscount: null,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      usageLimit: 1000,
      usedCount: 234,
      status: "active",
      image: "/images/welcome-voucher-coffee-cup.jpg",
    },
    {
      id: 3,
      code: "FLASH50",
      description: "Flash sale 50%",
      discountType: "percentage",
      discountValue: 50,
      minOrderValue: 500000,
      maxDiscount: 200000,
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      usageLimit: 50,
      usedCount: 50,
      status: "expired",
      image: "/images/flash-sale-50--discount-badge.jpg",
    },
    {
      id: 4,
      code: "NEWYEAR2024",
      description: "Khuyến mãi năm mới",
      discountType: "percentage",
      discountValue: 30,
      minOrderValue: 300000,
      maxDiscount: 100000,
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      usageLimit: 200,
      usedCount: 180,
      status: "active",
      image: "/images/new-year-30--sale-celebration.jpg",
    },
    {
      id: 5,
      code: "FREESHIP",
      description: "Miễn phí vận chuyển",
      discountType: "fixed",
      discountValue: 30000,
      minOrderValue: 150000,
      maxDiscount: null,
      startDate: "2024-06-01",
      endDate: "2024-12-31",
      usageLimit: 500,
      usedCount: 120,
      status: "active",
      image: "/images/free-shipping-truck.png",
    },
    {
      id: 6,
      code: "MEGA50",
      description: "Mega sale 50%",
      discountType: "percentage",
      discountValue: 50,
      minOrderValue: 1000000,
      maxDiscount: 500000,
      startDate: "2024-07-01",
      endDate: "2024-07-15",
      usageLimit: 100,
      usedCount: 25,
      status: "active",
      image: "/images/mega-sale-50--discount-tag.jpg",
    },
  ])

  // Filter and search
  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch =
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || voucher.status === statusFilter
    const matchesType = typeFilter === "all" || voucher.discountType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVouchers = filteredVouchers.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xóa voucher này?")) {
      setVouchers(vouchers.filter((v) => v.id !== id))
    }
  }

  const handleEdit = (voucher) => {
    setSelectedVoucher(voucher)
    setShowEditModal(true)
  }

  const handleView = (voucher) => {
    setSelectedVoucher(voucher)
    setShowViewModal(true)
  }

  const handleSaveEdit = (updatedVoucher) => {
    setVouchers(vouchers.map((v) => (v.id === updatedVoucher.id ? updatedVoucher : v)))
    setShowEditModal(false)
  }

  const handleAddVoucher = (newVoucher) => {
    setVouchers([...vouchers, { ...newVoucher, id: Date.now() }])
    setShowAddModal(false)
  }

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDuplicate = (voucher) => {
    const newVoucher = {
      ...voucher,
      id: Date.now(),
      code: `${voucher.code}_COPY`,
      usedCount: 0,
    }
    setVouchers([...vouchers, newVoucher])
  }

  const handleToggleStatus = (id) => {
    setVouchers(
      vouchers.map((v) => (v.id === id ? { ...v, status: v.status === "active" ? "inactive" : "active" } : v)),
    )
  }

  const totalVouchers = vouchers.length
  const activeVouchers = vouchers.filter((v) => v.status === "active").length
  const totalUsage = vouchers.reduce((sum, v) => sum + v.usedCount, 0)
  const redemptionRate = vouchers.reduce((sum, v) => sum + (v.usedCount / v.usageLimit) * 100, 0) / vouchers.length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Voucher Hoạt động</p>
              <p className="text-3xl font-bold text-green-600">{activeVouchers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <HiTrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <HiTrendingUp className="w-4 h-4 mr-1" />
            <span>Đang hoạt động</span>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng Voucher</p>
              <p className="text-3xl font-bold text-blue-600">{totalVouchers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <HiTrendingUp className="w-4 h-4 mr-1" />
            <span>Tổng số voucher</span>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tỷ lệ sử dụng</p>
              <p className="text-3xl font-bold text-orange-600">{redemptionRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-orange-600">
            <HiTrendingUp className="w-4 h-4 mr-1" />
            <span>Redemption rate</span>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-[#7b4f35]">Quản lý Voucher</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              <HiPlus className="h-5 w-5" />
              Tạo mới
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="all">Trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="expired">Hết hạn</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="all">Loại</option>
                <option value="percentage">Phần trăm</option>
                <option value="fixed">Cố định</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option>Sắp xếp</option>
                <option>Mới nhất</option>
                <option>Cũ nhất</option>
                <option>Tên A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVouchers.map((voucher) => (
              <div
                key={voucher.id}
                className={`rounded-xl overflow-hidden ${
                  darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"
                } border shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div
                  className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => setLightboxImage({ image: voucher.image, alt: voucher.code })}
                >
                  <img
                    src={voucher.image || "/placeholder.svg"}
                    alt={voucher.code}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                      Xem ảnh
                    </span>
                  </div>

                  <div className="absolute top-3 left-3">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                      {voucher.discountType === "percentage"
                        ? `${voucher.discountValue}%`
                        : `${(voucher.discountValue / 1000).toFixed(0)}K`}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleStatus(voucher.id)
                      }}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                        voucher.status === "active"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : voucher.status === "expired"
                            ? "bg-red-500 text-white cursor-not-allowed"
                            : "bg-gray-500 hover:bg-gray-600 text-white"
                      }`}
                      disabled={voucher.status === "expired"}
                    >
                      {voucher.status === "active"
                        ? "Hoạt động"
                        : voucher.status === "expired"
                          ? "Hết hạn"
                          : "Tạm dừng"}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-[#7b4f35] truncate flex-1">{voucher.code}</h3>
                    <button
                      onClick={() => handleCopyCode(voucher.code)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group/copy"
                      title="Copy mã"
                    >
                      {copiedCode === voucher.code ? (
                        <span className="text-green-600 text-xs font-semibold">Đã copy!</span>
                      ) : (
                        <HiClipboardCopy className="w-5 h-5 text-gray-400 group-hover/copy:text-[#7b4f35]" />
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{voucher.description}</p>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-gray-500">Đã dùng:</span>
                    <span className="font-semibold">
                      {voucher.usedCount}/{voucher.usageLimit}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    {new Date(voucher.startDate).toLocaleDateString("vi-VN")} -{" "}
                    {new Date(voucher.endDate).toLocaleDateString("vi-VN")}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(voucher)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleDuplicate(voucher)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Nhân bản"
                    >
                      <HiDuplicate className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(voucher)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <HiPencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(voucher.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVouchers.length)} tổng số{" "}
              {filteredVouchers.length} mục
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Trước
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === i + 1 ? "bg-[#7b4f35] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <ImageLightbox image={lightboxImage.image} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
      )}

      {/* Modals */}
      {showAddModal && (
        <AddVoucherModal darkMode={darkMode} onClose={() => setShowAddModal(false)} onSave={handleAddVoucher} />
      )}
      {showEditModal && selectedVoucher && (
        <EditVoucherModal
          darkMode={darkMode}
          voucher={selectedVoucher}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
      {showViewModal && selectedVoucher && (
        <ViewVoucherModal darkMode={darkMode} voucher={selectedVoucher} onClose={() => setShowViewModal(false)} />
      )}
    </div>
  )
}