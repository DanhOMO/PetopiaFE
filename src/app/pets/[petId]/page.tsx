"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import {useParams } from "next/navigation";

export default function PetDetail() {
  const params = useParams();
  const petId = params?.petId as string;
  const { data: pet, isLoading, error } = trpc.pet.getById.useQuery({ pet_id: petId });
  const { data: petImgs } = trpc.petImg.getAll.useQuery();

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error || !pet) return <div className="text-center py-10 text-red-500">Không tìm thấy thú cưng.</div>;

  const images = petImgs?.filter(img => img.pet_id === petId) || [];

  return (
    <section className="bg-[#F5D7B7] min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Card className="flex flex-col md:flex-row gap-8 p-8 rounded-2xl shadow-xl bg-white">
          {/* Image gallery */}
          <div className="flex-1 flex flex-col gap-4 items-center">
            <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-[#C46C2B]">
              <Image
                src={images[0]?.image_url || "/imgs/imgPet/animal-8165466_1280.jpg"}
                alt={pet.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {images.slice(1, 5).map((img, idx) => (
                  <div key={img.image_url} className="w-16 h-16 relative rounded-lg overflow-hidden border border-[#C46C2B]">
                    <Image src={img.image_url} alt={pet.name + " " + (idx + 2)} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col gap-4 justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#7B4F35] mb-2">{pet.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                {pet.discount_price ? (
                  <>
                    <span className="text-2xl font-bold text-[#C46C2B]">{pet.discount_price.toLocaleString()}₫</span>
                    <span className="text-lg line-through text-gray-400">{pet.price.toLocaleString()}₫</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#C46C2B]">{pet.price.toLocaleString()}₫</span>
                )}
              </div>
              <div className="text-gray-600 mb-4">{pet.description || "Không có mô tả."}</div>
              <div className="flex flex-wrap gap-2 text-sm text-[#7B4F35]">
                <span className="bg-[#F5D7B7] px-3 py-1 rounded-full border border-[#C46C2B]">Tuổi: {pet.age ? pet.age + " tháng" : "Chưa rõ"}</span>
                <span className="bg-[#F5D7B7] px-3 py-1 rounded-full border border-[#C46C2B]">Giới tính: {pet.gender || "Chưa rõ"}</span>
              </div>
            </div>
            <Button className="w-full bg-[#C46C2B] text-white font-bold rounded-lg hover:bg-[#7B4F35] transition mt-4 py-3 text-lg">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}