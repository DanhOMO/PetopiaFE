"use client"

import { useState } from "react"
import { HiX, HiUpload } from "react-icons/hi"

export default function AddVoucherModal({ darkMode, onClose, onSave }) {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    status: "active",
    image: "",
  })

  const [imagePreview, setImagePreview] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      discountValue: Number.parseFloat(formData.discountValue),
      minOrderValue: Number.parseFloat(formData.minOrderValue),
      maxDiscount: formData.maxDiscount ? Number.parseFloat(formData.maxDiscount) : null,
      usageLimit: Number.parseInt(formData.usageLimit),
      usedCount: 0,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        {/* Header - Sticky */}
        <div className="flex-shrink-0 bg-[#7b4f35] text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h3 className="text-xl font-bold">Thêm Voucher Mới</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#6a4330] rounded-lg transition-colors">
            <HiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <form onSubmit={handleSubmit} id="add-voucher-form">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Hình ảnh Voucher</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      darkMode
                        ? "border-gray-600 hover:border-gray-500 bg-gray-700"
                        : "border-gray-300 hover:border-[#7b4f35] bg-gray-50"
                    } transition-colors`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Click để tải ảnh lên</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
                {imagePreview && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-[#7b4f35]">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Mã Voucher *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                  placeholder="VD: SUMMER2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Loại giảm giá *</label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                >
                  <option value="percentage">Phần trăm (%)</option>
                  <option value="fixed">Cố định (VNĐ)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Mô tả *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                  placeholder="Mô tả chi tiết về voucher"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Giá trị giảm *</label>
                <input
                  type="number"
                  required
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                  placeholder={formData.discountType === "percentage" ? "20" : "50000"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Đơn hàng tối thiểu</label>
                <input
                  type="number"
                  value={formData.minOrderValue}
                  onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                  placeholder="100000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Giảm tối đa (VNĐ)</label>
                <input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                  placeholder="50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Số lượng sử dụng *</label>
                <input
                  type="number"
                  required
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ngày bắt đầu *</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ngày kết thúc *</label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Trạng thái *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#7b4f35]`}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              form="add-voucher-form"
              className="flex-1 px-4 py-2 bg-[#7b4f35] text-white rounded-lg hover:bg-[#6a4330] transition-colors"
            >
              Thêm Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}