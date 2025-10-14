"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import { Loading } from "../../components/loading";
import { useState } from "react";
import { ServiceDetailModal } from "../../components/service/ServiceDetailModal";
import type {Service} from "@/types/Service"

export default function ServiceSection() {
  const { data: services, isLoading, error } = trpc.service.getAll.useQuery();
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  return (
    <>
      <section className="bg-[#F5D7B7] py-10 px-4 flex flex-col items-center relative">
        {/* Title */}
        <div className="mb-8 flex flex-col items-center">
          <span className="inline-block bg-[#7B4F35] rounded-full px-10 py-3 text-white text-3xl font-bold shadow-lg border-4 border-white">
            Dịch Vụ
          </span>
        </div>
        {/* Grid dịch vụ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service: {
            serviceId: string;
            name: string;
            description: string;
            price: number;
            img_url?: string;
            icon?: string;
            color?: string;
            discount_price?: number;
          }) => (
            <Card
              key={service.serviceId}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedService(service as Service);
                setOpen(true);
              }}
            >
              <CardContent className="flex flex-col items-center p-6">
                <div className={`w-24 h-24 rounded-full ${service.color || 'bg-[#A0694B]'} flex items-center justify-center mb-4 shadow-md group overflow-hidden`}>
                  <Image
                    src={service.icon || service.img_url || "/assets/imgs/service/default.jpg"}
                    alt="Service Icon"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(180deg)]"
                  />
                </div>
                <h3 className="text-[#7B4F35] font-bold text-xl mb-2 text-center">{service.name}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{service.description}</p>
                <div className="font-bold text-[#C46C2B] text-lg mt-2">{service.price.toLocaleString()}₫</div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex gap-3 mt-12 justify-center">
          <button className="w-10 h-10 rounded-full bg-white border-2 border-[#7B4F35] flex items-center justify-center text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white transition-all duration-300 shadow-md font-bold">
            ←
          </button>
          {[1,2,3,4,5].map((num) => (
            <button
              key={num}
              className={`w-10 h-10 rounded-full ${num === 1 ? "bg-[#7B4F35] text-white shadow-lg" : "bg-white text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white"} border-2 border-[#7B4F35] flex items-center justify-center transition-all duration-300 shadow-md font-bold`}
            >
              {num}
            </button>
          ))}
          <button className="w-10 h-10 rounded-full bg-white border-2 border-[#7B4F35] flex items-center justify-center text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white transition-all duration-300 shadow-md font-bold">
            →
          </button>
        </div>
      </section>
      <ServiceDetailModal open={open} onOpenChange={setOpen} service={selectedService as Service} />
    </>
  );
}