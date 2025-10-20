// src/app/news/[id]/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

// --- tRPC & Auth ---
import { trpc } from "@/utils/trpc";
import { useAuth } from "@/context/AuthContext";

// --- UI Components ---
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loading } from "@/app/components/loading";
import { ArticleComment } from "@/types/Article";

// --- Types (tRPC tự động cung cấp, không cần import) ---
// import { ArticleComment } from "@/types/Article"; // Không cần thiết

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = (params as { id: string })?.id;
  const { user } = useAuth(); // Lấy thông tin người dùng
  const utils = trpc.useUtils();

  const { data: article, isLoading: loadingArticle, error } =
    trpc.article.getById.useQuery({ articleId: articleId ?? "" }, { enabled: !!articleId });

  const { data: comments, isLoading: loadingComments } =
    trpc.articleComment.getByArticle.useQuery({ articleId: articleId ?? "" }, { enabled: !!articleId });

  const createComment = trpc.articleComment.create.useMutation({
    onSuccess: async () => {
      await utils.articleComment.getByArticle.invalidate({ articleId: articleId });
      setContent(""); // Xóa form khi thành công
    },
    onError: (error) => {
      alert(`Gửi bình luận thất bại: ${error.message}`);
    },
  });

  const [content, setContent] = useState("");

  if (loadingArticle) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;
  if (!article) return <div className="text-center py-20">Không tìm thấy bài viết.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/news" className="hover:underline">Tin tức</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{article.title}</span>
      </nav>

      <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full h-80 relative">
          <Image
            src={article.imageUrl || "/imgs/imgPet/animal-8165466_1280.jpg"}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8 md:p-12">
          <h1 className="text-4xl font-bold text-[#7B4F35] mb-4">{article.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6 border-b pb-4">
            <span>Tác giả: {article.authorId || "Ẩn danh"}</span>
            <span>Ngày đăng: {new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>

          <div className="prose max-w-none text-gray-800"
               dangerouslySetInnerHTML={{ __html: article.content }} />

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-[#7B4F35] mb-6 border-t pt-8">
              Bình luận ({comments?.length ?? 0})
            </h2>

            <div className="space-y-6 mb-8">
              {loadingComments ? ( <div>Đang tải bình luận...</div> ) : (
                (comments ?? []).map((comment) => (
                  <Card key={comment.commentId} className="p-4 flex items-start gap-4">
                    <Avatar>
                      {/* <AvatarImage src={...} /> */}
                      <AvatarFallback className="bg-gray-200 text-gray-600 font-bold">
                        {comment.userId ? comment.userId.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <p className="text-sm text-gray-800 font-semibold">{comment.userId ?? "Khách"}</p>
                        <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString('vi-VN')}</p>
                      </div>
                      <p className="text-gray-700 mt-1">{comment.content}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* FORM BÌNH LUẬN */}
            {user ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!content.trim() || !user) return;
                  createComment.mutate({
                    articleId: article.articleId,
                    content: content.trim(),
                    userId: user.userId, // Lấy userId từ session
                  } as ArticleComment);
                }}
                className="bg-gray-50 p-4 rounded-lg border"
              >
                <label className="text-sm font-medium text-gray-700">
                  Bình luận với tư cách {user.fullName}
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  className="mt-2 mb-3 h-24 bg-white"
                />
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setContent("")}>Hủy</Button>
                  <Button type="submit" className="bg-[#C46C2B]" disabled={loadingArticle}>
                    {loadingArticle ? "Đang gửi..." : "Gửi bình luận"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center bg-gray-50 p-6 rounded-lg border">
                <p className="text-gray-600">
                  Vui lòng <Button variant="link" className="p-0 h-auto text-base" onClick={() => {
                      // Ở đây bạn có thể gọi hàm login từ useAuth hoặc điều hướng đến trang đăng nhập
                      // login(); 
                  }}>đăng nhập</Button> để để lại bình luận.
                </p>
              </div>
            )}
          </section>
        </div>
      </article>
    </div>
  );
}