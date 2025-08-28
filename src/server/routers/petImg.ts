import { z } from "zod";
import { router, publicProcedure } from "../trpc";

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
