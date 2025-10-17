"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <>
      {/* Background section with full width */}
      <div className="relative py-24 w-full">
        <div className="absolute inset-0">
          <Image 
            src="/assets/imgs/imgService/bc-service.jpg"
            alt="News Background"
            fill
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 
            className="text-center font-bold text-6xl text-white drop-shadow-lg"
          >
            Dịch vụ của chúng tôi
          </h1>
        </div>
      </div>
      
      {/* Our Top-Rated Service Section */}
      <ServiceSection />
    </>
  );
}

export function ServiceSection() {
  const services = [
    {
      icon: "/assets/imgs/imgService/service1.png",
      title: "Spa thú cưng",
      description: "Dịch vụ tắm, cắt tỉa lông, vệ sinh cho thú cưng.",
    },
    {
      icon: "/assets/imgs/imgService/service2.png",
      title: "Cắt móng & vệ sinh tai",
      description: "Dịch vụ cắt móng, vệ sinh tai an toàn cho thú cưng.",
    },
    {
      icon: "/assets/imgs/imgService/service3.png",
      title: "Khám bệnh tổng quát",
      description: "Khám tổng quát, tư vấn sức khỏe cho thú cưng.",
    },
    {
      icon: "/assets/imgs/imgService/service4.png",
      title: "Khách sạn thú cưng",
      description: "Lưu trú, chăm sóc thú cưng khi chủ vắng nhà.",
    },
    {
      icon: "/assets/imgs/imgService/service5.png",
      title: "Nhuộm màu lông",
      description: "Dịch vụ nhuộm màu lông cho thú cưng.",
    },
  ]

  return (
    <section className="py-16 px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-4">Dịch vụ hàng đầu của chúng tôi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp các dịch vụ chăm sóc thú cưng chất lượng cao với đội ngũ chuyên gia giàu kinh nghiệm,
            đảm bảo sự an toàn và hạnh phúc cho những người bạn bốn chân của bạn.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-[#f5e6d3] rounded-3xl p-6 flex gap-4 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-[#ff7b7b] before:rounded-3xl before:scale-0 before:transition-transform before:duration-500 before:ease-out hover:before:scale-100"
            >
              {/* Icon */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-[#1a3a52] group-hover:text-white mb-2 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 group-hover:text-white text-sm transition-colors duration-300">{service.description}</p>
                </div>
                <Link href={`/services/${index + 1}`} className="text-[#ff7b7b] group-hover:text-white font-semibold text-sm underline mt-4 transition-colors duration-300 cursor-pointer">
                  TÌM HIỂU THÊM
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}