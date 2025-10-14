import { z } from "zod";
import { router, publicProcedure } from "../trpc";

/**
 * Simple mock router for ArticleComment (similar style to your article router).
 * - getAll: trả về danh sách bình luận mẫu
 * - getByArticle: trả về bình luận theo article_id
 * - create: tạo bình luận mới (mock, không lưu DB)
 *
 * Bạn có thể thay đổi để gọi DB (prisma/knex/...) trong production.
 */

const mockComments = [
  {
    comment_id: "C001",
    content: "Bài viết rất hữu ích, cảm ơn bạn!",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    article_id: "A001",
    user_id: "U001",
  },
  {
    comment_id: "C002",
    content: "Mình đã áp dụng và kết quả rất tốt.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    article_id: "A001",
    user_id: "U002",
  },
  {
    comment_id: "C003",
    content: "Cần thêm ảnh minh họa nữa.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    article_id: "A002",
    user_id: "U003",
  },
];

export const articleCommentRouter = router({
  getAll: publicProcedure.query(() => {
    return mockComments;
  }),

  getByArticle: publicProcedure
    .input(
      z.object({
        article_id: z.string(),
      })
    )
    .query(({ input }) => {
      return mockComments.filter((c) => c.article_id === input.article_id);
    }),

  create: publicProcedure
    .input(
      z.object({
        comment_id: z.string(),
        article_id: z.string(),
        content: z.string().min(1),
        user_id: z.string().nullable().optional(),
      })
    )
    .mutation(({ input }) => {
      const now = new Date().toISOString();
      const newComment = {
        ...input,
        created_at: now,
        updated_at: now,
      };
      // NOTE: đây chỉ là mock trả về, nếu dùng DB hãy lưu vào DB tại đây
      return newComment;
    }),

  update: publicProcedure
    .input(
      z.object({
        comment_id: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(({ input }) => {
      const now = new Date().toISOString();
      // mock update: trả về đối tượng đã cập nhật
      return {
        comment_id: input.comment_id,
        content: input.content,
        updated_at: now,
      };
    }),

  delete: publicProcedure
    .input(
      z.object({
        comment_id: z.string(),
      })
    )
    .mutation(({ input }) => {
      // mock delete: trả về id đã xóa
      return { deleted: true, comment_id: input.comment_id };
    }),
});

export default articleCommentRouter;