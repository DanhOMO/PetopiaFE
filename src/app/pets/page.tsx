"use client";
import React from "react"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";
import {Loading} from "../components/loading";

export default function PetsPage() {
  const pageSize = 9;
  const [page, setPage] = React.useState(1);
  const { data: pets, isLoading, error } = trpc.pet.getAll.useQuery();
  const { data: petImgs } = trpc.petImg.getAll.useQuery();

  if (isLoading) return  <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;
  // Lấy thumbnail cho từng pet
  const getThumbnail = (pet_id: string) => {
    const img = petImgs?.find((img) => img.pet_id === pet_id && img.is_thumbnail);
    return img?.image_url || "/imgs/imgPet/animal-8165466_1280.jpg";
  };

  const total = pets?.length || 0;
  const totalPages = Math.ceil(total / pageSize);
  const pagedPets = pets?.slice((page - 1) * pageSize, page * pageSize) || [];

  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Danh sách thú cưng</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {pagedPets.map((pet) => (
          <div key={pet.pet_id} className="relative group cursor-pointer">
            <Card className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={getThumbnail(pet.pet_id)}
                  alt={pet.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>

              {/* Discount Badge */}
              {pet.discount_price && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                  Giảm giá
                </div>
              )}

              {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{pet.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  {pet.discount_price ? (
                  <>
                    <span className="text-[#F5D7B7] font-bold text-xl">{pet.discount_price.toLocaleString()}₫</span>
                    <span className="text-gray-300 line-through text-sm">{pet.price.toLocaleString()}₫</span>
                  </>
                  ) : (
                  <span className="text-[#F5D7B7] font-bold text-xl">{pet.price.toLocaleString()}₫</span>
                  )}
                </div>
                <p className="text-gray-200 text-sm mb-3 line-clamp-2">{pet.description}</p>
                <div className="flex gap-2">
                  <Button className="w-full bg-[#7B4F35] hover:bg-[#6B3F25] text-white font-semibold flex items-center justify-center gap-2">
                    Thêm vào giỏ hàng <span className="text-sm">🐾</span>
                  </Button>
                  <Link href={`/pets/${pet.pet_id}`} className="w-full">
                    <Button className="w-full" variant="outline">Xem chi tiết</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
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
    </div>
  );
}