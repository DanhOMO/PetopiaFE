"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  
import { Textarea } from  "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Article, ArticleComment } from "@/types/Article";
import Link from "next/link";

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = (params as { id: string })?.id as string | undefined;
  const router = useRouter();
  const utils = trpc.useContext();

  const { data: article, isLoading: loadingArticle, error } =
    trpc.article.getById.useQuery({ articleId: articleId ?? "" }, { enabled: !!articleId });

  const { data: comments, isLoading: loadingComments } =
    trpc.articleComment.getByArticle.useQuery({ articleId: articleId ?? "" }, { enabled: !!articleId });

  const createComment = trpc.articleComment.create.useMutation({
    onSuccess: async () => {
      await utils.articleComment.getByArticle.invalidate({ articleId: articleId ?? "" });
      setContent("");
    },
  });

  const [content, setContent] = useState("");

 
  if (loadingArticle) return <div className="text-center py-20">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;
 if (!article) {
    return <div className="text-center py-20">Không tìm thấy bài viết.</div>;
  }
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <nav className="mb-6 text-sm text-gray-500">

        <span className="mx-2">/</span>
        <Link href="/news" className="text-gray-700 hover:underline">Trở về tin tức</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{article.title}</span>
      </nav>

      <article className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="w-full h-72 relative">
          <Image
            src={article.imageUrl || "/imgs/imgPet/animal-8165466_1280.jpg"}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#7B4F35] mb-4">{article.title}</h1>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div> Tác giả: {article.authorId || "Ẩn danh"} </div>
            <div>Ngày đăng: {new Date(article.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="prose max-w-none text-gray-800 mb-8">
            {/* Nếu content chứa HTML, render bằng dangerouslySetInnerHTML, nếu plain text thì hiển thị trực tiếp */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-[#7B4F35] mb-4">Bình luận ({comments?.length ?? 0})</h2>

            <div className="space-y-4 mb-6">
              {loadingComments ? (
                <div>Đang tải bình luận...</div>
              ) : (
                (comments ?? []).map((c: ArticleComment) => (
                  <Card key={c.commentId} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                        {c.userId ? c.userId.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-700 font-semibold">
                          {c.userId ?? "Khách"}
                          <span className="text-xs text-gray-400 ml-2">{new Date(c.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="text-gray-600 mt-1">{c.content}</div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

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
              className="bg-gray-50 p-4 rounded-lg border"
            >
              <label className="text-sm font-medium text-gray-700">Thêm bình luận</label>
              <Textarea
                value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                placeholder="Viết bình luận..."
                className="mt-2 mb-3 h-24"
              />
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setContent("")}
                >
                  Hủy
                </Button>
                <Button type="submit" className="bg-[#C46C2B]">
                  Gửi bình luận
                </Button>
              </div>
            </form>
          </section>
        </div>
      </article>
    </div>
  );
}