import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const petRouter = router({
  getAll: publicProcedure.query(() => {
    return [
      {
        pet_id: "P001",
        name: "Milo",
        description: "Chó Poodle thân thiện, thích chơi đùa.",
        category_id: "C001",
        age: 2,
        gender: "MALE",
        price: 3500000,
        discount_price: 3200000,
        health_status: "Khỏe mạnh",
        vaccination_history: "Tiêm phòng đầy đủ",
        stock_quantity: 2,
        status: "AVAILABLE",
        video_url: "https://youtube.com/embed/abc123",
        weight: 5.2,
        height: 30,
        color: "Nâu",
        fur_type: "CURLY",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        pet_id: "P002",
        name: "Kitty",
        description: "Mèo Anh lông dài, hiền lành.",
        category_id: "C002",
        age: 1,
        gender: "FEMALE",
        price: 2500000,
        discount_price: null,
        health_status: "Khỏe mạnh",
        vaccination_history: "Chưa tiêm phòng",
        stock_quantity: 1,
        status: "RESERVED",
        video_url: "",
        weight: 3.5,
        height: 25,
        color: "Trắng xám",
        fur_type: "LONG",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }),

  create: publicProcedure
    .input(z.object({
      pet_id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      category_id: z.string().nullable(),
      age: z.number().int().optional(),
      gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]).default("UNKNOWN"),
      price: z.number(),
      discount_price: z.number().nullable().optional(),
      health_status: z.string().optional(),
      vaccination_history: z.string().optional(),
      stock_quantity: z.number().int().default(1),
      status: z.enum(["AVAILABLE", "SOLD", "RESERVED", "DRAFT"]).default("DRAFT"),
      video_url: z.string().optional(),
      weight: z.number().optional(),
      height: z.number().optional(),
      color: z.string().optional(),
      fur_type: z.enum(["SHORT", "LONG", "CURLY", "NONE", "OTHER"]).default("OTHER"),
    }))
    .mutation(({ input }) => {
      return {
        ...input,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }),
});
