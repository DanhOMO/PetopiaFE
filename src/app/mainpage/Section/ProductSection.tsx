
"use client";
import { Card, CardContent } from "@/components/ui/card"

import Image from "next/image"
import Link from "next/link"
import { trpc } from "@/utils/trpc"

import { Loading } from "../../components/loading"
import { useCart } from "@/hooks/useCart"

import { Heart, Search, ShoppingCart } from "lucide-react"
import { Pet } from "@/server/routers/pet"


export default function ProductSection() {
  const { data: pets, isLoading, error } = trpc.pet.getAll.useQuery();
  const { data: petImgs } = trpc.petImg.getAll.useQuery();
  const { addToCart } = useCart();

  const getThumbnail = (pet_id: string) => {
    const img = petImgs?.find((img) => img.pet_id === pet_id && img.is_thumbnail);
    return img?.image_url || "/imgs/imgPet/animal-8165466_1280.jpg";
  };

  
  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;


  return (
    <section className="bg-[#F5D7B7] py-10 px-4 flex flex-col items-center relative">
      {/* Title */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative">
          <span className="inline-block bg-[#7B4F35] rounded-full px-10 py-3 text-white text-3xl font-bold shadow-lg border-4 border-white">
            Sản Phẩm
          </span>
        </div>
      </div>
      {/* pets Grid with max width like ServiceSection */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">

          {(pets || []).map((pet) => (
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
                  
                {/* Hover Overlay với icons */}
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center -mt-25">
  <div className="flex gap-4">
    {/* Heart Icon */}
    <div className="relative group/heart cursor-pointer p-2">
      <div className="w-16 h-16 bg-white/90 group-hover/heart:bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover/heart:scale-110 transition-all duration-300">
        <Heart className="w-6 h-6 text-[#7B4F35] group-hover/heart:fill-[#7B4F35] transition-colors duration-300" />
      </div>
      {/* Tooltip */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded text-xs opacity-0 group-hover/heart:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
        Yêu thích
      </div>
    </div>

    {/* Search Icon */}
    <div className="relative group/search cursor-pointer p-2">
      <div className="w-16 h-16 bg-white/90 group-hover/search:bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover/search:scale-110 transition-all duration-300">
        <Search className="w-6 h-6 text-[#7B4F35] group-hover/search:fill-[#7B4F35] transition-colors duration-300" />
      </div>
      {/* Tooltip */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded text-xs opacity-0 group-hover/search:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
        Xem chi tiết
      </div>
    </div>

    {/* Cart Icon */}
    <div
      className="relative group/cart cursor-pointer p-2"
      onClick={() => addToCart({ pet: pet as Pet, quantity: 1, img: getThumbnail(pet.pet_id) })}
    >
      <div className="w-16 h-16 bg-white/90 group-hover/cart:bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover/cart:scale-110 transition-all duration-300">
        <ShoppingCart className="w-6 h-6 text-[#7B4F35] group-hover/cart:fill-[#7B4F35] transition-colors duration-300" />
      </div>
      {/* Tooltip */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded text-xs opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
        Thêm giỏ hàng
      </div>
    </div>
  </div>
</div>

                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                  {pet.discount_price ? "Giảm giá" : "Mới"}
                </div>
                
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
                  
                  <p className="text-gray-200 text-sm mb-3">
                    Mô tả
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-[#7B4F35] to-[#6B3F25] hover:from-[#6B3F25] hover:to-[#5B2F15] text-white py-3 px-4 rounded-lg transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                    MUA NGAY
                    <span className="text-lg">›</span>
                  </button>
                </div>
              </Card>
            </div>
          ))}

        </div>
      </div>
      {/* Pagination */}
      <div className="flex gap-3 mt-12 justify-center">
        <button className="w-10 h-10 rounded-full bg-white border-2 border-[#7B4F35] flex items-center justify-center text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white transition-all duration-300 shadow-md font-bold">
          ←
        </button>
        {[1,2,3,4,5].map((num) => (
          <button
            key={num}
            className={`w-10 h-10 rounded-full ${num === 3 ? "bg-[#7B4F35] text-white shadow-lg" : "bg-white text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white"} border-2 border-[#7B4F35] flex items-center justify-center transition-all duration-300 shadow-md font-bold`}
          >
            {num}
          </button>
        ))}
        <button className="w-10 h-10 rounded-full bg-white border-2 border-[#7B4F35] flex items-center justify-center text-[#7B4F35] hover:bg-[#7B4F35] hover:text-white transition-all duration-300 shadow-md font-bold">
          →
        </button>
      </div>
      
    </section>
  );
}
       