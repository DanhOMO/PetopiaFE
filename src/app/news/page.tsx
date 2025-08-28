"use client";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const { data: articles, isLoading, error } = trpc.article.getAll.useQuery();

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Tin tức & Bài viết</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles?.map((article) => (
          <Card key={article.article_id} className="flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <Image
                src={article.image_url || "/imgs/imgPet/animal-8165466_1280.jpg"}
                alt={article.title}
                width={180}
                height={120}
                className="rounded-lg object-cover h-28 w-full mb-2"
              />
              <h2 className="text-lg font-semibold text-center">{article.title}</h2>
            </CardHeader>
            <CardContent>
              <p className="mb-2 line-clamp-3">{article.content}</p>
              <div className="text-xs text-gray-500 mb-2">
                Tác giả: {article.author_id || "Ẩn danh"}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Ngày đăng: {new Date(article.created_at).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/news/${article.article_id}`} className="w-full">
                <Button className="w-full" variant="outline">Xem chi tiết</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}