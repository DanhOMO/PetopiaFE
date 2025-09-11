import { z } from "zod";
import { router, publicProcedure } from "../trpc";
export type Pet = {
  pet_id: string; // PK
  name: string; // NOT NULL
  description?: string | null;
  category_id?: string | null;

  age?: number | null;

  gender: "MALE" | "FEMALE" | "UNKNOWN"; // DEFAULT 'UNKNOWN'

  price: number; // NOT NULL
  discount_price?: number | null;

  health_status?: string | null;
  vaccination_history?: string | null;

  stock_quantity?: number | null; // DEFAULT 1

  status: "AVAILABLE" | "SOLD" | "RESERVED" | "DRAFT"; // DEFAULT 'DRAFT'

  video_url?: string | null;

  weight?: number | null;
  height?: number | null;
  color?: string | null;

  fur_type: "SHORT" | "LONG" | "CURLY" | "NONE" | "OTHER"; // DEFAULT 'OTHER'

  created_at?: string; // DATETIME -> ISO string
  updated_at?: string; // DATETIME -> ISO string
};

const pets = [
      {
        pet_id: "P001",
        name: "Milo",
        description: "Chó Poodle thân thiện, thích chơi đùa.",
        category_id: "C001",
        age: 2,
        gender: "MALE",
        discount_price: 3200000,
        price: 3500000,
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
        discount_price: null ,
        price: 2500000,
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
      // Dữ liệu sản phẩm bổ sung
      {
        pet_id: "P003",
        name: "Thức ăn khô cho chó",
        description: "Thức ăn dinh dưỡng dành cho chó mọi lứa tuổi.",
        category_id: "FOOD",
        age: null,
        gender: "UNKNOWN",
        discount_price: 299000,
        price: 350000,
        health_status: "Mới",
        vaccination_history: "",
        stock_quantity: 10,
        status: "AVAILABLE",
        video_url: "",
        weight: 1,
        height: null,
        color: "Nâu",
        fur_type: "NONE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: "/assets/imgs/imgStore/img0522-8245.jpeg",
      },
      {
        pet_id: "P004",
        name: "Đồ chơi cho mèo",
        description: "Đồ chơi giúp mèo vận động và giải trí.",
        category_id: "TOY",
        age: null,
        gender: "UNKNOWN",
        discount_price: 89000,
        price: 120000,
        health_status: "Mới",
        vaccination_history: "",
        stock_quantity: 15,
        status: "AVAILABLE",
        video_url: "",
        weight: 0.2,
        height: null,
        color: "Nhiều màu",
        fur_type: "NONE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: "/assets/imgs/imgStore/img0800-2361.jpeg",
      },
      {
        pet_id: "P005",
        name: "Vòng cổ thú cưng",
        description: "Vòng cổ thời trang cho thú cưng.",
        category_id: "ACCESSORY",
        age: null,
        gender: "UNKNOWN",
        discount_price: 159000,
        price: 200000,
        health_status: "Mới",
        vaccination_history: "",
        stock_quantity: 20,
        status: "AVAILABLE",
        video_url: "",
        weight: 0.1,
        height: null,
        color: "Đỏ",
        fur_type: "NONE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: "/assets/imgs/imgStore/img0848-8557.jpeg",
      },
      {
        pet_id: "P006",
        name: "Lồng vận chuyển",
        description: "Lồng vận chuyển thú cưng tiện lợi.",
        category_id: "CAGE",
        age: null,
        gender: "UNKNOWN",
        discount_price: 450000,
        price: 550000,
        health_status: "Mới",
        vaccination_history: "",
        stock_quantity: 5,
        status: "AVAILABLE",
        video_url: "",
        weight: 2,
        height: null,
        color: "Xám",
        fur_type: "NONE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: "/assets/imgs/imgStore/img0912-4774.jpeg",
      },
      {
        pet_id: "P007",
        name: "Bình sữa cho thú cưng",
        description: "Bình sữa tiện dụng cho thú cưng nhỏ.",
        category_id: "ACCESSORY",
        age: null,
        gender: "UNKNOWN",
        discount_price: 75000,
        price: 95000,
        health_status: "Mới",
        vaccination_history: "",
        stock_quantity: 30,
        status: "AVAILABLE",
        video_url: "",
        weight: 0.05,
        height: null,
        color: "Trắng",
        fur_type: "NONE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: "/assets/imgs/imgStore/img2078-8690.jpeg",
      },
      {
        pet_id: "P008",
        name: "Phụ kiện trang trí",
        description: "Phụ kiện trang trí cho thú cưng và không gian sống.",
        category_id: "ACCESSORY",
        age: null,
        gender: "UNKNOWN",
        discount_price: 125000,
        price: 150000,
        health_status: "Mới",
        vaccination_history: "",
        stock_quantity: 25,
        status: "AVAILABLE",
        video_url: "",
        weight: 0.1,
        height: null,
        color: "Nhiều màu",
        fur_type: "NONE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image_url: "/assets/imgs/imgStore/img2079-7798.jpeg",
      },
    ];

export const petRouter = router({
  getById: publicProcedure
    .input(z.object({ pet_id: z.string() }))
    .query(({ input }) => {
      const { pet_id } = input;
      return pets.find((pet) => pet.pet_id === pet_id) || null;
    }),

  getAll: publicProcedure.query(() => {
    return pets;
  }),

  create: publicProcedure
    .input(z.object({
      pet_id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      category_id: z.string().nullable(),
      age: z.number().int().optional(),
      gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]).default("UNKNOWN"),
      discount_price: z.number(),
      price: z.number().nullable().optional(),
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
