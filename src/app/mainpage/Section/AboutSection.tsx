import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const pets = [
  { id: 1, src: "/assets/icon/dog1.png", alt: "Dog 1", bg: "bg-[#4DE1C1]" },
  { id: 2, src: "/assets/icon/dog2.png", alt: "Dog 2", bg: "bg-[#2B2B2B]" },
  { id: 3, src: "/assets/icon/cat1.png", alt: "Cat 1", bg: "bg-[#B8D8F7]" },
  { id: 4, src: "/assets/icon/dog3.png", alt: "Dog 3", bg: "bg-[#F7E3B8]" },
]

export default function AboutSection() {
  return (
    <section className="bg-[#F5D7B7] py-10 px-4 flex flex-col items-center relative">
      {/* Title */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          <span className="inline-block text-[#7B4F35] bg-white rounded-[40px] px-8 py-2 text-2xl font-bold shadow border-2 border-[#7B4F35]">
            Giới thiệu về <span className="italic font-semibold">Chúng Tôi</span><br />
            <span className="not-italic font-bold">PETOPIA</span>
          </span>
        </div>
      </div>
      {/* Description */}
      <div className="bg-[#7B4F35] rounded-[40px] px-8 py-6 text-white text-center max-w-2xl mb-8 shadow">
        Là cơ sở chung cung cấp phân phối và chăm sóc các bé pet lớn nhất tại Việt Nam. Tự hào 20 năm thành lập công ty đã gặt hái được nhiều thành công lớn cả trong và ngoài nước.<br />
        Trao hi vọng - gắn kết yêu thương - đồng hành - chia sẻ
      </div>
      {/* Pet Images */}
      <div className="flex flex-wrap gap-6 justify-center">
        {pets.map(pet => (
          <Card key={pet.id} className={`w-36 h-36 flex items-center justify-center overflow-hidden ${pet.bg} rounded-xl shadow`}>
            <CardContent className="flex items-center justify-center p-0">
              <Image src={pet.src} alt={pet.alt} width={100} height={100} className="object-contain" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Decor Images */}
      <Image src="/assets/icon/cat1.png" alt="Cat Decor" width={80} height={80} className="absolute top-8 left-0" />
      <Image src="/assets/icon/cat2.png" alt="Cat Decor" width={100} height={100} className="absolute top-8 right-0" />
      <Image src="/assets/icon/cat3.png" alt="Cat Decor" width={100} height={100} className="absolute bottom-8 right-0" />
    </section>
  )
}