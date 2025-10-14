import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import type { Pet } from "@/types/Pet";

export function PetDetailModal({ open, onOpenChange, petId }: { open: boolean, onOpenChange: (v: boolean) => void, petId: string }) {
  const { data: pet, isLoading, error } = trpc.pet.getById.useQuery({ pet_id: petId }, { enabled: !!petId && open });
  const { data: petImgs } = trpc.petImg.getAll.useQuery();
  const [mainImg, setMainImg] = useState<string | undefined>(petImgs?.find(img => img.pet_id === petId && img.is_thumbnail)?.image_url);
  const { addToCart } = useCart();

  useEffect(() => {
    setMainImg(petImgs?.find(img => img.pet_id === petId && img.is_thumbnail)?.image_url);
  }, [petImgs, petId, open]);

  if (!open) return null;

  
  const images = (petImgs?.filter(img => img.pet_id === petId) || []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300" aria-hidden={!open}></div>
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
            {/* Image gallery */}
            <div className="flex-1 flex flex-col gap-4 items-center">
              <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-[#C46C2B] bg-gray-100">
                <Image
                  src={mainImg || "/imgs/imgPet/animal-8165466_1280.jpg"}
                  alt={pet.name}
                  fill
                  className="object-cover transition-all duration-300"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {images.slice(0, 5).map((img, idx) => (
                    <button
                      key={img.image_url}
                      className={`w-16 h-16 relative rounded-lg overflow-hidden border-2 ${mainImg === img.image_url ? 'border-[#C46C2B] ring-2 ring-[#C46C2B]' : 'border-gray-300'} focus:outline-none`}
                      onClick={() => setMainImg(img.image_url)}
                      tabIndex={0}
                      aria-label={`Xem ảnh ${idx + 1}`}
                    >
                      <Image src={img.image_url} alt={pet.name + " " + (idx + 1)} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Info */}
            <div className="flex-1 flex flex-col gap-4 justify-between">
              <div>
                <h1 className="text-4xl font-bold text-[#7B4F35] mb-2">{pet.name}</h1>
                <div className="flex items-center gap-4 mb-2">
                  {pet.discount_price ? (
                    <>
                      <span className="text-3xl font-bold text-[#C46C2B]">{pet.discount_price.toLocaleString()}₫</span>
                      <span className="text-xl line-through text-gray-400">{pet.price.toLocaleString()}₫</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-[#C46C2B]">{pet.price.toLocaleString()}₫</span>
                  )}
                </div>
                <div className="text-gray-600 mb-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F5D7B7] scrollbar-track-transparent text-lg">
                  {pet.description || "Không có mô tả."}
                </div>
                <div className="flex flex-wrap gap-2 text-base text-[#7B4F35] mb-2">
                  <span className="bg-[#F5D7B7] px-4 py-2 rounded-full border border-[#C46C2B]">Tuổi: {pet.age ? pet.age + " tháng" : "Chưa rõ"}</span>
                  <span className="bg-[#F5D7B7] px-4 py-2 rounded-full border border-[#C46C2B]">Giới tính: {pet.gender || "Chưa rõ"}</span>
                </div>
              </div>
              <button
                className="w-full bg-[#C46C2B] text-white font-bold rounded-lg hover:bg-[#7B4F35] transition mt-4 py-4 text-xl shadow-md"
                onClick={() => {
                  addToCart({
                    pet : pet as Pet,
                    quantity: 1,
                    img: mainImg || null,
                  });
                  onOpenChange(false); // Đóng modal sau khi thêm
                }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}