"use client";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

export default function PetsPage() {
  const { data: pets, isLoading, error } = trpc.pet.getAll.useQuery();
  const { data: petImgs } = trpc.petImg.getAll.useQuery();

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  // Hàm lấy thumbnail cho từng pet
  const getThumbnail = (pet_id: string) => {
    const img = petImgs?.find((img) => img.pet_id === pet_id && img.is_thumbnail);
    return img?.image_url || "/imgs/imgPet/animal-8165466_1280.jpg";
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Danh sách thú cưng</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {pets?.map((pet) => (
          <Card key={pet.pet_id} className="flex flex-col">
            <CardHeader className="flex flex-col items-center">
              <Image
                src={getThumbnail(pet.pet_id)}
                alt={pet.name}
                width={180}
                height={180}
                className="rounded-lg object-cover h-40 w-40 mb-2"
              />
              <h2 className="text-xl font-semibold">{pet.name}</h2>
              <span className="text-sm text-gray-500">{pet.category_id}</span>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{pet.description}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-[#C46C2B] text-lg">{pet.price.toLocaleString()}₫</span>
                {pet.discount_price && (
                  <span className="line-through text-gray-400">{pet.discount_price.toLocaleString()}₫</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Tuổi: {pet.age || "?"} | Giới tính: {pet.gender}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Tình trạng: {pet.status}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-auto">
              <Button className="w-full bg-[#C46C2B] text-white">Mua ngay</Button>
              <Button className="w-full bg-[#7B4F35] text-white" variant="secondary">Thêm vào giỏ hàng</Button>
              <Link href={`/pets/${pet.pet_id}`}>
                <Button className="w-full" variant="outline">Xem chi tiết</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}