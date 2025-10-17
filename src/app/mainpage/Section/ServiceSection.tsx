"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ServiceSection() {
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
          <h2 className="text-4xl text-[#8B4513] mb-4">DỊCH VỤ</h2>
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