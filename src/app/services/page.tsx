"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "../../utils/trpc";
import Link from "next/link";
import Image from "next/image";
import { ServiceDetailModal } from "@/app/components/service/ServiceDetailModal";
import type { Service } from "@/types/Service";
export default function ServicesPage() {
  // Phân trang: mỗi trang 6 dịch vụ
  const pageSize = 6;
  const [page, setPage] = React.useState(1);
  const { data: services, isLoading, error } = trpc.service.getAll.useQuery();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedServiceId, setSelectedServiceId] = React.useState<Service | null>(null);

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  const total = services?.length || 0;
  const totalPages = Math.ceil(total / pageSize);
  const pagedServices = services?.slice((page - 1) * pageSize, page * pageSize) || [];
  const handleOpenModal = (service: Service) => {
    setSelectedServiceId(service);
    setIsModalOpen(true);
  };
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Dịch vụ của Petopia</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {pagedServices.map((service: {
          serviceId: string;
          name: string;
          description: string;
          price: number;
          img_url?: string;
        }) => (
          <Card key={service.serviceId} className="flex flex-col items-center p-4">
            <CardContent className="w-full flex flex-col items-center">
              <div className="w-full h-40 relative mb-4">
                <Image
                  src={service.img_url || "/assets/imgs/service/default.jpg"}
                  alt={service.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h2 className="text-xl font-semibold text-center">{service.name}</h2>
              <p className="mb-2 text-center">{service.description}</p>
              <div className="font-bold text-[#C46C2B] text-lg mb-2">
                {service.price.toLocaleString()}₫
              </div>
              <Button className="w-full bg-[#C46C2B] text-white mt-2">Đặt lịch</Button>
              <div  className="w-full mt-2"
              onClick={() => handleOpenModal(service as Service)}
              >
                <Button className="w-full" variant="outline">Xem chi tiết</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-3 mt-12 justify-center">
          <button
            className="w-10 h-10 rounded-full bg-white border-2 border-[#7B4F35] flex items-center justify-center text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white transition-all duration-300 shadow-md font-bold"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`w-10 h-10 rounded-full ${num === page ? "bg-[#7B4F35] text-white shadow-lg" : "bg-white text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white"} border-2 border-[#7B4F35] flex items-center justify-center transition-all duration-300 shadow-md font-bold`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="w-10 h-10 rounded-full bg-white border-2 border-[#7B4F35] flex items-center justify-center text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white transition-all duration-300 shadow-md font-bold"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            →
          </button>
        </div>
      )}
      <ServiceDetailModal open={isModalOpen} onOpenChange={setIsModalOpen} service={selectedServiceId as Service} />

    </div>
  );
}