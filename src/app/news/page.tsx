"use client";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";
import { Loading } from "../components/loading";
import { ArrowUpRight } from "lucide-react";

export default function NewsPage() {
  const { data: articles, isLoading, error } = trpc.article.getAll.useQuery();

  // Dữ liệu tin tức mẫu để bổ sung
  const sampleArticles = [
    {
      articleId: 999,
      title: "Cách chăm sóc thú cưng mùa hè",
      content: "Mùa hè nóng bức đòi hỏi chúng ta phải có những biện pháp chăm sóc đặc biệt cho thú cưng. Từ việc cung cấp đủ nước uống đến tránh để chúng ra ngoài vào những giờ nắng gắt...",
      imageUrl: "/assets/imgs/imgPet/dog-4988985_1280.jpg",
      createdAt: new Date('2024-06-15'),
      authorId: "Admin"
    },
    {
      articleId: 998,
      title: "Những bệnh thường gặp ở mèo",
      content: "Mèo có thể mắc nhiều loại bệnh khác nhau, từ những bệnh nhẹ như cảm lạnh đến những bệnh nghiêm trọng hơn. Việc nhận biết sớm các triệu chứng sẽ giúp điều trị hiệu quả...",
      imageUrl: "/assets/imgs/imgPet/cat-2603300_1280.jpg",
      createdAt: new Date('2024-06-12'),
      authorId: "Bác sĩ thú y"
    },
    {
      articleId: 997,
      title: "Dinh dưỡng cho chó con",
      content: "Chó con cần một chế độ dinh dưỡng đặc biệt để phát triển khỏe mạnh. Từ việc chọn thức ăn phù hợp đến lịch cho ăn hợp lý, tất cả đều quan trọng cho sự phát triển của chúng...",
      imageUrl: "/assets/imgs/imgPet/chihuahua-453063_1280.jpg",
      createdAt: new Date('2024-06-10'),
      authorId: "Chuyên gia dinh dưỡng"
    },
    {
      articleId: 996,
      title: "Huấn luyện thú cưng cơ bản",
      content: "Huấn luyện thú cưng không chỉ giúp chúng ngoan ngoãn mà còn tăng cường mối quan hệ giữa chủ và thú cưng. Bắt đầu với những lệnh cơ bản và kiên nhẫn trong quá trình huấn luyện...",
      imageUrl: "/assets/imgs/imgPet/dog-1839808_1280.jpg",
      createdAt: new Date('2024-06-08'),
      authorId: "Huấn luyện viên"
    }
  ];

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  // Kết hợp dữ liệu từ API và dữ liệu mẫu
  const allArticles = [...(articles || []), ...sampleArticles];

  return (
    <div className="min-h-screen">
      {/* Title Section with Background */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <img 
            src="/assets/imgs/imgBackgroundTitle/bc-shop-listing.jpg"
            alt="News Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 
            className="text-center font-bold text-6xl text-white drop-shadow-lg"
          >
            Tin Tức
          </h1>
        </div>
      </div>

      <main className="min-h-screen bg-[#f5f5f5] p-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {allArticles?.map((article) => (
              <BlogCard 
                key={article.articleId}
                date={new Date(article.createdAt).getDate().toString()}
                month={`Th${new Date(article.createdAt).getMonth() + 1}`}
                title={article.title}
                description={article.content}
                image={article.imageUrl || "/assets/imgs/imgPet/animal-8165466_1280.jpg"}
                articleId={article.articleId}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

interface BlogCardProps {
  date: string
  month: string
  title: string
  description: string
  image: string
  articleId: number
}

function BlogCard({ date, month, title, description, image, articleId }: BlogCardProps) {
  return (
    <div className="group relative">
      <Link href={`/news/${articleId}`}>
        <article className="relative flex flex-col overflow-hidden rounded-[32px] bg-[#f5e6d3] p-4 transition-all duration-300 hover:shadow-xl min-h-[420px]">
          {/* Background layer */}
          <div
            className="absolute inset-0 rounded-[32px] bg-[#f5e6d3]"
            style={{
              clipPath:
                'path("M 0 32 Q 0 0 32 0 L calc(100% - 32) 0 Q 100% 0 100% 32 L 100% calc(100% - 80) Q 100% calc(100% - 70) 95% calc(100% - 65) Q 90% calc(100% - 60) 85% calc(100% - 60) Q 80% calc(100% - 60) 75% calc(100% - 65) Q 70% calc(100% - 70) 70% calc(100% - 80) L 70% calc(100% - 32) Q 70% 100% 32 100% L 32 100% Q 0 100% 0 calc(100% - 32) Z")',
            }}
          />
          
          {/* Hover effect layer - từ góc dưới phải lên */}
          <div
            className="absolute inset-0 rounded-[32px] bg-[#ff7b7b] transition-all duration-500 ease-out translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"
            style={{
              clipPath:
                'path("M 0 32 Q 0 0 32 0 L calc(100% - 32) 0 Q 100% 0 100% 32 L 100% calc(100% - 80) Q 100% calc(100% - 70) 95% calc(100% - 65) Q 90% calc(100% - 60) 85% calc(100% - 60) Q 80% calc(100% - 60) 75% calc(100% - 65) Q 70% calc(100% - 70) 70% calc(100% - 80) L 70% calc(100% - 32) Q 70% 100% 32 100% L 32 100% Q 0 100% 0 calc(100% - 32) Z")',
              transformOrigin: 'bottom right',
            }}
          />

          {/* Content wrapper with relative positioning */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative mb-4 overflow-hidden rounded-[24px]">
              <Image
                src={image || "/assets/imgs/imgPet/animal-8165466_1280.jpg"}
                alt={title}
                width={500}
                height={300}
                className="h-[180px] w-full object-cover"
              />

              {/* Date Badge */}
              <div className="absolute left-4 top-4 flex flex-col items-center justify-center rounded-xl bg-[#ff6b6b] px-3 py-2 text-white shadow-lg transition-all duration-300 group-hover:bg-white group-hover:text-[#2d2d2d]">
                <span className="text-xl font-bold leading-none">{date}</span>
                <span className="text-sm font-medium leading-none">{month}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col px-2 pb-2">
              <h3 className="mb-2 font-sans text-lg font-bold leading-tight text-[#2d2d2d] transition-colors duration-300 group-hover:text-white line-clamp-2">
                {title}
              </h3>
              <p className="mb-3 flex-1 font-sans text-sm leading-relaxed text-[#6b6b6b] transition-colors duration-300 group-hover:text-white line-clamp-3">
                {description}
              </p>
            </div>
          </div>
        </article>
      </Link>
      
      {/* Button bên ngoài article để không bị overflow-hidden che */}
      <button
        className="absolute -bottom-2 -right-2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6b6b] text-white shadow-lg transition-all duration-300 group-hover:bg-[#1a3a52] hover:scale-110"
        aria-label="Read more"
        onClick={() => window.location.href = `/news/${articleId}`}
      >
        <img 
          src="/assets/svg/muiten.svg" 
          alt="Arrow" 
          className="h-6 w-6 transition-transform duration-300 -rotate-65 group-hover:rotate-0 filter brightness-0 invert"
        />
      </button>
    </div>
  )
}