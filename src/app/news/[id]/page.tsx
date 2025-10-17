"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { trpc } from "@/utils/trpc"; 
import { Button } from "@/components/ui/button";
import { Textarea } from  "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArticleComment } from "@/types/Article";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = (params as { id: string })?.id as string | undefined;
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

  // Features for pet articles based on the template
  const petFeatures = [
    { image: "/assets/imgs/imgArticle/tintuc1.png", label: "Huấn luyện mèo" },
    { image: "/assets/imgs/imgArticle/tintuc2.png", label: "Đồ dùng thú cưng" },
    { image: "/assets/imgs/imgArticle/tintuc4.png", label: "Vận chuyển an toàn" },
    { image: "/assets/imgs/imgArticle/tintuc3.png", label: "Phối giống thú cưng" },
  ];

  // Bullet points for article highlights
  const articleHighlights = [
    "Hướng dẫn chi tiết về cách chăm sóc thú cưng hàng ngày một cách khoa học",
    "Các lưu ý quan trọng về dinh dưỡng và sức khỏe cho từng loại thú cưng",
    "Mẹo hay để tạo môi trường sống thoải mái và an toàn cho pet",
    "Cách nhận biết các dấu hiệu bệnh tật sớm và xử lý kịp thời",
    "Lịch trình tiêm phòng và khám sức khỏe định kỳ cho thú cưng",
    "Tư vấn về việc lựa chọn thức ăn và chế độ dinh dưỡng phù hợp",
  ];
 
  if (loadingArticle) return <div className="text-center py-20">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;
  if (!article) {
    return <div className="text-center py-20">Không tìm thấy bài viết.</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="mx-auto py-6" style={{ maxWidth: 'calc(100vw - 264px)', paddingLeft: '132px', paddingRight: '132px' }}>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Trở về tin tức
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mx-auto" style={{ maxWidth: 'calc(100vw - 280px)', paddingLeft: '140px', paddingRight: '140px' }}>
        <div className="relative mb-8 overflow-hidden rounded-3xl">
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

      </div>

      {/* Content Section with different padding */}
      <div className="mx-auto" style={{ maxWidth: 'calc(100vw - 264px)', paddingLeft: '132px', paddingRight: '132px' }}>
        {/* Title */}
        <h1 className="mb-6 font-sans text-4xl font-bold leading-tight text-[#2d2d2d] md:text-5xl">
          {article.title}
        </h1>

        {/* Description - Extract from content or use a summary */}
        <div className="mb-12 font-sans text-base leading-relaxed text-[#6b6b6b]">
          <div dangerouslySetInnerHTML={{ __html: article.content.substring(0, 300) + "..." }} />
        </div>

        {/* Feature Icons */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {petFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 rounded-2xl p-6 transition-transform hover:scale-105"
            >
              <div className="w-16 h-16 relative">
                <Image
                  src={feature.image}
                  alt={feature.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-center font-sans text-sm font-medium text-[#2d2d2d]">
                {feature.label}
              </span>
            </div>
          ))}
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