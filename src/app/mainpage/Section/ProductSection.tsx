import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const products = [
  {
    id: 1,
    image: "/assets/imgs/imgStore/img0522-8245.jpeg",
    title: "Thức ăn khô cho chó",
    price: "299.000đ",
    originalPrice: "350.000đ",
    discount: "-15%"
  },
  {
    id: 2,
    image: "/assets/imgs/imgStore/img0800-2361.jpeg",
    title: "Đồ chơi cho mèo",
    price: "89.000đ",
    originalPrice: "120.000đ",
    discount: "-26%"
  },
  {
    id: 3,
    image: "/assets/imgs/imgStore/img0848-8557.jpeg",
    title: "Vòng cổ thú cưng",
    price: "159.000đ",
    originalPrice: "200.000đ",
    discount: "-20%"
  },
  {
    id: 4,
    image: "/assets/imgs/imgStore/img0912-4774.jpeg",
    title: "Lồng vận chuyển",
    price: "450.000đ",
    originalPrice: "550.000đ",
    discount: "-18%"
  },
  {
    id: 5,
    image: "/assets/imgs/imgStore/img2078-8690.jpeg",
    title: "Bình sữa cho thú cưng",
    price: "75.000đ",
    originalPrice: "95.000đ",
    discount: "-21%"
  },
  {
    id: 6,
    image: "/assets/imgs/imgStore/img2079-7798.jpeg",
    title: "Phụ kiện trang trí",
    price: "125.000đ",
    originalPrice: "150.000đ",
    discount: "-17%"
  },
]

export default function ProductSection() {
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
      
      {/* Products Grid with max width like ServiceSection */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {products.map((product) => (
            <div key={product.id} className="relative group cursor-pointer">
              <Card className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                  {product.discount}
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-[#A0694B] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🐾</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#F5D7B7] font-bold text-xl">{product.price}</span>
                    <span className="text-gray-300 line-through text-sm">{product.originalPrice}</span>
                  </div>
                  
                  <p className="text-gray-200 text-sm mb-3">
                    🛡️ Đảm bảo an toàn tuyệt đối và đem lại sự thoải mái nhất cho bé
                  </p>
                  
                  <button className="w-full bg-[#7B4F35] hover:bg-[#6B3F25] text-white py-2 px-4 rounded-lg transition-colors duration-300 font-semibold">
                    Thêm vào giỏ hàng
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
  )
}