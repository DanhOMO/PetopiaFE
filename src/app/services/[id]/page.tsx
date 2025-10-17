"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = (params as { id: string })?.id as string | undefined;

  // Service data with Vietnamese content and prices
  const services = [
    {
      id: "1",
      title: "Spa thú cưng",
      description: "Dịch vụ tắm, cắt tỉa lông, vệ sinh cho thú cưng.",
      price: "200.000₫",
      imageUrl: "/assets/imgs/imgPet/dog-1839808_1280.jpg",
    },
    {
      id: "2", 
      title: "Cắt móng & vệ sinh tai",
      description: "Dịch vụ cắt móng, vệ sinh tai an toàn cho thú cưng.",
      price: "250.000₫",
      imageUrl: "/assets/imgs/imgPet/cat-2603300_1280.jpg",
    },
    {
      id: "3",
      title: "Khám bệnh tổng quát", 
      description: "Khám tổng quát, tư vấn sức khỏe cho thú cưng.",
      price: "150.000₫",
      imageUrl: "/assets/imgs/imgPet/dog-4988985_1280.jpg",
    },
    {
      id: "4",
      title: "Khách sạn thú cưng",
      description: "Lưu trú, chăm sóc thú cưng khi chủ vắng nhà.", 
      price: "300.000₫",
      imageUrl: "/assets/imgs/imgPet/cat-5183427_1280.jpg",
    },
    {
      id: "5",
      title: "Nhuộm màu lông",
      description: "Dịch vụ nhuộm màu lông cho thú cưng.",
      price: "200.000₫", 
      imageUrl: "/assets/imgs/imgPet/dog-7956828_1280.jpg",
    }
  ];

  const service = services.find(s => s.id === serviceId) || services[0];

  // Vietnamese bullet points for service features
  const serviceFeatures = [
    "Tư vấn chăm sóc thú cưng chuyên nghiệp từ đội ngũ bác sĩ thú y giàu kinh nghiệm.",
    "Sử dụng thiết bị và dụng cụ y tế hiện đại, đảm bảo an toàn tuyệt đối.",
    "Quy trình khám và điều trị theo tiêu chuẩn quốc tế, minh bạch và rõ ràng.",
    "Môi trường thân thiện, sạch sẽ giúp thú cưng cảm thấy thoải mái và không căng thẳng.",
    "Dịch vụ chăm sóc tận tâm, chu đáo từ lúc tiếp nhận đến khi hoàn thành.",
    "Hỗ trợ tư vấn dinh dưỡng và chế độ chăm sóc phù hợp cho từng loại thú cưng.",
    "Theo dõi sức khỏe định kỳ và nhắc nhở lịch hẹn tiêm phòng, khám bệnh.",
    "Cung cấp dịch vụ cấp cứu 24/7 trong các trường hợp khẩn cấp và nghiêm trọng.",
    "Giá cả hợp lý, minh bạch với nhiều gói dịch vụ phù hợp với mọi gia đình.",
    "Cam kết chất lượng dịch vụ cao và sự hài lòng của khách hàng là ưu tiên hàng đầu.",
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="mx-auto py-6" style={{ maxWidth: 'calc(100vw - 264px)', paddingLeft: '132px', paddingRight: '132px' }}>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Trở về dịch vụ
        </Link>
      </div>

      {/* Hero Image */}
      <div className="mx-auto mb-12" style={{ maxWidth: 'calc(100vw - 280px)', paddingLeft: '140px', paddingRight: '140px' }}>
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src={service.imageUrl}
            alt={service.title}
            width={1200}
            height={600}
            className="h-[500px] w-full object-cover"
          />
          {/* Price Badge */}
          <div className="absolute left-6 bottom-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-lg font-bold text-gray-800">
              {service.price}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto" style={{ maxWidth: 'calc(100vw - 264px)', paddingLeft: '132px', paddingRight: '132px' }}>
        
        {/* Title */}
        <h1 className="mb-8 text-4xl font-bold text-[#8B4513] md:text-5xl">
          Dịch vụ chăm sóc thú cưng chuyên nghiệp và tận tâm:
        </h1>

        {/* Description Paragraphs */}
        <div className="mb-12 space-y-4 text-gray-600 leading-relaxed">
          <p>
            Tại trung tâm chăm sóc thú cưng của chúng tôi, chúng tôi hiểu rằng thú cưng không chỉ là động vật mà còn là thành viên quan trọng trong gia đình bạn. 
            Với đội ngũ bác sĩ thú y giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe toàn diện và chất lượng cao nhất. 
            Từ khám sức khỏe định kỳ, điều trị bệnh, đến các dịch vụ làm đẹp và chăm sóc cá nhân, tất cả đều được thực hiện với sự tận tâm và chuyên nghiệp.
          </p>
          <p>
            Chúng tôi không ngừng cập nhật các phương pháp điều trị tiên tiến và duy trì môi trường làm việc sạch sẽ, an toàn để đảm bảo thú cưng của bạn 
            luôn cảm thấy thoải mái trong suốt quá trình chăm sóc. Sự hài lòng của khách hàng và sức khỏe của thú cưng chính là động lực để chúng tôi 
            không ngừng phát triển và hoàn thiện dịch vụ mỗi ngày.
          </p>
        </div>

        {/* Features Grid with Paw Icons */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {serviceFeatures.map((feature, index) => (
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
              <p className="text-sm text-gray-600">{feature}</p>
            </div>
          ))}
        </div>

        {/* Two Images Side by Side */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/assets/imgs/imgPet/dog-4988985_1280.jpg"
              alt="Dog and cats together"
              width={600}
              height={400}
              className="h-[300px] w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/assets/imgs/imgPet/cat-2603300_1280.jpg"
              alt="Pet feeding"
              width={600}
              height={400}
              className="h-[300px] w-full object-cover"
            />
          </div>
        </div>

      </div>
    </main>
  );
}
