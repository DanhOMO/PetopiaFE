"use client";
import React, { useState, useMemo } from "react";
import {
  FaStar,
  FaHeart,
  FaThumbtack,
  FaTrash,
  FaReply,
  FaBell, // Thêm icon chuông cho thông báo mới
} from "react-icons/fa";
import { HiX } from "react-icons/hi";

// --- DỮ LIỆU GIẢ (Giữ nguyên logic cũ nhưng chỉnh lại ngày tháng để dễ test hiển thị 'Mới') ---
const generateReviews = (petId) => {
  const reviews = [];
  const names = [
    "Nguyễn An",
    "Trần Bình",
    "Lê Cường",
    "Phạm Dung",
    "Hoàng Minh",
  ];
  const comments = [
    "Rất đáng yêu!",
    "Dịch vụ tốt",
    "Sẽ quay lại",
    "Giá hợp lý",
    "Nhân viên nhiệt tình",
  ];

  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    // Random ngày từ hôm nay trở về trước 10 ngày để dễ thấy badge "Mới"
    const randomDaysAgo = Math.random() * 10;

    reviews.push({
      id: `R${petId}-${i}`,
      petId,
      customerName: names[i % names.length],
      rating: Math.floor(Math.random() * 2) + 4,
      comment: comments[i % comments.length],
      date: new Date(Date.now() - randomDaysAgo * 86400000),
      isPinned: i === 0 && Math.random() > 0.7,
      adminReply:
        i % 3 === 0 ? { text: "Cảm ơn bạn!", date: new Date() } : null,
      liked: Math.random() > 0.7,
      likes: Math.floor(Math.random() * 100),
    });
  }
  return reviews;
};

const allPets = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Pet #${i + 1}`,
  images: ["https://via.placeholder.com/200"],
  reviews: generateReviews(i + 1),
}));

// Flatten reviews cho state quản lý chung
const initialReviews = allPets.flatMap((p) =>
  p.reviews.map((r) => ({ ...r, petName: p.name }))
);

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [search, setSearch] = useState("");

  // Helper: Lấy reviews của 1 pet cụ thể từ state tổng
  const getPetReviews = (petId) => reviews.filter((r) => r.petId === petId);

  // Helper: Lấy ngày đánh giá mới nhất của 1 pet
  const getLatestReviewDate = (petId) => {
    const petReviews = getPetReviews(petId);
    if (petReviews.length === 0) return 0;
    // Sort giảm dần theo thời gian để lấy cái đầu tiên
    const sorted = [...petReviews].sort((a, b) => b.date - a.date);
    return sorted[0].date;
  };

  // Helper: Kiểm tra xem đánh giá gần nhất có phải "Mới" không (trong vòng 3 ngày)
  const isRecent = (date) => {
    if (!date) return false;
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3; // Quy định: <= 3 ngày là mới
  };

  // Xử lý lọc và SẮP XẾP
  const sortedAndFilteredPets = useMemo(() => {
    // 1. Lọc theo từ khóa tìm kiếm
    let result = allPets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase()) &&
        getPetReviews(pet.id).length > 0
    );

    // 2. Sắp xếp: Pet nào có review mới nhất thì lên đầu
    result.sort((a, b) => {
      const dateA = getLatestReviewDate(a.id);
      const dateB = getLatestReviewDate(b.id);
      return dateB - dateA; // Giảm dần (Mới nhất -> Cũ nhất)
    });

    return result;
  }, [search, reviews]); // Chạy lại khi search hoặc data reviews thay đổi

  // --- Các hàm xử lý hành động (giữ nguyên) ---
  const handleLike = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              liked: !r.liked,
              likes: r.liked ? r.likes - 1 : r.likes + 1,
            }
          : r
      )
    );
  };

  const handlePin = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isPinned: !r.isPinned } : r))
    );
  };

  const handleReply = (id) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, adminReply: { text: replyText, date: new Date() } }
          : r
      )
    );
    setReplyText("");
    setEditingReplyId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Quản Lý Đánh Giá</h1>
          <input
            placeholder="Tìm tên thú cưng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 p-2 border rounded bg-white shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedAndFilteredPets.map((pet) => {
            const petReviews = getPetReviews(pet.id);
            const latestDate = getLatestReviewDate(pet.id);
            const hasNewReview = isRecent(latestDate);

            // Tính điểm trung bình
            const avg =
              petReviews.length > 0
                ? (
                    petReviews.reduce((a, r) => a + r.rating, 0) /
                    petReviews.length
                  ).toFixed(1)
                : 0;

            return (
              <div
                key={pet.id}
                onClick={() => {
                  setSelectedPet(pet);
                  setShowModal(true);
                }}
                className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer relative group overflow-hidden"
              >
                {/* Badge thông báo mới */}
                {hasNewReview && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1 shadow-sm animate-pulse">
                    <FaBell /> Mới
                  </div>
                )}

                <div className="p-4">
                  <div className="relative">
                    <img
                      src={pet.images[0]}
                      alt={pet.name}
                      className="w-full h-32 object-cover rounded mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">
                    {pet.name}
                  </h3>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-medium">
                      <FaStar className="fill-current" />
                      <span>{avg}</span>
                      <span className="text-gray-400 font-normal">
                        ({petReviews.length})
                      </span>
                    </div>
                    {/* Hiển thị ngày mới nhất nhỏ ở góc */}
                    <span className="text-[10px] text-gray-400">
                      {latestDate ? latestDate.toLocaleDateString("vi-VN") : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Review Modal (Phần này giữ nguyên logic hiển thị chi tiết) --- */}
        {showModal && selectedPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fade-in">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Đánh giá: {selectedPet.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Tổng {getPetReviews(selectedPet.id).length} đánh giá
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <HiX className="text-2xl text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Sắp xếp trong modal: Ghim lên đầu, sau đó đến mới nhất */}
                {getPetReviews(selectedPet.id)
                  .sort((a, b) => {
                    if (a.isPinned && !b.isPinned) return -1;
                    if (!a.isPinned && b.isPinned) return 1;
                    return b.date - a.date;
                  })
                  .map((review) => (
                    <div
                      key={review.id}
                      className={`p-4 rounded-lg border ${
                        review.isPinned
                          ? "bg-yellow-50 border-yellow-300 ring-1 ring-yellow-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {/* Header của review */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-800 flex items-center gap-2">
                            {review.customerName}{" "}
                            {review.isPinned && (
                              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <FaThumbtack className="text-xs" /> Đã ghim
                              </span>
                            )}
                            {isRecent(review.date) && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                                Mới
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={
                                    i < review.rating
                                      ? "fill-current"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400 border-l pl-2 ml-1">
                              {review.date.toLocaleDateString("vi-VN")} -{" "}
                              {review.date.toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Actions Buttons */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleLike(review.id)}
                            className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                              review.liked
                                ? "bg-red-100 text-red-600"
                                : "bg-white border hover:bg-gray-50 text-gray-600"
                            }`}
                          >
                            <FaHeart
                              className={review.liked ? "fill-current" : ""}
                            />
                            {review.likes}
                          </button>
                          <button
                            onClick={() => handlePin(review.id)}
                            title={
                              review.isPinned ? "Bỏ ghim" : "Ghim đánh giá"
                            }
                            className={`p-1.5 rounded transition-colors ${
                              review.isPinned
                                ? "bg-yellow-500 text-white"
                                : "bg-white border hover:bg-gray-50 text-gray-400"
                            }`}
                          >
                            <FaThumbtack />
                          </button>
                          <button
                            onClick={() =>
                              setReviews((prev) =>
                                prev.filter((r) => r.id !== review.id)
                              )
                            }
                            title="Xóa"
                            className="p-1.5 rounded bg-white border hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      {/* Nội dung comment */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Admin Reply Section */}
                      {review.adminReply ? (
                        <div className="mt-3 p-3 bg-teal-50 rounded border border-teal-100 relative">
                          <div className="absolute -top-2 left-4 w-3 h-3 bg-teal-50 border-t border-l border-teal-100 transform rotate-45"></div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-bold text-teal-700 text-xs">
                              Phản hồi từ Cửa hàng
                            </p>
                            <span className="text-[10px] text-teal-500">
                              {review.adminReply.date.toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {review.adminReply.text}
                          </p>
                        </div>
                      ) : (
                        <>
                          {editingReplyId !== review.id && (
                            <button
                              onClick={() => setEditingReplyId(review.id)}
                              className="mt-2 text-teal-600 text-xs font-medium hover:underline flex items-center gap-1"
                            >
                              <FaReply /> Trả lời đánh giá này
                            </button>
                          )}
                        </>
                      )}

                      {/* Form trả lời */}
                      {editingReplyId === review.id && (
                        <div className="mt-3 animate-fade-in-down">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Nhập nội dung trả lời..."
                            className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-teal-500 outline-none"
                            rows={3}
                            autoFocus
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => {
                                setEditingReplyId(null);
                                setReplyText("");
                              }}
                              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs font-medium"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => handleReply(review.id)}
                              className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-medium"
                            >
                              Gửi phản hồi
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
