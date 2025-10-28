"use client"

import { useState } from "react"
import { HiSearch, HiPlus, HiPencil, HiTrash, HiTrendingUp, HiX, HiDuplicate } from "react-icons/hi"
import AddPromotionModal from "./AddPromotionModal"
import EditPromotionModal from "./EditPromotionModal"
import ViewPromotionModal from "./ViewPromotionModal"

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

export default function PromotionList({ darkMode }) {
  const categories = [
    { id: null, name: "Tất cả danh mục" },
    { id: "C001", name: "Chó" },
    { id: "C002", name: "Mèo" },
    { id: "C003", name: "Poodle" },
    { id: "C004", name: "Golden Retriever" },
    { id: "C005", name: "Husky" },
    { id: "C006", name: "Mèo Ba Tư" },
    { id: "C007", name: "Mèo Anh Lông Ngắn" },
    { id: "C008", name: "Mèo Xiêm" },
    { id: "C009", name: "Chihuahua" },
    { id: "C010", name: "Mèo Ragdoll" },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  const itemsPerPage = 9

  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: "Flash Sale Cuối Tuần",
      description: "Giảm giá sốc cuối tuần",
      discountType: "percentage",
      discountValue: 30,
      categoryId: null,
      categoryName: "Tất cả danh mục",
      startDate: "2024-06-15",
      endDate: "2024-06-17",
      status: "active",
      image: "/images/flash-sale-30--weekend-discount.jpg",
    },
    {
      id: 2,
      name: "Mua 2 Tặng 1",
      description: "Mua 2 sản phẩm tặng 1 sản phẩm",
      discountType: "buy_x_get_y",
      discountValue: null,
      categoryId: "C001",
      categoryName: "Chó",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      status: "active",
      image: "/images/buy-2-get-1-free-promotion.jpg",
    },
    {
      id: 3,
      name: "Giảm Giá Sinh Nhật",
      description: "Khuyến mãi sinh nhật công ty",
      discountType: "fixed",
      discountValue: 100000,
      categoryId: "C002",
      categoryName: "Mèo",
      startDate: "2024-05-01",
      endDate: "2024-05-15",
      status: "expired",
      image: "/images/birthday-sale-celebration-discount.jpg",
    },
    {
      id: 4,
      name: "MIOSH SALE",
      description: "Khuyến mãi đặc biệt MIOSH",
      discountType: "percentage",
      discountValue: 30,
      categoryId: "C003",
      categoryName: "Poodle",
      startDate: "2024-07-12",
      endDate: "2024-08-19",
      status: "active",
      image: "/images/miosh-sale-30--discount.jpg",
    },
    {
      id: 5,
      name: "MIGHP LBL",
      description: "Khuyến mãi MIGHP LBL",
      discountType: "percentage",
      discountValue: 30,
      categoryId: "C006",
      categoryName: "Mèo Ba Tư",
      startDate: "2024-07-28",
      endDate: "2024-08-12",
      status: "active",
      image: "/images/mighp-lbl-30--promotion.jpg",
    },
    {
      id: 6,
      name: "FLASH SALE 50%",
      description: "Flash sale giảm 50%",
      discountType: "percentage",
      discountValue: 50,
      categoryId: null,
      categoryName: "Tất cả danh mục",
      startDate: "2024-05-07",
      endDate: "2024-08-13",
      status: "active",
      image: "/images/flash-sale-50--mega-discount.jpg",
    },
  ])

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter
    const matchesType = typeFilter === "all" || promotion.discountType === typeFilter
    const matchesCategory =
      categoryFilter === "all" ||
      promotion.categoryId === categoryFilter ||
      (categoryFilter === "null" && promotion.categoryId === null)
    return matchesSearch && matchesStatus && matchesType && matchesCategory
  })

  const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPromotions = filteredPromotions.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc muốn xóa khuyến mãi này?")) {
      setPromotions(promotions.filter((p) => p.id !== id))
    }
  }

  const handleEdit = (promotion) => {
    setSelectedPromotion(promotion)
    setShowEditModal(true)
  }

  const handleView = (promotion) => {
    setSelectedPromotion(promotion)
    setShowViewModal(true)
  }

  const handleSaveEdit = (updatedPromotion) => {
    setPromotions(promotions.map((p) => (p.id === updatedPromotion.id ? updatedPromotion : p)))
    setShowEditModal(false)
  }

  const handleAddPromotion = (newPromotion) => {
    const categoryName = categories.find((c) => c.id === newPromotion.categoryId)?.name || "Tất cả danh mục"
    setPromotions([...promotions, { ...newPromotion, id: Date.now(), categoryName }])
    setShowAddModal(false)
  }

  const handleDuplicate = (promotion) => {
    const newPromotion = {
      ...promotion,
      id: Date.now(),
      name: `${promotion.name} (Copy)`,
    }
    setPromotions([...promotions, newPromotion])
  }

  const handleToggleStatus = (id) => {
    setPromotions(
      promotions.map((p) => (p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p)),
    )
  }

  const totalPromotions = promotions.length
  const activePromotions = promotions.filter((p) => p.status === "active").length
  const avgDiscount =
    promotions.filter((p) => p.discountValue).reduce((sum, p) => sum + p.discountValue, 0) /
    promotions.filter((p) => p.discountValue).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Khuyến mãi Hoạt động</p>
              <p className="text-3xl font-bold text-green-600">{activePromotions}</p>
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
              <p className="text-sm text-gray-500 mb-1">Tổng Khuyến mãi</p>
              <p className="text-3xl font-bold text-blue-600">{totalPromotions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <HiTrendingUp className="w-4 h-4 mr-1" />
            <span>Tổng số khuyến mãi</span>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Giảm giá TB</p>
              <p className="text-3xl font-bold text-orange-600">{avgDiscount.toFixed(0)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-orange-600">
            <HiTrendingUp className="w-4 h-4 mr-1" />
            <span>Mức giảm trung bình</span>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-[#7b4f35]">Quản lý Khuyến mãi</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              <HiPlus className="h-5 w-5" />
              Tạo mới
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="all">Danh mục</option>
                {categories.map((category) => (
                  <option key={category.id || "null"} value={category.id || "null"}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

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
                <option value="buy_x_get_y">Mua X Tặng Y</option>
              </select>
            </div>

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
            {paginatedPromotions.map((promotion) => (
              <div
                key={promotion.id}
                className={`rounded-xl overflow-hidden ${
                  darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"
                } border shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group`}
              >
                <div
                  className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => setLightboxImage({ image: promotion.image, alt: promotion.name })}
                >
                  <img
                    src={promotion.image || "/placeholder.svg"}
                    alt={promotion.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                      Xem ảnh
                    </span>
                  </div>

                  {promotion.discountValue && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        {promotion.discountType === "percentage"
                          ? `${promotion.discountValue}%`
                          : `${(promotion.discountValue / 1000).toFixed(0)}K`}
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleStatus(promotion.id)
                      }}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                        promotion.status === "active"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : promotion.status === "expired"
                            ? "bg-red-500 text-white cursor-not-allowed"
                            : "bg-gray-500 hover:bg-gray-600 text-white"
                      }`}
                      disabled={promotion.status === "expired"}
                    >
                      {promotion.status === "active"
                        ? "Hoạt động"
                        : promotion.status === "expired"
                          ? "Hết hạn"
                          : "Tạm dừng"}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#7b4f35] mb-2 truncate">{promotion.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{promotion.description}</p>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-gray-500">Danh mục:</span>
                    <span className="font-semibold truncate ml-2 text-[#7b4f35]">{promotion.categoryName}</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    {new Date(promotion.startDate).toLocaleDateString("vi-VN")} -{" "}
                    {new Date(promotion.endDate).toLocaleDateString("vi-VN")}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(promotion)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleDuplicate(promotion)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Nhân bản"
                    >
                      <HiDuplicate className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(promotion)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <HiPencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(promotion.id)}
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
              Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPromotions.length)} tổng số{" "}
              {filteredPromotions.length} mục
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Trước
              </button>

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

      {showAddModal && (
        <AddPromotionModal darkMode={darkMode} onClose={() => setShowAddModal(false)} onSave={handleAddPromotion} />
      )}
      {showEditModal && selectedPromotion && (
        <EditPromotionModal
          darkMode={darkMode}
          promotion={selectedPromotion}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
      {showViewModal && selectedPromotion && (
        <ViewPromotionModal darkMode={darkMode} promotion={selectedPromotion} onClose={() => setShowViewModal(false)} />
      )}
    </div>
  )
}