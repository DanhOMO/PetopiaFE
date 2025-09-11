import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Service } from "@/types/Service";

export function ServiceDetailModal({ open, onOpenChange, service }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
    service: Service | null;
}) {
  if (!open || !service) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300" aria-hidden={!open}></div>
      <DialogContent
        className="!max-w-[900px] w-full p-0 bg-white rounded-3xl shadow-2xl border-0 overflow-hidden z-50"
        style={{ maxWidth: '90%', width: '100%' }}
      >
        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* Image */}
          <div className="flex-1 flex flex-col gap-4 items-center min-w-[220px]">
            <div className="w-full aspect-square min-h-[220px] relative rounded-2xl overflow-hidden border-2 border-[#C46C2B] bg-gray-100">
              <Image
                src={service.img_url || "/imgs/imgPet/animal-8165466_1280.jpg"}
                alt={service.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col gap-6 justify-between min-w-[220px]">
            <div>
              <h1 className="text-3xl font-bold text-[#7B4F35] mb-2">{service.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                
                  <span className="text-2xl font-bold text-[#C46C2B]">{service.price.toLocaleString()}₫</span>
                
              </div>
              <div className="text-gray-600 mb-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F5D7B7] scrollbar-track-transparent text-lg">
                {service.description || "Không có mô tả."}
              </div>
            </div>
            <button className="w-full bg-[#C46C2B] text-white font-bold rounded-xl hover:bg-[#7B4F35] transition py-4 text-xl shadow-lg">
              Đặt dịch vụ
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
