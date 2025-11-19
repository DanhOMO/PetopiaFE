"use client";
import React, { useState } from "react";
import {
  FaStar,
  FaHeart,
  FaThumbtack,
  FaEdit,
  FaTrash,
  FaReply,
} from "react-icons/fa";
import { HiX } from "react-icons/hi";

// Dữ liệu giả
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
    reviews.push({
      id: `R${petId}-${i}`,
      petId,
      customerName: names[i % names.length],
      rating: Math.floor(Math.random() * 2) + 4,
      comment: comments[i % comments.length],
      date: new Date(Date.now() - Math.random() * 30 * 86400000),
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
const allReviews = allPets.flatMap((p) =>
  p.reviews.map((r) => ({ ...r, petName: p.name }))
);

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState(allReviews);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredPets = allPets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) &&
      pet.reviews.length > 0
  );

  const getPetReviews = (petId) => reviews.filter((r) => r.petId === petId);

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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Quản Lý Đánh Giá
        </h1>

        <input
          placeholder="Tìm tên thú cưng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 border rounded mb-4"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPets.map((pet) => {
            const petReviews = getPetReviews(pet.id);
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
                className="bg-white rounded-lg border p-4 cursor-pointer hover:border-yellow-400"
              >
                <img
                  src={pet.images[0]}
                  alt={pet.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-sm">{pet.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  <FaStar className="fill-current" /> {avg} ({petReviews.length}
                  )
                </div>
              </div>
            );
          })}
        </div>

        {/* Review Modal */}
        {showModal && selectedPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Đánh giá - {selectedPet.name}
                </h3>
                <button onClick={() => setShowModal(false)}>
                  <HiX className="text-xl" />
                </button>
              </div>
              <div className="space-y-4">
                {getPetReviews(selectedPet.id).map((review) => (
                  <div
                    key={review.id}
                    className={`p-4 rounded-lg border ${
                      review.isPinned
                        ? "bg-yellow-50 border-yellow-300"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold flex items-center gap-2">
                          {review.customerName}{" "}
                          {review.isPinned && (
                            <FaThumbtack className="text-yellow-600 text-sm" />
                          )}
                        </p>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
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
                          <span className="text-xs text-gray-500 ml-1">
                            {review.date.toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleLike(review.id)}
                          className={`p-1.5 rounded ${
                            review.liked
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-200"
                          }`}
                        >
                          <FaHeart
                            className={review.liked ? "fill-current" : ""}
                          />{" "}
                          {review.likes}
                        </button>
                        <button
                          onClick={() => handlePin(review.id)}
                          className={`p-1.5 rounded ${
                            review.isPinned
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-200"
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
                          className="p-1.5 rounded bg-red-100 text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                    {review.adminReply && (
                      <div className="mt-3 p-3 bg-teal-50 rounded border-l-4 border-teal-500">
                        <p className="font-medium text-teal-700">Admin:</p>
                        <p className="text-sm">{review.adminReply.text}</p>
                      </div>
                    )}
                    {!review.adminReply && editingReplyId !== review.id && (
                      <button
                        onClick={() => setEditingReplyId(review.id)}
                        className="mt-2 text-teal-600 text-sm flex items-center gap-1"
                      >
                        <FaReply /> Trả lời
                      </button>
                    )}
                    {editingReplyId === review.id && (
                      <div className="mt-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full p-2 border rounded"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleReply(review.id)}
                            className="px-3 py-1 bg-teal-600 text-white rounded text-sm"
                          >
                            Gửi
                          </button>
                          <button
                            onClick={() => {
                              setEditingReplyId(null);
                              setReplyText("");
                            }}
                            className="px-3 py-1 bg-gray-300 rounded text-sm"
                          >
                            Hủy
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
