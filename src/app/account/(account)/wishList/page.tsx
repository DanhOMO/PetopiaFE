
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/app/components/loading';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

import type { Pet } from '@/server/routers/pet';
import type { PetImg } from '@/server/routers/petImg';

// Tạo một type mới để gộp dữ liệu từ nhiều nguồn
type EnrichedWishlistItem = {
  wishlistId: string;
  addedAt: string;
  pet: Pet;
  thumbnail: string;
};

export default function WishlistPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const utils = trpc.useUtils(); // tRPC utils để làm mới dữ liệu

  // 1. Fetch dữ liệu từ nhiều router khác nhau
  const { data: wishlistData, isLoading: isWishlistLoading } = trpc.wishList.getByUser.useQuery(
    { userId: user?.userId || "" },
    { enabled: !!user }
  );
  const { data: allPets } = trpc.pet.getAll.useQuery();
  const { data: allPetImgs } = trpc.petImg.getAll.useQuery();
  
  // State để lưu danh sách đã gộp dữ liệu
  const [wishlistItems, setWishlistItems] = useState<EnrichedWishlistItem[]>([]);

  // 2. Logic gộp dữ liệu khi các query hoàn tất
  useEffect(() => {
    if (wishlistData && allPets && allPetImgs) {
      const enrichedList = wishlistData.map(item => {
        const petDetails = allPets.find(p => p.petId === item.petId);
        const petImage = allPetImgs.find(img => img.petId === item.petId && img.isThumbnail);
        
        return {
          wishlistId: item.wishlistId,
          addedAt: item.addedAt,
          pet: petDetails!, // Dấu ! vì ta tin rằng dữ liệu luôn tồn tại
          thumbnail: petImage?.imageUrl || "/imgs/imgPet/animal-8165466_1280.jpg",
        };
      }).filter(item => !!item.pet); // Lọc bỏ những item không tìm thấy pet

      setWishlistItems(enrichedList);
    }
  }, [wishlistData, allPets, allPetImgs]);

  // 3. Mutation để xóa một item
  const removeItemMutation = trpc.wishList.remove.useMutation({
    onSuccess: () => {
      // Khi xóa thành công, làm mới lại query getByUser để UI cập nhật
      utils.wishList.getByUser.invalidate();
    },
  });

  const handleRemoveItem = (wishlistId: string) => {
    removeItemMutation.mutate({ wishlistId });
  };

  // --- XỬ LÝ CÁC TRẠNG THÁI ---
  if (isAuthLoading || (user && isWishlistLoading)) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="text-center py-20 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[#7B4F35] mb-4">Bạn cần đăng nhập</h1>
        <p className="text-gray-600 mb-6">Vui lòng đăng nhập để xem danh sách yêu thích và lưu lại những bé cưng bạn quan tâm nhé.</p>
        {/* Ở đây có thể thêm nút Login hoặc Link */}
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
        <div className="text-center py-20 max-w-2xl mx-auto flex flex-col items-center">
            <Heart size={64} className="text-[#F5D7B7] mb-4" />
            <h1 className="text-2xl font-bold text-[#7B4F35] mb-4">Danh sách yêu thích trống</h1>
            <p className="text-gray-600 mb-6">Bạn chưa có thú cưng nào trong danh sách. Hãy khám phá và tìm cho mình một người bạn nhé!</p>
            <Link href="/pets">
                <Button className="bg-[#C46C2B] hover:bg-[#A0694B]">Khám phá thú cưng</Button>
            </Link>
        </div>
    );
  }

  // --- GIAO DIỆN CHÍNH KHI CÓ DỮ LIỆU ---
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-[#7B4F35] mb-8">Danh sách Yêu thích</h1>
      <div className="space-y-4">
        {wishlistItems.map((item) => (
          <Card key={item.wishlistId} className="flex items-center p-4 gap-4 overflow-hidden">
            <Link href={`/pets/${item.pet.petId}`} className="flex-shrink-0">
                <Image
                    src={item.thumbnail}
                    alt={item.pet.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover w-24 h-24 border"
                />
            </Link>

            <div className="flex-1">
              <Link href={`/pets/${item.pet.petId}`}>
                <h2 className="font-bold text-lg text-gray-800 hover:text-[#7B4F35]">{item.pet.name}</h2>
              </Link>
              <div className="flex items-baseline gap-2 mt-1">
                {item.pet.discountPrice ? (
                  <>
                    <span className="text-xl font-semibold text-[#C46C2B]">{item.pet.discountPrice.toLocaleString()}₫</span>
                    <span className="text-sm text-gray-400 line-through">{item.pet.price.toLocaleString()}₫</span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-[#C46C2B]">{item.pet.price.toLocaleString()}₫</span>
                )}
              </div>
              <Badge variant={item.pet.status === 'AVAILABLE' ? 'default' : 'secondary'} className="mt-2">
                {item.pet.status === 'AVAILABLE' ? 'Còn hàng' : 'Đã bán/Giữ chỗ'}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-[#7B4F35] hover:bg-[#6B3F25]">
                <ShoppingCart className="h-4 w-4 mr-2"/>
                Thêm vào giỏ
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleRemoveItem(item.wishlistId)}>
                <Trash2 className="h-4 w-4 mr-2 text-red-500"/>
                Xóa
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}