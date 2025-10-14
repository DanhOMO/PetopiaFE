import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export type Notification = {
  notificationId: string;
  userId: string;
  title: string;
  content: string;
  typeNote: "ORDER_UPDATE" | "NEW_PET" | "VACCINATION_REMINDER" | "PROMOTION";
  isRead: boolean;
  createdAt: string;
};

// Dữ liệu mẫu, bạn có thể thay bằng truy vấn từ cơ sở dữ liệu
const notifications: Notification[] = [
  {
    notificationId: "N001",
    userId: "U001",
    title: "Đơn hàng đã được xác nhận",
    content: "Đơn hàng #1234 của bạn đã được xác nhận.",
    typeNote: "ORDER_UPDATE",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    notificationId: "N002",
    userId: "U002",
    title: "Có thú cưng mới!",
    content: "Chúng tôi vừa thêm một bé mèo mới siêu dễ thương.",
    typeNote: "NEW_PET",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
];

export const notificationRouter = router({
  getAll: publicProcedure.query(() => {
    // Thay bằng logic truy vấn CSDL của bạn ở đây
    return notifications;
  }),
});