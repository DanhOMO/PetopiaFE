"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Thêm component Tabs
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import type { Pet } from "@/types/Pet";
import { Star } from "lucide-react"; // Icon ngôi sao

export function PetDetailModal({ open, onOpenChange, petId }: { open: boolean, onOpenChange: (v: boolean) => void, petId: string }) {
  // --- Dữ liệu cũ ---
  const { data: pet, isLoading, error } = trpc.pet.getById.useQuery({ petId: petId }, { enabled: !!petId && open });
  const { data: petImgs } = trpc.petImg.getAll.useQuery(undefined, { enabled: !!petId && open });
  const { addToCart } = useCart();
  
  // --- Dữ liệu mới: Fetch reviews cho pet này ---
  const { data: reviews, isLoading: isLoadingReviews } = trpc.review.getByPet.useQuery(
    { petId: petId },
    { enabled: !!petId && open }
  );

  const [mainImg, setMainImg] = useState<string | undefined>();

  useEffect(() => {
    if (petImgs && petId && open) {
      const thumbnail = petImgs.find(img => img.petId === petId && img.isThumbnail)?.imageUrl;
      setMainImg(thumbnail || petImgs.find(img => img.petId === petId)?.imageUrl); // Lấy ảnh đầu tiên nếu không có thumbnail
    }
  }, [petImgs, petId, open]);

  if (!open) return null;

  const images = (petImgs?.filter(img => img.petId === petId) || []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all" aria-hidden={!open}></div>
      <DialogContent
        className="!max-w-[900px] w-full p-0 bg-white rounded-3xl shadow-2xl border-0 overflow-hidden z-50"
        style={{ maxWidth: "90%", width: "100%" }}
      >
        {isLoading ? (
          <div className="py-16 text-center text-lg text-[#7B4F35]">Đang tải...</div>
        ) : error || !pet ? (
          <div className="py-16 text-center text-red-500">Không tìm thấy thú cưng.</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Image gallery (Không đổi) */}
            <div className="flex-1 flex flex-col gap-4 items-center">
              <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-[#C46C2B] bg-gray-100">
                <Image
                  src={mainImg || "/imgs/imgPet/animal-8165466_1280.jpg"}
                  alt={pet.name} fill className="object-cover" priority
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {images.slice(0, 5).map((img, idx) => (
                    <button
                      key={img.imageId}
                      className={`w-16 h-16 relative rounded-lg overflow-hidden border-2 ${mainImg === img.imageUrl ? 'border-[#C46C2B] ring-2 ring-[#C46C2B]' : 'border-gray-300'}`}
                      onClick={() => setMainImg(img.imageUrl)}
                      aria-label={`Xem ảnh ${idx + 1}`}
                    >
                      <Image src={img.imageUrl} alt={`${pet.name} ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Info and Reviews Section */}
            <div className="flex-1 flex flex-col">
              <Tabs defaultValue="details" className="w-full flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 bg-[#F5D7B7]">
                  <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
                  <TabsTrigger value="reviews">Đánh giá ({reviews?.length || 0})</TabsTrigger>
                </TabsList>

                {/* Tab nội dung chi tiết */}
                <TabsContent value="details" className="flex-1 flex flex-col justify-between mt-4">
                  <div>
                    <h1 className="text-4xl font-bold text-[#7B4F35] mb-2">{pet.name}</h1>
                    <div className="flex items-center gap-4 mb-2">
                      {pet.discountPrice ? (
                        <>
                          <span className="text-3xl font-bold text-[#C46C2B]">{pet.discountPrice.toLocaleString()}₫</span>
                          <span className="text-xl line-through text-gray-400">{pet.price.toLocaleString()}₫</span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-[#C46C2B]">{pet.price.toLocaleString()}₫</span>
                      )}
                    </div>
                    <div className="text-gray-600 mb-4 max-h-32 overflow-y-auto scrollbar-thin text-lg">
                      {pet.description || "Không có mô tả."}
                    </div>
                    <div className="flex flex-wrap gap-2 text-base text-[#7B4F35] mb-2">
                      <span className="bg-[#F5D7B7] px-4 py-2 rounded-full border border-[#C46C2B]">Tuổi: {pet.age ? `${pet.age} tháng` : "Chưa rõ"}</span>
                      <span className="bg-[#F5D7B7] px-4 py-2 rounded-full border border-[#C46C2B]">Giới tính: {pet.gender || "Chưa rõ"}</span>
                    </div>
                  </div>
                  <button
                    className="w-full bg-[#C46C2B] text-white font-bold rounded-lg hover:bg-[#7B4F35] transition mt-4 py-4 text-xl shadow-md"
                    onClick={() => {
                      addToCart({ pet: pet as Pet, quantity: 1, img: mainImg || null });
                      onOpenChange(false);
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </TabsContent>

                {/* Tab nội dung đánh giá */}
                <TabsContent value="reviews" className="flex-1 overflow-y-auto max-h-[400px] mt-4 scrollbar-thin">
                  {isLoadingReviews ? (
                    <p>Đang tải đánh giá...</p>
                  ) : reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.reviewId} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center mb-1">
                            <p className="font-semibold text-gray-800 mr-2">Người dùng {review.userId.slice(-4)}</p>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          {review.imageUrl && (
                             <Image src={review.imageUrl} alt="Ảnh review" width={80} height={80} className="rounded-md" />
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-4">Chưa có đánh giá nào cho sản phẩm này.</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}