// src/server/routers/review.ts
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export type Review = {
  reviewId: string; // PK
  rating: number; // NOT NULL (1-5)
  comment: string; // NOT NULL
  imageUrl?: string | null;
  createdAt: string; // DATETIME -> ISO string
  updatedAt: string; // DATETIME -> ISO string
  userId: string; // FK -> User
  petId: string; // FK -> Pet
};

// Dữ liệu mẫu, bạn sẽ thay bằng logic truy vấn CSDL
const mockReviews: Review[] = [
  {
    reviewId: "R001",
    rating: 5,
    comment: "Bé Poodle rất khỏe mạnh và đáng yêu. Dịch vụ của shop tuyệt vời!",
    imageUrl: "/assets/imgs/reviews/review1.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "U001", // Giả sử là ID của người dùng đã đăng nhập
    petId: "P001", // ID của bé Milo
  },
  {
    reviewId: "R002",
    rating: 4,
    comment: "Giao hàng nhanh, bé cún rất lanh lợi. Sẽ ủng hộ shop lần nữa.",
    imageUrl: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "U002",
    petId: "P001",
  },
  {
    reviewId: "R003",
    rating: 5,
    comment: "Thức ăn chất lượng tốt, cún nhà mình rất thích.",
    imageUrl: "/assets/imgs/reviews/review3.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "U003",
    petId: "P003", // ID của sản phẩm Thức ăn khô
  },
];

export const reviewRouter = router({
  /**
   * Lấy tất cả các review (dùng cho trang quản trị hoặc tổng hợp)
   */
  getAll: publicProcedure.query(() => {
    return mockReviews;
  }),

  /**
   * Lấy tất cả review cho một thú cưng/sản phẩm cụ thể
   */
  getByPet: publicProcedure
    .input(
      z.object({
        petId: z.string(),
      })
    )
    .query(({ input }) => {
      return mockReviews.filter((review) => review.petId === input.petId);
    }),

  /**
   * Tạo một review mới
   */
  create: publicProcedure
    .input(
      z.object({
        petId: z.string(),
        userId: z.string(), // Trong thực tế, bạn sẽ lấy ID này từ session của người dùng
        rating: z.number().min(1).max(5),
        comment: z.string().min(1, "Bình luận không được để trống"),
        imageUrl: z.string().url().optional(),
      })
    )
    .mutation(({ input }) => {
      const now = new Date().toISOString();
      const newReview: Review = {
        reviewId: `R${Date.now()}`, // Tạo ID tạm thời
        ...input,
        createdAt: now,
        updatedAt: now,
      };

      // Logic để lưu `newReview` vào cơ sở dữ liệu của bạn sẽ ở đây
      // mockReviews.push(newReview);

      return newReview;
    }),
});