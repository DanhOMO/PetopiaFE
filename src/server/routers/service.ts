import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const serviceRouter = router({
  getAll: publicProcedure.query(() => {
    return [
      {
        id: "1",
        name: "Spa thú cưng",
        description: "Dịch vụ tắm, cắt tỉa lông, vệ sinh cho thú cưng.",
        price: 200000,
      },
      {
        id: "2",
        name: "Khám bệnh",
        description: "Khám tổng quát, tư vấn sức khỏe cho thú cưng.",
        price: 150000,
      },
      {
        id: "3",
        name: "Khách sạn thú cưng",
        description: "Lưu trú, chăm sóc thú cưng khi chủ vắng nhà.",
        price: 300000,
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
