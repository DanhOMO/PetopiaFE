"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Heart, Eye, Minus, Plus, Star, Clock, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { trpc } from "@/utils/trpc"
import { useCart } from "@/store/useCartStore"
import { Loading } from "@/app/components/loading"
import Image from "next/image"
import MiniCart from "@/app/carts/_components/MiniCart"

export default function PetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const petId = params.id as string
  
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const { addItem, openMiniCart } = useCart()
  
  // Fetch pet data
  const { data: pet, isLoading: petLoading, error } = trpc.pet.getById.useQuery({ petId: petId })
  const { data: petImgs } = trpc.petImg.getAll.useQuery()
  const { data: allPets } = trpc.pet.getAll.useQuery() // Để debug
  
  // Debug log
  console.log("Pet ID:", petId)
  console.log("Pet data:", pet)
  console.log("All pets:", allPets?.map(p => p.petId))
  console.log("Loading:", petLoading)
  console.log("Error:", error)
  
  if (petLoading) return <Loading />
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>
  if (!pet) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">Không tìm thấy thú cưng với ID: {petId}</div>
        <div className="text-sm text-gray-500">
          Các ID có sẵn: {allPets?.map(p => p.petId).join(", ")}
        </div>
        <button 
          onClick={() => router.push('/pets')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Quay lại danh sách thú cưng
        </button>
      </div>
    )
  }

  // Get images for this pet
  const petImages = petImgs?.filter((img: any) => img.petId === petId) || []
  const thumbnailImage = petImages.find((img: any) => img.isThumbnail)?.imageUrl || "/assets/imgs/imgPet/animal-8165466_1280.jpg"
  const allImages = petImages.length > 0 ? petImages.map((img: any) => img.imageUrl) : [thumbnailImage]

  const handleAddToCart = () => {
    addItem({ 
      pet: pet, 
      quantity: quantity, 
      img: thumbnailImage 
    })
    openMiniCart()
  }

  const handleBuyNow = () => {
    addItem({ 
      pet: pet, 
      quantity: quantity, 
      img: thumbnailImage 
    })
    // Redirect to cart or checkout page
    router.push('/carts')
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại thú cưng
        </button>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="bg-card border border-border overflow-hidden">
              <div className="aspect-square bg-secondary flex items-center justify-center">
                <Image 
                  src={thumbnailImage} 
                  alt={pet.name} 
                  width={600}
                  height={600}
                  className="w-full h-full object-cover" 
                />
              </div>
            </Card>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.slice(0, 4).map((src: string, idx: number) => (
                  <button
                    key={idx}
                    className={`aspect-square rounded-lg border-2 overflow-hidden transition ${
                      idx === 0 ? "border-primary" : "border-border hover:border-primary"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${pet.name} view ${idx + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-3">{pet.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">(Đánh giá từ khách hàng)</span>
              </div>
            </div>

            {/* SKU and Price */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Mã sản phẩm:</span> {pet.petId}
              </p>
              <div className="flex items-center gap-3">
                {pet.discountPrice ? (
                  <>
                    <p className="text-3xl font-bold text-foreground">
                      {pet.discountPrice.toLocaleString('vi-VN')}₫
                    </p>
                    <p className="text-xl text-muted-foreground line-through">
                      {pet.price.toLocaleString('vi-VN')}₫
                    </p>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                      Giảm {Math.round((1 - pet.discountPrice / pet.price) * 100)}%
                    </span>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-foreground">
                    {pet.price.toLocaleString('vi-VN')}₫
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-bold text-foreground text-lg">Mô tả</h3>
              <p className="text-foreground leading-relaxed text-base">
                {pet.description || "Thú cưng đáng yêu và thân thiện, phù hợp cho gia đình. Được chăm sóc tốt và có sức khỏe tốt."}
              </p>
            </div>

            {/* Pet Information */}
            <div className="space-y-3">
              <h3 className="font-bold text-foreground text-lg">Thông tin chi tiết</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-muted-foreground">Loại:</span>
                  <span className="ml-2 text-foreground">{pet.category}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Giới tính:</span>
                  <span className="ml-2 text-foreground">{pet.gender}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Tuổi:</span>
                  <span className="ml-2 text-foreground">{pet.age} tháng</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Cân nặng:</span>
                  <span className="ml-2 text-foreground">{pet.weight} kg</span>
                </div>
              </div>
            </div>

            {/* Promo Banner */}
            <div className="bg-[#fff7f7] rounded-full p-4 flex items-center gap-3">
              <div className="w-6 h-6 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66" className="w-full h-full fill-[#ff6262]">
                  <path d="M33,0l6.1,9.5l10.4-5.1L50,15.7l11.6,0.8l-5.2,10L66,33l-9.5,6.1l5.1,10.4L50.3,50l-0.8,11.6l-10-5.2L33,66l-6.1-9.5 l-10.4,5.1L16,50.3L4.4,49.5l5.2-10L0,33l9.5-6.1L4.4,16.5L15.7,16l0.8-11.6l10,5.2L33,0z M41.7,18c-0.5-0.3-1.2-0.1-1.5,0.4 L24,46.5c-0.3,0.5-0.1,1.2,0.4,1.5c0.5,0.3,1.2,0.1,1.5-0.4L42,19.5C42.4,19,42.2,18.3,41.7,18z M43.6,38c-1.1-1.1-2.6-1.8-4.2-1.8 c-1.6,0-3.1,0.7-4.2,1.8s-1.8,2.6-1.8,4.2c0,1.7,0.7,3.1,1.8,4.2c1.1,1.1,2.6,1.7,4.2,1.7c1.7,0,3.1-0.7,4.2-1.7 c1.1-1.1,1.8-2.6,1.8-4.2C45.3,40.5,44.7,39,43.6,38z M42,44.9c-0.7,0.7-1.6,1.1-2.7,1.1c-1,0-2-0.4-2.7-1.1s-1.1-1.7-1.1-2.7 c0-1,0.4-2,1.1-2.7c0.7-0.7,1.6-1.1,2.7-1.1c1.1,0,2,0.4,2.7,1.1c0.7,0.7,1.1,1.6,1.1,2.7S42.7,44.2,42,44.9z M30.9,19.6 c-1.1-1.1-2.6-1.8-4.2-1.8c-1.6,0-3.1,0.7-4.2,1.8c-1.1,1.1-1.7,2.6-1.7,4.2c0,1.6,0.7,3.1,1.7,4.2c1.1,1.1,2.6,1.7,4.2,1.7 c1.7,0,3.1-0.7,4.2-1.7c1.1-1.1,1.8-2.6,1.8-4.2C32.6,22.2,31.9,20.7,30.9,19.6z M29.3,26.5c-0.7,0.7-1.7,1.1-2.7,1.1 c-1,0-2-0.4-2.7-1.1c-0.7-0.7-1.1-1.6-1.1-2.7c0-1.1,0.4-2,1.1-2.7s1.6-1.1,2.7-1.1c1.1,0,2,0.4,2.7,1.1s1.1,1.7,1.1,2.7 C30.5,24.9,30,25.8,29.3,26.5z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#505050]">
                  Miễn phí giao hàng cho đơn hàng trên 2.000.000₫
                </p>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border border-border rounded-full bg-[#fae5d2]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 cursor-pointer transition"
                  >
                    <Minus size={18} className="text-foreground" />
                  </button>
                  <span className="px-6 font-semibold text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 cursor-pointer transition">
                    <Plus size={18} className="text-foreground" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-6 text-base font-semibold bg-[#102937] hover:bg-[#0d1f2a] text-white rounded-full transition-colors duration-300 cursor-pointer"
                >
                  Add To Cart
                </Button>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-4 bg-white border-2 border-gray-200 rounded-full transition-all duration-300 cursor-pointer group"
                >
                  <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-500"} />
                </button>
              </div>

              {/* Buy Now Button */}
              <Button 
                onClick={handleBuyNow}
                className="w-full py-6 text-base font-semibold bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-full"
              >
                Mua ngay
              </Button>
            </div>

          </div>
        </div>
      </div>
      <MiniCart />
    </main>
  )
}
