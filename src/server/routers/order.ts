// src/server/routers/order.ts
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { get } from "http";
// ... (các import khác)

// --- Enums for Order Status ---
export const OrderStatus = z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]);
export const PaymentStatus = z.enum(["UNPAID", "PAID", "FAILED", "REFUNDED"]);

// --- Type mới, đồng bộ với SQL ---
export type Order = {
  orderId: string;
  userId: string | null;
  addressId: string | null; // <-- THAY ĐỔI
  totalAmount: number;
  status: z.infer<typeof OrderStatus>;
  paymentStatus: z.infer<typeof PaymentStatus>;
  desiredDeliveryDate?: string | null;
  note?: string | null;
  phoneNumber: string;
  shippingFee: number;
  discountAmount: number;
  createdAt: string;
  updatedAt: string;
};

const mockOrders: Order[] = [
    {
        orderId: "ORD-1001",
        userId: "U001",
        addressId: "ADDR-001", // <-- THAY ĐỔI
        totalAmount: 500000,
        status: "PENDING",
        paymentStatus: "UNPAID",
        phoneNumber: "0123456789",
        shippingFee: 30000,
        discountAmount: 20000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        orderId: "ORD-1002",
        userId: "U002",
        addressId: "ADDR-002", // <-- THAY ĐỔI
        totalAmount: 750000,
        status: "SHIPPED",
        paymentStatus: "PAID",
        phoneNumber: "0987654321",
        shippingFee: 30000,
        discountAmount: 50000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },];
// --- Router Definition ---
export const orderRouter = router({
  // getByUser và getById giữ nguyên logic
    getByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input }) => {
        // Lọc đơn hàng theo userId
        return mockOrders.filter(order => order.userId === input.userId);
    }),
    getById: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(({ input }) => {
        return mockOrders.find(order => order.orderId === input.orderId) || null;
    }),

  /** Tạo đơn hàng mới (đã cập nhật) */
  create: publicProcedure
    .input(z.object({
      userId: z.string(),
      addressId: z.string(), // <-- THAY ĐỔI: Nhận addressId thay vì chuỗi địa chỉ
      phoneNumber: z.string(),
      note: z.string().optional(),
      items: z.array(z.object({
        petId: z.string(),
        quantity: z.number().min(1),
        priceAtTimeOfOrder: z.number(),
      })),
      shippingFee: z.number(),
      discountAmount: z.number(),
    }))
    .mutation(({ input }) => {
      const subTotal = input.items.reduce((sum, item) => sum + (item.priceAtTimeOfOrder * item.quantity), 0);
      const totalAmount = subTotal + input.shippingFee - input.discountAmount;

      const newOrderData = {
        orderId: `ORD-${Date.now()}`,
        userId: input.userId,
        addressId: input.addressId, // <-- THAY ĐỔI
        totalAmount: totalAmount,
        status: 'PENDING' as const, // Gán giá trị cụ thể từ enum
        paymentStatus: 'UNPAID' as const,
        phoneNumber: input.phoneNumber,
        note: input.note,
        shippingFee: input.shippingFee,
        discountAmount: input.discountAmount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Giả lập lưu đơn hàng vào DB
      // mockOrders.push(newOrderData);
      
      console.log("Creating new order:", newOrderData);
      return newOrderData;
    }),
});