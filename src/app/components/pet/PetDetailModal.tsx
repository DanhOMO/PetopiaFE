"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext"; // 1. IMPORT useAuth
import type { Pet } from "@/types/Pet";
import { Star } from "lucide-react";

// Tách component chọn sao ra cho gọn gàng
function StarRating({ rating, onRatingChange }: { rating: number, onRatingChange: (rating: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`cursor-pointer h-7 w-7 transition-colors ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'
          }`}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
}

export function PetDetailModal({ open, onOpenChange, petId }: { open: boolean, onOpenChange: (v: boolean) => void, petId: string }) {
  const { data: pet, isLoading, error } = trpc.pet.getById.useQuery({ petId: petId }, { enabled: !!petId && open });
  const { data: petImgs } = trpc.petImg.getAll.useQuery(undefined, { enabled: !!petId && open });
  const { data: reviews, isLoading: isLoadingReviews } = trpc.review.getByPet.useQuery({ petId: petId }, { enabled: !!petId && open });

  const { addToCart } = useCart();
  const { user } = useAuth(); // 2. Lấy thông tin người dùng đã đăng nhập
  const utils = trpc.useUtils(); // Lấy tRPC utils để làm mới dữ liệu

  const [mainImg, setMainImg] = useState<string | undefined>();
  
  // --- 3. STATE CHO FORM ĐÁNH GIÁ ---
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (petImgs && petId && open) {
      const thumbnail = petImgs.find(img => img.petId === petId && img.isThumbnail)?.imageUrl;
      setMainImg(thumbnail || petImgs.find(img => img.petId === petId)?.imageUrl);
    }
    // Reset form khi mở modal mới
    if (open) {
        setRating(0);
        setComment("");
    }
  }, [petImgs, petId, open]);

  // --- 4. TẠO MUTATION ĐỂ GỬI REVIEW ---
  const createReviewMutation = trpc.review.create.useMutation({
    onSuccess: () => {
      // KHI THÀNH CÔNG: Tự động fetch lại danh sách review
      utils.review.getByPet.invalidate({ petId });
      alert("Cảm ơn bạn đã gửi đánh giá!");
      // Reset form
      setRating(0);
      setComment("");
      
    },
    onError: (error) => {
      // Khi có lỗi, hiển thị thông báo
      alert(`Gửi đánh giá thất bại: ${error.message}`);
    },
  });

  const handleSubmitReview = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thực hiện chức năng này.");
      return;
    }
    if (rating === 0) {
      alert("Vui lòng chọn số sao để đánh giá.");
      return;
    }
    if (!comment.trim()) {
      alert("Vui lòng nhập nội dung bình luận.");
      return;
    }
    createReviewMutation.mutate({
      petId: petId,
      userId: user.userId,
      rating: rating,
      comment: comment,
    });
  };

  if (!open) return null;

  const images = (petImgs?.filter(img => img.petId === petId) || []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
      <DialogContent className="!max-w-[900px] w-full p-0 bg-white rounded-3xl overflow-hidden z-50">
        {isLoading ? (
          <div className="py-16 text-center">Đang tải...</div>
        ) : error || !pet ? (
          <div className="py-16 text-center text-red-500">Không tìm thấy thú cưng.</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Image gallery */}
            <div className="flex-1 flex flex-col gap-4 items-center">
              {/* ... (phần code Image gallery giữ nguyên) ... */}
              <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-[#C46C2B] bg-gray-100">
                <Image src={mainImg || "/imgs/imgPet/animal-8165466_1280.jpg"} alt={pet.name} fill className="object-cover" priority />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {images.slice(0, 5).map((img) => (
                    <button key={img.imageId} className={`w-16 h-16 relative rounded-lg overflow-hidden border-2 ${mainImg === img.imageUrl ? 'border-[#C46C2B] ring-2 ring-[#C46C2B]' : 'border-gray-300'}`} onClick={() => setMainImg(img.imageUrl)}>
                      <Image src={img.imageUrl} alt={pet.name} fill className="object-cover" />
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

                {/* Tab chi tiết */}
                <TabsContent value="details" className="flex-1 flex flex-col justify-between mt-4">
                  {/* ... (phần code Tab chi tiết giữ nguyên) ... */}
                  <div>
                    <h1 className="text-4xl font-bold text-[#7B4F35] mb-2">{pet.name}</h1>
                    <div className="flex items-center gap-4 mb-2">
                      {pet.discountPrice ? (<><span className="text-3xl font-bold text-[#C46C2B]">{pet.discountPrice.toLocaleString()}₫</span><span className="text-xl line-through text-gray-400">{pet.price.toLocaleString()}₫</span></>) : (<span className="text-3xl font-bold text-[#C46C2B]">{pet.price.toLocaleString()}₫</span>)}
                    </div>
                    <div className="text-gray-600 mb-4 max-h-32 overflow-y-auto">{pet.description || "Không có mô tả."}</div>
                    <div className="flex flex-wrap gap-2 text-base text-[#7B4F35] mb-2"><span className="bg-[#F5D7B7] px-4 py-2 rounded-full border border-[#C46C2B]">Tuổi: {pet.age ? `${pet.age} tháng` : "Chưa rõ"}</span><span className="bg-[#F5D7B7] px-4 py-2 rounded-full border border-[#C46C2B]">Giới tính: {pet.gender || "Chưa rõ"}</span></div>
                  </div>
                  <button className="w-full bg-[#C46C2B] text-white font-bold rounded-lg hover:bg-[#7B4F35] mt-4 py-4 text-xl" onClick={() => { addToCart({ pet: pet as Pet, quantity: 1, img: mainImg || null }); onOpenChange(false); }}>
                    Thêm vào giỏ hàng
                  </button>
                </TabsContent>

                {/* Tab đánh giá - ĐÃ CẬP NHẬT */}
                <TabsContent value="reviews" className="flex-1 flex flex-col overflow-hidden mt-4">
                  <div className="flex-1 overflow-y-auto scrollbar-thin pr-2 space-y-4">
                    {isLoadingReviews ? ( <p>Đang tải đánh giá...</p> ) : reviews && reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review.reviewId} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center mb-1">
                            <p className="font-semibold text-gray-800 mr-2">Người dùng {review.userId.slice(-4)}</p>
                            <div className="flex">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />))}</div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          {/* ... (hiển thị ảnh và ngày) ... */}
                        </div>
                      ))
                    ) : ( <p className="text-gray-500">Chưa có đánh giá nào.</p> )}
                  </div>

                  {/* 5. FORM GỬI ĐÁNH GIÁ MỚI */}
                  {user && ( // Chỉ hiển thị form nếu người dùng đã đăng nhập
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3">Viết đánh giá của bạn</h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="mb-2 block">Đánh giá</Label>
                          <StarRating rating={rating} onRatingChange={setRating} />
                        </div>
                        <div>
                          <Label htmlFor="comment" className="mb-2 block">Bình luận</Label>
                          <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Hãy chia sẻ cảm nhận của bạn..."/>
                        </div>
                        <Button onClick={handleSubmitReview} disabled={isLoading}>
                          {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
                        </Button>
                      </div>
                    </div>
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