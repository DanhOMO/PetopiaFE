import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const serviceRouter = router({
  getAll: publicProcedure.query(() => {
    return [
      {
        serviceId: "S001",
        name: "Spa thú cưng",
        description: "Dịch vụ tắm, cắt tỉa lông, vệ sinh cho thú cưng.",
        price: 200000,
        img_url: "/assets/imgs/imgService/service1.jpg", // Gán ảnh spa
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        serviceId: "S002",
        name: "Khám bệnh tổng quát",
        description: "Khám tổng quát, tư vấn sức khỏe cho thú cưng.",
        price: 150000,
        img_url: "/assets/imgs/imgService/service2.jpg", // Gán ảnh khám bệnh
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        serviceId: "S003",
        name: "Khách sạn thú cưng",
        description: "Lưu trú, chăm sóc thú cưng khi chủ vắng nhà.",
        price: 300000,
        img_url: "/assets/imgs/imgService/service4.jpeg", // Gán ảnh khách sạn thú cưng
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        serviceId: "S004",
        name: "Cắt móng & vệ sinh tai",
        description: "Dịch vụ cắt móng, vệ sinh tai an toàn cho thú cưng.",
        price: 80000,
        img_url: "/assets/imgs/imgService/service3.png", // Gán ảnh cắt móng, vệ sinh tai
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        serviceId: "S005",
        name: "Nhuộm màu lông",
        description: "Dịch vụ nhuộm màu lông cho thú cưng.",
        price: 500000,
        img_url: "/assets/imgs/imgService/service.jpeg", // Gán ảnh huấn luyện
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
    }))
    .mutation(({ input }) => {
      return { id: Date.now().toString(), ...input };
    }),
});
