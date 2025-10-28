import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { get } from "http";

export type Article = {
  articleId: string; // PK
  title: string; // NOT NULL
  content: string; // NOT NULL
  authorId?: string | null; // FK -> User
  imageUrl?: string; // URL hình ảnh bài viết
  createdAt: string; // DATETIME -> ISO string
  updatedAt: string; // DATETIME -> ISO string
};

const articles: Article[] = [
  {
    articleId: "A001",
    title: "Cách chăm sóc thú cưng mùa hè",
    content: "Mùa hè nóng bức, bạn nên chú ý đến việc cấp nước và làm mát cho thú cưng...",
    authorId: "U001",
    imageUrl: "/assets/imgs/imgArticle/article1.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    articleId: "A002",
    title: "Những bệnh thường gặp ở chó mèo",
    content: "Chó mèo có thể mắc các bệnh như viêm da, tiêu hóa, hô hấp...",
    authorId: "U002",
    imageUrl: "/assets/imgs/imgArticle/article2.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const articleRouter = router({
  getAll: publicProcedure.query(() => {
    return articles;
  }),

  create: publicProcedure
    .input(
      z.object({
        articleId: z.string(),
        title: z.string(),
        content: z.string(),
        authorId: z.string().nullable(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const newArticle: Article = {
        ...input,
        authorId: input.authorId ?? null, // Đảm bảo đúng type
        imageUrl: input.imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      // Logic thêm newArticle vào mảng `articles` sẽ ở đây
      // articles.push(newArticle); 
      return newArticle;
    }),

  getById: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .query(({ input }) => {
      const { articleId } = input;
      return articles.find((article) => article.articleId === articleId) || null;
    }),
});