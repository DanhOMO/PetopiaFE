// data/fakeData.js
// --- FILE TỔNG HỢP CHO TẤT CẢ CÁC COMPONENT ---

// ===================================================================
// 1. Categories (5 loại)
// ===================================================================
export const categories = [
  { category_id: "C1", name: "Chó" },
  { category_id: "C2", name: "Mèo" },
  { category_id: "C3", name: "Chim" },
  { category_id: "C4", name: "Cá" },
  { category_id: "C5", name: "Hamster" },
];

// ===================================================================
// 2. Users (8 người dùng)
// ===================================================================
const generateFakeUsers = (id) => {
  const fName = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh"][id % 6];
  const lName = ["Văn A", "Thị B", "Hữu C", "Minh D", "Kim E", "Tuấn F"][
    id % 6
  ];
  const fullName = `${fName} ${lName}`;
  return {
    user_id: `U${id}`,
    userId: `U${id}`, // Thêm alias để tương thích
    username: `user${id}`,
    email: `user${id}@petshop.example.com`,
    full_name: fullName,
    name: fullName, // Thêm alias để tương thích
    role: "CUSTOMER",
  };
};

// Xuất danh sách 8 user
export const fakeUsers = Array.from({ length: 8 }, (_, i) =>
  generateFakeUsers(i + 1)
);

// ===================================================================
// 3. Pets (45 thú cưng chi tiết, có ownerId)
// (Dùng cho trang Quản lý Thú Cưng & Tiêm phòng)
// ===================================================================
const petNames = [
  "Buddy",
  "Luna",
  "Max",
  "Bella",
  "Charlie",
  "Lucy",
  "Milo",
  "Daisy",
];
const colors = ["Đen", "Trắng", "Vàng", "Xám", "Tam thể", "Nâu"];
const health = ["Rất tốt", "Tốt", "Cần theo dõi"];
const fur = ["SHORT", "LONG", "CURLY", "NONE"];
const genders = ["MALE", "FEMALE", "UNKNOWN"];
const petStatuses = ["AVAILABLE", "SOLD", "DRAFT"]; // Đổi tên tránh trùng lặp
const breeds = [
  "Golden Retriever",
  "Persian Cat",
  "Poodle",
  "Siamese Cat",
  "Bulldog",
];

// Helper tạo ảnh
const generateFakeImages = (petId) => {
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 ảnh
  return Array.from({ length: count }, (_, i) => ({
    image_id: `IMG${petId}_${i}`,
    pet_id: `P${petId}`,
    image_url: `https://loremflickr.com/320/240/pet,${
      petId % 2 === 0 ? "dog" : "cat"
    }?random=${petId * i}`,
    is_thumbnail: i === 0, // Ảnh đầu tiên là thumbnail
  }));
};

// Helper tạo thú cưng (GỘP)
const generateFakePet = (id) => {
  const basePrice = Math.floor(Math.random() * 1000 + 100) * 10000;
  const hasDiscount = id % 3 === 0;
  const category = categories[id % categories.length];
  const pet_id = `P${id}`;

  return {
    // ---- Dữ liệu chi tiết ----
    pet_id: pet_id,
    name: petNames[id % petNames.length] + ` #${id}`,
    description: `Mô tả chi tiết cho thú cưng ${id}. Rất thân thiện.`,
    category_id: category.category_id,
    category_name: category.name,
    age: Math.floor(Math.random() * 10) + 1, // Tuổi từ 1-10
    gender: genders[id % genders.length],
    price: basePrice,
    discount_price: hasDiscount ? basePrice * 0.8 : null,
    health_status: health[id % health.length],
    vaccination_history: "Đã tiêm phòng đầy đủ.",
    stock_quantity: Math.floor(Math.random() * 20),
    status: petStatuses[id % petStatuses.length],
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    weight: (Math.random() * 10 + 1).toFixed(1),
    height: (Math.random() * 30 + 20).toFixed(1),
    color: colors[id % colors.length],
    fur_type: fur[id % fur.length],
    created_at: new Date().toISOString(),
    images: generateFakeImages(id), // Dùng hàm tạo nhiều ảnh chi tiết
    // ---- Dữ liệu tương thích ----
    id: pet_id, // Thêm alias
    breed: breeds[id % breeds.length],
    category: category.name, // Thêm alias
    ownerId: fakeUsers[id % fakeUsers.length].userId, // **Trường quan trọng đã gộp**
  };
};

// Xuất danh sách 45 thú cưng
export const allPets = Array.from({ length: 45 }, (_, i) =>
  generateFakePet(i + 1)
);

// ===================================================================
// 4. Vaccination Schedules (dựa trên 45 thú cưng)
// (Dùng cho trang Quản lý Tiêm phòng)
// ===================================================================
const vaccineTypes = ["Dại (Rabies)", "5-trong-1", "Parvovirus", "Bordetella"];
// Trạng thái: Đã lên lịch, Chờ (chờ xác nhận), Hoàn thành
const scheduleStatuses = ["SCHEDULED", "PENDING", "COMPLETED"];

const generateFakeSchedules = () => {
  let allSchedules = [];
  // **Quan trọng**: Dùng `allPets` (45 thú cưng) đã gộp ở trên
  allPets.forEach((pet) => {
    const numSchedules = Math.floor(Math.random() * 4); // 0-3 lịch tiêm mỗi con
    for (let i = 0; i < numSchedules; i++) {
      const status = scheduleStatuses[i % scheduleStatuses.length];
      let date = new Date();
      if (status === "COMPLETED") {
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      } else if (status === "SCHEDULED") {
        const daysFuture =
          i === 0
            ? Math.floor(Math.random() * 3) + 1
            : Math.floor(Math.random() * 30) + 5;
        date.setDate(date.getDate() + daysFuture);
      } else {
        date.setDate(date.getDate() + Math.floor(Math.random() * 15) + 5);
      }

      allSchedules.push({
        schedule_id: `S${pet.id}-${i}`,
        pet_id: pet.id,
        vaccineName: vaccineTypes[i % vaccineTypes.length],
        date: date.toISOString(), // Lưu trữ dạng ISO
        time: `${Math.floor(Math.random() * 9) + 8}:30`, // 8:30 -> 16:30
        status: status,
        notes: `Ghi chú cho mũi tiêm ${vaccineTypes[i % vaccineTypes.length]}.`,
        instructions: "Kiêng tắm 3 ngày sau khi tiêm. Theo dõi phản ứng phụ.",
      });
    }
  });
  return allSchedules;
};

// Xuất dữ liệu lịch tiêm
export const allVaccinationSchedules = generateFakeSchedules();

// ===================================================================
// 5. Dữ liệu cho trang ĐÁNH GIÁ (Review Management)
// ===================================================================

// Dữ liệu Thú cưng (cho trang Review)
export const fakePets = [
  {
    id: "P1",
    name: "Luna #1",
    type: "Persian Cat • Bird",
    avgRating: 4.9,
    imageUrl: "https://loremflickr.com/320/320/persian,cat?random=1",
  },
  {
    id: "P2",
    name: "Charlie #2",
    type: "Poodle • Bird",
    avgRating: 4.3,
    imageUrl: "https://loremflickr.com/320/320/poodle,dog?random=2",
  },
  {
    id: "P3",
    name: "Bella #3",
    type: "Siamese Cat • Rabbit",
    avgRating: 4.3,
    imageUrl: "https://loremflickr.com/320/320/siamese,cat?random=3",
  },
  {
    id: "P4",
    name: "Cooper #4",
    type: "Bulldog • Hamster",
    avgRating: 4.6,
    imageUrl: "https://loremflickr.com/320/320/bulldog?random=4",
  },
  {
    id: "P5",
    name: "Lucy #5",
    type: "Maine Coon • Fish",
    avgRating: 4.0,
    imageUrl: "https://loremflickr.com/320/320/maine,coon?random=5",
  },
  {
    id: "P6",
    name: "Max #6",
    type: "Golden Retriever • Dog",
    avgRating: 4.8,
    imageUrl: "https://loremflickr.com/320/320/golden,retriever?random=6",
  },
];

// Dữ liệu Đánh giá
export const fakeReviews = [
  // --- Đánh giá cho Luna #1 ---
  {
    id: "R101",
    petId: "P1",
    userName: "Nguyễn An",
    userInitial: "N",
    avatarBg: "bg-green-500",
    rating: 5,
    date: "8/11/2025",
    comment: "Thú cưng rất đáng yêu và khỏe mạnh!",
    likes: 46,
  },
  {
    id: "R102",
    petId: "P1",
    userName: "Trần Bình",
    userInitial: "T",
    avatarBg: "bg-teal-500",
    rating: 4,
    date: "16/11/2025",
    comment: "Dịch vụ tuyệt vời, nhân viên nhiệt tình.",
    likes: 45,
  },
  // --- Đánh giá cho Charlie #2 ---
  {
    id: "R201",
    petId: "P2",
    userName: "Lê Thị C",
    userInitial: "L",
    avatarBg: "bg-pink-500",
    rating: 4,
    date: "10/11/2025",
    comment: "Bé Poodle rất thông minh, cảm ơn shop.",
    likes: 22,
  },
  // --- Đánh giá cho Bella #3 ---
  {
    id: "R301",
    petId: "P3",
    userName: "Phạm Văn D",
    userInitial: "P",
    avatarBg: "bg-indigo-500",
    rating: 5,
    date: "11/11/2025",
    comment: "Rất hài lòng!",
    likes: 12,
  },
  // --- Đánh giá cho Cooper #4 (Chưa trả lời) ---
  {
    id: "R401",
    petId: "P4",
    userName: "Võ E",
    userInitial: "V",
    avatarBg: "bg-orange-500",
    rating: 3,
    date: "12/11/2025",
    comment: "Thú cưng lúc giao hơi mệt, cần xem lại khâu vận chuyển.",
    likes: 5,
  },
  {
    id: "R402", // Thêm 1 review chưa trả lời cho Cooper
    petId: "P4",
    userName: "Hồ G",
    userInitial: "H",
    avatarBg: "bg-cyan-500",
    rating: 5,
    date: "13/11/2025",
    comment: "Rất ưng ý, sẽ quay lại.",
    likes: 2,
  },
];

// Dữ liệu Phản hồi của Admin
export const fakeReplies = [
  {
    id: "A1",
    reviewId: "R101", // Trả lời cho Nguyễn An
    text: "Cảm ơn bạn an đã tin tưởng dịch vụ của chúng tôi!",
    date: "9/11/2025",
  },
  {
    id: "A2",
    reviewId: "R201", // Trả lời cho Lê Thị C
    text: "Petopia rất vui khi bạn hài lòng ạ!",
    date: "11/11/2025",
  },
  {
    id: "A3",
    reviewId: "R301", // Trả lời cho Phạm Văn D
    text: "Cảm ơn bạn!",
    date: "12/11/2025",
  },
];
