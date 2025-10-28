import { z } from "zod";
import { router, publicProcedure } from "../trpc";

/**
 * Simple mock router for ArticleComment (similar style to your article router).
 * - getAll: trả về danh sách bình luận mẫu
 * - getByArticle: trả về bình luận theo articleId
 * - create: tạo bình luận mới (mock, không lưu DB)
 *
 * Bạn có thể thay đổi để gọi DB (prisma/knex/...) trong production.
 */
export type ArticleComment = {
  commentId: string; // PK
  content: string; // NOT NULL
  createdAt: string; // DATETIME -> ISO string
  updatedAt: string; // DATETIME -> ISO string
  articleId: string; // FK -> Article
  userId?: string | null; // FK -> User
};

const mockComments: ArticleComment[] = [
  {
    commentId: "C001",
    content: "Bài viết rất hữu ích, cảm ơn bạn!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    articleId: "A001",
    userId: "U001",
  },
  {
    commentId: "C002",
    content: "Mình đã áp dụng và kết quả rất tốt.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    articleId: "A001",
    userId: "U002",
  },
  {
    commentId: "C003",
    content: "Cần thêm ảnh minh họa nữa.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    articleId: "A002",
    userId: "U003",
  },
];

export const articleCommentRouter = router({
  getAll: publicProcedure.query(() => {
    return mockComments;
  }),

  getByArticle: publicProcedure
    .input(
      z.object({
        articleId: z.string(),
      })
    )
    .query(({ input }) => {
      return mockComments.filter((c) => c.articleId === input.articleId);
    }),

  create: publicProcedure
    .input(
      z.object({
        commentId: z.string(),
        articleId: z.string(),
        content: z.string().min(1),
        userId: z.string().nullable().optional(),
      })
    )
    .mutation(({ input }) => {
      const now = new Date().toISOString();
      const newComment: ArticleComment = {
        ...input,
        userId: input.userId ?? null,
        createdAt: now,
        updatedAt: now,
      };
      // NOTE: đây chỉ là mock trả về, nếu dùng DB hãy lưu vào DB tại đây
      return newComment;
    }),

  update: publicProcedure
    .input(
      z.object({
        commentId: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(({ input }) => {
      const now = new Date().toISOString();
      // mock update: trả về đối tượng đã cập nhật
      return {
        commentId: input.commentId,
        content: input.content,
        updatedAt: now,
      };
    }),

  delete: publicProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .mutation(({ input }) => {
      // mock delete: trả về id đã xóa
      return { deleted: true, commentId: input.commentId };
    }),
});

export default articleCommentRouter;