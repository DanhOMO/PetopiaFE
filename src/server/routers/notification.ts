import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export type Notification = {
  notification_id: string;
  user_id: string;
  title: string;
  content: string;
  typeNote: "ORDER_UPDATE" | "NEW_PET" | "VACCINATION_REMINDER" | "PROMOTION";
  is_read: boolean;
  created_at: string;
};

// Fake data demo, thay bằng truy vấn DB thực tế
const notifications: Notification[] = [
  {
    notification_id: "N001",
    user_id: "U001",
    title: "Đơn hàng đã được xác nhận",
    content: "Đơn hàng #1234 của bạn đã được xác nhận.",
    typeNote: "ORDER_UPDATE",
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    notification_id: "N002",
    user_id: "U002",
    title: "Có thú cưng mới!",
    content: "Chúng tôi vừa thêm một bé mèo mới siêu dễ thương.",
    typeNote: "NEW_PET",
    is_read: false,
    created_at: new Date().toISOString(),
  },
];

export const notificationRouter = router({
  getAll: publicProcedure.query(() => {
    // Thay bằng truy vấn DB thực tế
    return notifications;
  }),
});
