"use client";
import React from "react";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { Loading } from "../components/loading";
import { useCart } from "@/store/useCartStore";
import { Search, ChevronDown } from "lucide-react";
import CategoryFilter from "@/app/pets/_components/CategoryFilter";
import PriceRangeFilter from "@/app/pets/_components/PriceRangeFilter";
import ProductCard from "@/app/pets/_components/ProductCard";
import MiniCart from "@/app/carts/_components/MiniCart";

import type { Pet } from "@/types/Pet";

const CATEGORIES = [
  { name: "Chim", count: 3 },
  { name: "Mèo", count: 8 },
  { name: "Đồ chơi nhai", count: 2 },
  { name: "Chó", count: 11 },
  { name: "Nội thất", count: 1 },
  { name: "Chuột hamster", count: 2 },
  { name: "Dược phẩm", count: 1 },
];

export default function PetsPage() {
  const pageSize = 9;
  const [page, setPage] = React.useState(1);
  const { data: pets, isLoading, error } = trpc.pet.getAll.useQuery();
  const { data: petImgs } = trpc.petImg.getAll.useQuery();
  const { addItem, openMiniCart } = useCart();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPetId, setSelectedPetId] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Calculate max price from pets data
  const maxPrice = pets && pets.length > 0 ? Math.max(...pets.map(pet => pet.discountPrice || pet.price)) : 10000000;
  
  // Always start from 0 and go to maxPrice
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  // Update price range when pets data changes
  React.useEffect(() => {
    if (pets && pets.length > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [pets, maxPrice]);

  

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  // Lấy thumbnail cho từng pet
  const getThumbnail = (petId: string) => {
    const img = petImgs?.find((img) => img.petId === petId && img.isThumbnail);
    return img?.imageUrl || "/imgs/imgPet/animal-8165466_1280.jpg";
  };

  const total = pets?.length || 0;
  const totalPages = Math.ceil(total / pageSize);
  const pagedPets = pets?.slice((page - 1) * pageSize, page * pageSize) || [];

  return (
    <>
      {/* Background section with full width */}
      <div className="relative py-24 w-full">
        <div className="absolute inset-0">
          <Image 
            src="/assets/imgs/imgBackgroundTitle/bc-shop-details.jpg"
            alt="Pets Background"
            fill
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 
            className="text-center font-bold text-6xl text-white drop-shadow-lg"
          >
            Thú cưng
          </h1>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-gray-300 bg-white px-6 py-3 text-[#2d2d2d] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                  />
                </div>
                <button className="rounded-full bg-[#FF6B6B] p-3 text-white hover:bg-[#FF5555] transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="mb-4 rounded-2xl bg-[#F5E6D3] px-6 py-3 text-lg font-bold text-[#2d2d2d]">
                Mua theo danh mục
              </h2>
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Price Range */}
            <div>
              <h2 className="mb-4 rounded-2xl bg-[#F5E6D3] px-6 py-3 text-lg font-bold text-[#2d2d2d]">
                Khoảng giá
              </h2>
              <PriceRangeFilter priceRange={priceRange} onPriceChange={setPriceRange} maxPrice={maxPrice} minPrice={0} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Top Bar */}
            <div className="mb-8 flex items-center justify-between rounded-2xl bg-[#F5E6D3] px-6 py-4">
              <span className="text-[#2d2d2d] font-medium">Hiển thị 1–{Math.min(pageSize, pagedPets.length)} trong {total} kết quả</span>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[#2d2d2d] hover:text-[#FF6B6B] transition-colors">
                  <span>Bộ lọc</span>
                  <ChevronDown size={18} />
                </button>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-[#2d2d2d] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                  >
                    <option value="default">Sắp xếp mặc định</option>
                    <option value="price-low">Giá: Thấp đến cao</option>
                    <option value="price-high">Giá: Cao đến thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="latest">Mới nhất</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {pagedPets.map((pet) => (
                <ProductCard
                  key={pet.petId}
                  product={{
                    petId: pet.petId,
                    name: pet.name,
                    price: pet.price,
                    discountPrice: pet.discountPrice,
                    image: getThumbnail(pet.petId),
                    isSale: !!pet.discountPrice
                  }}
                  onAddToCart={() => {
                    addItem({ pet: pet as Pet, quantity: 1, img: getThumbnail(pet.petId) });
                    openMiniCart();
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex gap-3 justify-center">
                <button
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-full ${num === page ? "bg-[#FF6B6B] text-white" : "bg-white text-gray-600 hover:border-[#FF6B6B] hover:text-[#FF6B6B]"} border-2 ${num === page ? "border-[#FF6B6B]" : "border-gray-300"} flex items-center justify-center transition-all duration-300`}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
     
      <MiniCart />
    </>
  );
}