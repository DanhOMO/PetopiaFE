import { z } from "zod";
import { router, publicProcedure } from "../trpc";
export type PetImg = {
  image_id: string; // PK
  pet_id: string; // FK -> Pet
  image_url: string; // NOT NULL
  is_thumbnail: boolean; // DEFAULT false
  created_at: string; // DATETIME -> ISO string
};

export const petImgRouter = router({
  getAll: publicProcedure.query(() => {
    return [
      {
        image_id: "IMG001",
        pet_id: "P001",
        image_url: "/assets/imgs/imgPet/dog-1839808_1280.jpg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
      {
        image_id: "IMG002",
        pet_id: "P001",
        image_url: "/assets/imgs/imgPet/dog-4988985_1280.jpg",
        is_thumbnail: false,
        created_at: new Date().toISOString(),
      },
      {
        image_id: "IMG003",
        pet_id: "P002",
        image_url: "/assets/imgs/imgPet/cat-5183427_1280.jpg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
      // Ảnh cho các sản phẩm bổ sung
      {
        image_id: "IMG004",
        pet_id: "P003",
        image_url: "/assets/imgs/imgStore/img0522-8245.jpeg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
      {
        image_id: "IMG005",
        pet_id: "P004",
        image_url: "/assets/imgs/imgStore/img0800-2361.jpeg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
      {
        image_id: "IMG006",
        pet_id: "P005",
        image_url: "/assets/imgs/imgStore/img0848-8557.jpeg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
      {
        image_id: "IMG007",
        pet_id: "P006",
        image_url: "/assets/imgs/imgStore/img0912-4774.jpeg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
      {
        image_id: "IMG008",
        pet_id: "P007",
        image_url: "/assets/imgs/imgStore/img2078-8690.jpeg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
      {
        image_id: "IMG009",
        pet_id: "P008",
        image_url: "/assets/imgs/imgStore/img2079-7798.jpeg",
        is_thumbnail: true,
        created_at: new Date().toISOString(),
      },
    ];
  }),

  create: publicProcedure
    .input(z.object({
      image_id: z.string(),
      pet_id: z.string(),
      image_url: z.string(),
      is_thumbnail: z.boolean().optional().default(false),
    }))
    .mutation(({ input }) => {
      return {
        ...input,
        created_at: new Date().toISOString(),
      };
    }),
});
