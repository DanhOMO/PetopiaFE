// src/server/routers/wishlist.ts
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export type Wishlist = {
  wishlistId: string; // PK
  addedAt: string;    // DATETIME -> ISO string
  userId: string;     // FK -> User
  petId: string;      // FK -> Pet
};

// Dữ liệu mẫu - Thay bằng logic truy vấn CSDL của bạn
const mockWishlistData: Wishlist[] = [
  {
    wishlistId: "WISH001",
    addedAt: new Date().toISOString(),
    userId: "U001", // User "John Doe" (hoặc "Danh" theo mock data của bạn)
    petId: "P002",   // Yêu thích bé mèo "Kitty"
  },
  {
    wishlistId: "WISH002",
    addedAt: new Date().toISOString(),
    userId: "U001",
    petId: "P004",   // Yêu thích "Đồ chơi cho mèo"
  },
  {
    wishlistId: "WISH003",
    addedAt: new Date().toISOString(),
    userId: "U002", // User "Admin"
    petId: "P001",   // Yêu thích bé chó "Milo"
  },
];

export const wishlistRouter = router({
  /**
   * Lấy danh sách yêu thích của người dùng hiện tại
   */
  getByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
      const userWishlist = mockWishlistData.filter(
        (item) => item.userId === input.userId
      );
      return userWishlist;
    }),

  /**
   * Thêm một thú cưng/sản phẩm vào danh sách yêu thích
   */
  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        petId: z.string(),
      })
    )
    .mutation(({ input }) => {
      // Kiểm tra xem item đã tồn tại trong wishlist chưa
      const alreadyExists = mockWishlistData.some(
        (item) => item.userId === input.userId && item.petId === input.petId
      );

      if (alreadyExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Sản phẩm này đã có trong danh sách yêu thích của bạn.",
        });
      }

      // Tạo item mới
      const newWishlistItem: Wishlist = {
        wishlistId: `WISH-${Date.now()}`, // Tạo ID tạm thời
        addedAt: new Date().toISOString(),
        userId: input.userId,
        petId: input.petId,
      };

      // Giả lập lưu vào "database"
      mockWishlistData.push(newWishlistItem);
      console.log("Added to wishlist:", newWishlistItem);
      
      return newWishlistItem;
    }),

  /**
   * Xóa một item khỏi danh sách yêu thích
   */
  remove: publicProcedure
    .input(
      z.object({
        // Có thể xóa bằng wishlistId hoặc cặp userId/petId
        wishlistId: z.string(),
      })
    )
    .mutation(({ input }) => {
      const initialLength = mockWishlistData.length;
      
      // Tìm và xóa item
      const indexToRemove = mockWishlistData.findIndex(item => item.wishlistId === input.wishlistId);

      if (indexToRemove === -1) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Không tìm thấy mục yêu thích để xóa.',
        });
      }
      
      mockWishlistData.splice(indexToRemove, 1);
      
      return { success: true, removedId: input.wishlistId };
    }),
});