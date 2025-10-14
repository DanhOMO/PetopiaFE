import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export type Pet = {
  petId: string; // PK
  name: string; // NOT NULL
  description?: string | null;
  categoryId?: string | null;
  age?: number | null;
  gender: "MALE" | "FEMALE" | "UNKNOWN"; // DEFAULT 'UNKNOWN'
  price: number; // NOT NULL
  discountPrice?: number | null;
  healthStatus?: string | null;
  vaccinationHistory?: string | null;
  stockQuantity?: number | null; // DEFAULT 1
  status: "AVAILABLE" | "SOLD" | "RESERVED" | "DRAFT"; // DEFAULT 'DRAFT'
  videoUrl?: string | null;
  weight?: number | null;
  height?: number | null;
  color?: string | null;
  furType: "SHORT" | "LONG" | "CURLY" | "NONE" | "OTHER"; // DEFAULT 'OTHER'
  createdAt?: string; // DATETIME -> ISO string
  updatedAt?: string; // DATETIME -> ISO string
};

const pets: Pet[] = [
  {
    petId: "P001",
    name: "Milo",
    description: "Chó Poodle thân thiện, thích chơi đùa.",
    categoryId: "C001",
    age: 2,
    gender: "MALE",
    discountPrice: 3200000,
    price: 3500000,
    healthStatus: "Khỏe mạnh",
    vaccinationHistory: "Tiêm phòng đầy đủ",
    stockQuantity: 2,
    status: "AVAILABLE",
    videoUrl: "https://youtube.com/embed/abc123",
    weight: 5.2,
    height: 30,
    color: "Nâu",
    furType: "CURLY",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    petId: "P002",
    name: "Kitty",
    description: "Mèo Anh lông dài, hiền lành.",
    categoryId: "C002",
    age: 1,
    gender: "FEMALE",
    discountPrice: null,
    price: 2500000,
    healthStatus: "Khỏe mạnh",
    vaccinationHistory: "Chưa tiêm phòng",
    stockQuantity: 1,
    status: "RESERVED",
    videoUrl: "",
    weight: 3.5,
    height: 25,
    color: "Trắng xám",
    furType: "LONG",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Dữ liệu sản phẩm bổ sung
  {
    petId: "P003",
    name: "Thức ăn khô cho chó",
    description: "Thức ăn dinh dưỡng dành cho chó mọi lứa tuổi.",
    categoryId: "FOOD",
    age: null,
    gender: "UNKNOWN",
    discountPrice: 299000,
    price: 350000,
    healthStatus: "Mới",
    vaccinationHistory: "",
    stockQuantity: 10,
    status: "AVAILABLE",
    videoUrl: "",
    weight: 1,
    height: null,
    color: "Nâu",
    furType: "NONE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    petId: "P004",
    name: "Đồ chơi cho mèo",
    description: "Đồ chơi giúp mèo vận động và giải trí.",
    categoryId: "TOY",
    age: null,
    gender: "UNKNOWN",
    discountPrice: 89000,
    price: 120000,
    healthStatus: "Mới",
    vaccinationHistory: "",
    stockQuantity: 15,
    status: "AVAILABLE",
    videoUrl: "",
    weight: 0.2,
    height: null,
    color: "Nhiều màu",
    furType: "NONE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    petId: "P005",
    name: "Vòng cổ thú cưng",
    description: "Vòng cổ thời trang cho thú cưng.",
    categoryId: "ACCESSORY",
    age: null,
    gender: "UNKNOWN",
    discountPrice: 159000,
    price: 200000,
    healthStatus: "Mới",
    vaccinationHistory: "",
    stockQuantity: 20,
    status: "AVAILABLE",
    videoUrl: "",
    weight: 0.1,
    height: null,
    color: "Đỏ",
    furType: "NONE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    petId: "P006",
    name: "Lồng vận chuyển",
    description: "Lồng vận chuyển thú cưng tiện lợi.",
    categoryId: "CAGE",
    age: null,
    gender: "UNKNOWN",
    discountPrice: 450000,
    price: 550000,
    healthStatus: "Mới",
    vaccinationHistory: "",
    stockQuantity: 5,
    status: "AVAILABLE",
    videoUrl: "",
    weight: 2,
    height: null,
    color: "Xám",
    furType: "NONE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    petId: "P007",
    name: "Bình sữa cho thú cưng",
    description: "Bình sữa tiện dụng cho thú cưng nhỏ.",
    categoryId: "ACCESSORY",
    age: null,
    gender: "UNKNOWN",
    discountPrice: 75000,
    price: 95000,
    healthStatus: "Mới",
    vaccinationHistory: "",
    stockQuantity: 30,
    status: "AVAILABLE",
    videoUrl: "",
    weight: 0.05,
    height: null,
    color: "Trắng",
    furType: "NONE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    petId: "P008",
    name: "Phụ kiện trang trí",
    description: "Phụ kiện trang trí cho thú cưng và không gian sống.",
    categoryId: "ACCESSORY",
    age: null,
    gender: "UNKNOWN",
    discountPrice: 125000,
    price: 150000,
    healthStatus: "Mới",
    vaccinationHistory: "",
    stockQuantity: 25,
    status: "AVAILABLE",
    videoUrl: "",
    weight: 0.1,
    height: null,
    color: "Nhiều màu",
    furType: "NONE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const petRouter = router({
  getById: publicProcedure
    .input(z.object({ petId: z.string() }))
    .query(({ input }) => {
      const { petId } = input;
      return pets.find((pet) => pet.petId === petId) || null;
    }),

  getAll: publicProcedure.query(() => {
    return pets;
  }),

  create: publicProcedure
    .input(
      z.object({
        petId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        categoryId: z.string().nullable(),
        age: z.number().int().optional(),
        gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]).default("UNKNOWN"),
        discountPrice: z.number(),
        price: z.number().nullable().optional(),
        healthStatus: z.string().optional(),
        vaccinationHistory: z.string().optional(),
        stockQuantity: z.number().int().default(1),
        status: z.enum(["AVAILABLE", "SOLD", "RESERVED", "DRAFT"]).default("DRAFT"),
        videoUrl: z.string().optional(),
        weight: z.number().optional(),
        height: z.number().optional(),
        color: z.string().optional(),
        furType: z.enum(["SHORT", "LONG", "CURLY", "NONE", "OTHER"]).default("OTHER"),
      })
    )
    .mutation(({ input }) => {
      return {
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }),
});