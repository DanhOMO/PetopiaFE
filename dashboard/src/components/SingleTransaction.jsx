"use client";
import {
  HiArrowLeft,
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiRefresh,
  HiShoppingCart,
  HiUser,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCalendar,
  HiCurrencyDollar,
} from "react-icons/hi";

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

export default function SingleTransaction({ transaction, onBack }) {
  // Kiểm tra nếu transaction là null
  if (!transaction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <button
          onClick={onBack}
          className="glow-button mb-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
        >
          <HiArrowLeft className="text-lg" /> Quay lại Danh sách giao dịch
        </button>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 animate-fade-in-up">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiShoppingCart className="text-blue-600 text-4xl" />
          </div>
          <p className="text-lg font-semibold text-gray-800">
            Vui lòng chọn một giao dịch từ danh sách để xem chi tiết.
          </p>
        </div>
      </div>
    );
  }

  const { id, dueDate, status, products, customerDetails, orderHistory } =
    transaction;

  const subtotal = products.reduce(
    (sum, p) =>
      sum + Number.parseFloat(p.total.replace("$", "").replace(",", "")),
    0
  );
  const tax = subtotal * 0.05; // Giả lập thuế 5%
  const shippingEstimate = 0; // Giả lập phí vận chuyển
  const orderTotal = subtotal + tax + shippingEstimate;

  const StatusIcon = statusIcons[status];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <button
        onClick={onBack}
        className="glow-button mb-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
      >
        <HiArrowLeft className="text-lg" /> Quay lại Danh sách giao dịch
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg">
              <HiShoppingCart className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Chi tiết giao dịch
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                ID Đơn hàng:{" "}
                <span className="font-semibold text-gray-700">{id}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${statusColors[status]} shadow-md`}
            >
              <StatusIcon className="text-lg" />
              {status === "Completed"
                ? "Hoàn thành"
                : status === "Pending"
                ? "Đang chờ"
                : status === "Refunded"
                ? "Hoàn tiền"
                : status}
            </span>
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
              <HiCalendar className="text-lg" />
              <span className="text-sm font-medium">{dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="detail-card bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HiShoppingCart className="text-xl" />
              Chi tiết đơn hàng
            </h3>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-slate-50 border-b-2 border-blue-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Tên sản phẩm
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      SL
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Giá
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Giảm
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Tổng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{product.qty}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {product.price}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {product.discount}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {product.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <HiCurrencyDollar className="text-blue-600 text-xl" />
                Tổng kết đơn hàng
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tổng phụ:</span>
                  <span className="font-semibold text-gray-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thuế (5%):</span>
                  <span className="font-semibold text-gray-800">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vận chuyển:</span>
                  <span className="font-semibold text-gray-800">
                    ${shippingEstimate.toFixed(2)}
                  </span>
                </div>
                <div className="border-t-2 border-blue-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Tổng cộng:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-card bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HiUser className="text-xl" />
              Chi tiết khách hàng
            </h3>
          </div>

          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                  <HiUser className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Tên khách hàng
                  </p>
                  <p className="font-semibold text-gray-800">
                    {customerDetails.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                  <HiMail className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="font-semibold text-gray-800">
                    {customerDetails.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                  <HiPhone className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Số điện thoại
                  </p>
                  <p className="font-semibold text-gray-800">
                    {customerDetails.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                  <HiLocationMarker className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Địa chỉ</p>
                  <p className="font-semibold text-gray-800">
                    {customerDetails.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <HiCalendar className="text-purple-600 text-xl" />
                Lịch sử đơn hàng
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-purple-200">
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">
                        ID
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">
                        Ngày
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">
                        Tổng
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.length > 0 ? (
                      orderHistory.map((order, index) => {
                        const OrderStatusIcon = statusIcons[order.status];
                        return (
                          <tr
                            key={index}
                            className="border-b border-purple-100 hover:bg-white transition-all duration-200"
                          >
                            <td className="px-3 py-3 font-medium text-gray-800">
                              {order.id}
                            </td>
                            <td className="px-3 py-3 text-gray-600">
                              {order.date}
                            </td>
                            <td className="px-3 py-3 font-semibold text-gray-800">
                              {order.total}
                            </td>
                            <td className="px-3 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                                  statusColors[order.status]
                                }`}
                              >
                                <OrderStatusIcon className="text-sm" />
                                {order.status === "Completed"
                                  ? "Hoàn thành"
                                  : order.status === "Pending"
                                  ? "Đang chờ"
                                  : order.status === "Refunded"
                                  ? "Hoàn tiền"
                                  : order.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-6">
                          <div className="flex flex-col items-center gap-2">
                            <div className="bg-white p-3 rounded-full">
                              <HiCalendar className="text-purple-400 text-2xl" />
                            </div>
                            <p className="text-gray-500 font-medium">
                              Không có lịch sử đơn hàng
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
