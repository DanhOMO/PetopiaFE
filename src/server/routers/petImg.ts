import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export type PetImg = {
  imageId: string; // PK
  petId: string; // FK -> Pet
  imageUrl: string; // NOT NULL
  isThumbnail: boolean; // DEFAULT false
  createdAt: string; // DATETIME -> ISO string
};

const mockImages: PetImg[] = [
    {
      imageId: "IMG001",
      petId: "P001",
      imageUrl: "/assets/imgs/imgPet/dog-1839808_1280.jpg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
    {
      imageId: "IMG002",
      petId: "P001",
      imageUrl: "/assets/imgs/imgPet/dog-4988985_1280.jpg",
      isThumbnail: false,
      createdAt: new Date().toISOString(),
    },
    {
      imageId: "IMG003",
      petId: "P002",
      imageUrl: "/assets/imgs/imgPet/cat-5183427_1280.jpg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
    // Ảnh cho các sản phẩm bổ sung
    {
      imageId: "IMG004",
      petId: "P003",
      imageUrl: "/assets/imgs/imgStore/img0522-8245.jpeg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
    {
      imageId: "IMG005",
      petId: "P004",
      imageUrl: "/assets/imgs/imgStore/img0800-2361.jpeg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
    {
      imageId: "IMG006",
      petId: "P005",
      imageUrl: "/assets/imgs/imgStore/img0848-8557.jpeg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
    {
      imageId: "IMG007",
      petId: "P006",
      imageUrl: "/assets/imgs/imgStore/img0912-4774.jpeg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
    {
      imageId: "IMG008",
      petId: "P007",
      imageUrl: "/assets/imgs/imgStore/img2078-8690.jpeg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
    {
      imageId: "IMG009",
      petId: "P008",
      imageUrl: "/assets/imgs/imgStore/img2079-7798.jpeg",
      isThumbnail: true,
      createdAt: new Date().toISOString(),
    },
];

export const petImgRouter = router({
  getAll: publicProcedure.query(() => {
    return mockImages;
  }),

  create: publicProcedure
    .input(
      z.object({
        imageId: z.string(),
        petId: z.string(),
        imageUrl: z.string(),
        isThumbnail: z.boolean().optional().default(false),
      })
    )
    .mutation(({ input }) => {
      const newImage: PetImg = {
        ...input,
        createdAt: new Date().toISOString(),
      };
      return newImage;
    }),
});