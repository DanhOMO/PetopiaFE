import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const products = [
  {
    id: 1,
    icon: "/assets/icon/petHotelIcon.png",
    title: "1-8kg : Theo Ngày",
    desc: "Dựa trên ký gửi Petopia để trải nghiệm dịch vụ Spa chất lượng",
  },
  {
    id: 2,
    icon: "/assets/icon/petHotelIcon.png",
    title: "1-8kg : Theo Ngày",
    desc: "Dựa trên ký gửi Petopia để trải nghiệm dịch vụ Spa chất lượng",
  },
  {
    id: 3,
    icon: "/assets/icon/petHotelIcon.png",
    title: "1-8kg : Theo Ngày",
    desc: "Dựa trên ký gửi Petopia để trải nghiệm dịch vụ Spa chất lượng",
  },
  {
    id: 4,
    icon: "/assets/icon/petHotelIcon.png",
    title: "1-8kg : Theo Ngày",
    desc: "Dựa trên ký gửi Petopia để trải nghiệm dịch vụ Spa chất lượng",
  },
  {
    id: 5,
    icon: "/assets/icon/petHotelIcon.png",
    title: "1-8kg : Theo Ngày",
    desc: "Dựa trên ký gửi Petopia để trải nghiệm dịch vụ Spa chất lượng",
  },
  {
    id: 6,
    icon: "/assets/icon/petHotelIcon.png",
    title: "1-8kg : Theo Ngày",
    desc: "Dựa trên ký gửi Petopia để trải nghiệm dịch vụ Spa chất lượng",
  },
]

export default function ProductSection() {
  return (
    <section className="bg-[#F5D7B7] py-10 px-4 flex flex-col items-center">
      <div className="mb-6">
        <span className="inline-block bg-[#7B4F35] rounded-full px-8 py-2 text-white text-2xl font-bold shadow">
          Sản Phẩm
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {products.map((product) => (
          <Card key={product.id} className="bg-white rounded-xl shadow flex flex-col items-center py-6 px-4">
            <CardContent className="flex flex-col items-center">
              <Image src={product.icon} alt="Pet Icon" width={48} height={48} className="mb-2" />
              <h3 className="text-[#7B4F35] font-bold text-lg mb-1">{product.title}</h3>
              <p className="text-[#7B4F35] text-sm text-center">{product.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex gap-2 mt-8">
        <button className="w-6 h-6 rounded-full bg-white border border-[#7B4F35] flex items-center justify-center text-[#7B4F35]">&lt;</button>
        {[1,2,3,4,5].map((num) => (
          <button
            key={num}
            className={`w-6 h-6 rounded-full ${num === 3 ? "bg-[#7B4F35] text-white" : "bg-white text-[#7B4F35]"} border border-[#7B4F35] flex items-center justify-center`}
          >
            {num}
          </button>
        ))}
        <button className="w-6 h-6 rounded-full bg-white border border-[#7B4F35] flex items-center justify-center text-[#7B4F35]">&gt;</button>
      </div>
    </section>
  )
}