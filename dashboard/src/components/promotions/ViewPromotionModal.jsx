"use client"

import { HiX } from "react-icons/hi"

export default function ViewPromotionModal({ darkMode, promotion, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-xl shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="bg-[#7b4f35] text-white p-6 flex items-center justify-between rounded-t-xl">
          <h3 className="text-2xl font-bold">Chi tiết Khuyến mãi</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#6a4330] rounded-lg transition-colors">
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tên khuyến mãi</p>
              <p className="font-bold text-[#7b4f35] text-lg">{promotion.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  promotion.status === "active"
                    ? "bg-green-100 text-green-800"
                    : promotion.status === "expired"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {promotion.status === "active"
                  ? "Hoạt động"
                  : promotion.status === "expired"
                    ? "Hết hạn"
                    : "Không hoạt động"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Mô tả</p>
            <p className="text-base">{promotion.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Loại khuyến mãi</p>
              <p className="text-base font-medium">
                {promotion.discountType === "percentage"
                  ? "Phần trăm"
                  : promotion.discountType === "fixed"
                    ? "Cố định"
                    : "Mua X Tặng Y"}
              </p>
            </div>
            {promotion.discountValue && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Giá trị giảm</p>
                <p className="text-base font-bold text-[#7b4f35]">
                  {promotion.discountType === "percentage"
                    ? `${promotion.discountValue}%`
                    : `${promotion.discountValue.toLocaleString()}đ`}
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Áp dụng cho</p>
            <p className="text-base">{promotion.applicableProducts}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Ngày bắt đầu</p>
              <p className="text-base">{promotion.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Ngày kết thúc</p>
              <p className="text-base">{promotion.endDate}</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-[#7b4f35] text-white rounded-lg hover:bg-[#6a4330] transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}