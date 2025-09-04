"use client";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";
import {Loading} from "../components/loading";

export default function NewsPage() {
  const { data: articles, isLoading, error } = trpc.article.getAll.useQuery();

  if (isLoading) return  <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#7B4F35] drop-shadow-lg">Tin tức & Bài viết</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles?.map((article) => (
          <Card key={article.article_id} className="flex flex-col rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
            <CardHeader className="flex flex-col items-center p-0">
              <div className="w-full h-48 relative">
                <Image
                  src={article.image_url || "/imgs/imgPet/animal-8165466_1280.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover w-full h-full rounded-t-2xl"
                />
              </div>
              <h2 className="text-xl font-bold text-[#7B4F35] text-center mt-4 px-4 line-clamp-2">{article.title}</h2>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between px-4 py-2">
              <p className="mb-2 text-gray-700 line-clamp-3 text-base">{article.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span>Tác giả: {article.author_id || "Ẩn danh"}</span>
                <span>Ngày đăng: {new Date(article.created_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter className="px-4 pb-4">
              <Link href={`/news/${article.article_id}`} className="w-full">
                <Button className="w-full bg-[#C46C2B] text-white font-semibold hover:bg-[#7B4F35] transition-all duration-300" variant="default">Xem chi tiết</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}