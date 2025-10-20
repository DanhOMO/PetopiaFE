// src/app/news/[id]/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
            src={article.imageUrl || "/assets/imgs/imgPet/animal-8165466_1280.jpg"}
            alt={article.title}
            width={1000}
            height={600}
            className="h-[400px] w-full object-cover"
            style={{ maxWidth: '1000px', width: '100%' }}
          />

          {/* Date Badge */}
          <div className="absolute left-6 top-6 flex flex-col items-center justify-center rounded-xl bg-[#ff6b6b] px-4 py-3 text-white shadow-lg">
            <span className="text-2xl font-bold leading-none">
              {new Date(article.createdAt).getDate()}
            </span>
            <span className="text-sm font-medium leading-none">
              Th{new Date(article.createdAt).getMonth() + 1}
            </span>
          </div>
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

        {/* Two Column Content */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          {/* Left Column - Image */}
          <div className="overflow-hidden rounded-2xl h-[400px]">
            <Image
              src={article.imageUrl || "/assets/imgs/imgPet/animal-8165466_1280.jpg"}
              alt="Nội dung bài viết"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Column - Bullet Points */}
          <div className="flex flex-col justify-center space-y-4 h-[400px]">
            {articleHighlights.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <Image
                    src="/assets/svg/chanmeo.svg"
                    alt="Paw icon"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(95%) saturate(7471%) hue-rotate(349deg) brightness(102%) contrast(101%)' }}
                  />
                </div>
                <p className="font-sans text-sm leading-relaxed text-[#6b6b6b]">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Article Content */}
        <div className="mb-16 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Comments Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#2d2d2d] mb-6">
            Bình luận ({comments?.length ?? 0})
          </h2>

          <div className="space-y-4 mb-8">
            {loadingComments ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Đang tải bình luận...</p>
              </div>
            ) : (
              (comments ?? []).map((c: ArticleComment) => (
                <Card key={c.commentId} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#ff6b6b] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {c.userId ? c.userId.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#2d2d2d]">
                          {c.userId ?? "Khách"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(c.createdAt).toLocaleString('vi-VN')}
                        </span>
                      </div>
                      <div className="text-gray-700">{c.content}</div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Comment Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!content.trim()) return;
              createComment.mutate({
                commentId: `C${Date.now()}`,
                articleId: articleId || "",
                content: content.trim(),
              });
            }}
            className="bg-gray-50 p-6 rounded-lg border mb-10"
          >
            <label className="text-lg font-medium text-[#2d2d2d] mb-4 block">
              Thêm bình luận
            </label>
            <Textarea
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              placeholder="Viết bình luận..."
              className="mb-4 h-24"
            />
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setContent("")}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white"
                disabled={createComment.isPending}
              >
                {createComment.isPending ? "Đang gửi..." : "Gửi bình luận"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}