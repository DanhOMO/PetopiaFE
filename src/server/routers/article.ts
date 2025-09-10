import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const articleRouter = router({
  
  getAll: publicProcedure.query(() => {
    return [
      {
        article_id: "A001",
        title: "Cách chăm sóc thú cưng mùa hè",
        content: "Mùa hè nóng bức, bạn nên chú ý đến việc cấp nước và làm mát cho thú cưng...",
        author_id: "U001",
        image_url: "/assets/imgs/imgArticle/article1.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        article_id: "A002",
        title: "Những bệnh thường gặp ở chó mèo",
        content: "Chó mèo có thể mắc các bệnh như viêm da, tiêu hóa, hô hấp...",
        author_id: "U002",
        image_url: "/assets/imgs/imgArticle/article2.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }),

  create: publicProcedure
    .input(z.object({
      article_id: z.string(),
      title: z.string(),
      content: z.string(),
      author_id: z.string().nullable(),
      image_url: z.string().optional(),
    }))
    .mutation(({ input }) => {
      return {
        ...input,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }),
});
