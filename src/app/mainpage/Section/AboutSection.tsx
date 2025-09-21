/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image"
import { Lens } from "@/components/ui/lens"

const pets = [
  { id: 1, src: "/assets/icon/tc6.jpg", alt: "Golden Retriever", bg: "bg-[#F5D7B7]" },
  { id: 2, src: "/assets/icon/tc11.jpg", alt: "Orange Cat", bg: "bg-[#E8C4A0]" },
  { id: 3, src: "/assets/icon/tc12.jpg", alt: "Parrot", bg: "bg-[#F5D7B7]" },
  { id: 4, src: "/assets/icon/tc13.jpg", alt: "Rabbit", bg: "bg-[#E8C4A0]" },
  { id: 5, src: "/assets/icon/tc10.jpg", alt: "Hamster", bg: "bg-[#F5D7B7]" },
  { id: 6, src: "/assets/icon/tc15.jpg", alt: "Siamese Cat", bg: "bg-[#E8C4A0]" },
]

export default function AboutSection() {
  return (
    <section className="bg-[#F5D7B7] py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#7B4F35]/10"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-[#A0694B]/10"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[#8B5A3C]/10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-[#7B4F35]"></div>
            <span className="text-[#7B4F35] text-sm font-medium tracking-wider uppercase">Về chúng tôi</span>
            <div className="w-12 h-0.5 bg-[#7B4F35]"></div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#7B4F35] mb-6 text-balance">
            <span className="text-[#A0694B]">PETOPIA</span>
          </h1>

          <p className="text-xl text-[#8B5A3C] max-w-3xl mx-auto leading-relaxed text-pretty">
            Đồng hành cùng bạn trong hành trình chăm sóc những người bạn bốn chân
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#7B4F35] text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#7B4F35] mb-3">Kinh nghiệm 20 năm</h3>
                <p className="text-[#8B5A3C] leading-relaxed">
                  Là cơ sở chuyên cung cấp và chăm sóc thú cưng lớn nhất tại Việt Nam với 20 năm kinh nghiệm trong
                  ngành.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#7B4F35] text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#7B4F35] mb-3">Sứ mệnh của chúng tôi</h3>
                <p className="text-[#8B5A3C] leading-relaxed">
                  Trao hi vọng - gắn kết yêu thương - đồng hành - chia sẻ cùng mọi gia đình yêu thú cưng.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 border border-[#E8C4A0] rounded-2xl p-8 md:p-12 mb-16 shadow-sm">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#7B4F35] mb-6 text-balance">
              Kết nối yêu thương, chăm sóc tận tâm
            </h2>
            <p className="text-lg text-[#8B5A3C] leading-relaxed max-w-4xl mx-auto text-pretty">
              Chúng tôi tự hào là đơn vị tiên phong trong việc cung cấp dịch vụ chăm sóc thú cưng toàn diện, từ thức ăn
              dinh dưỡng, phụ kiện chất lượng đến dịch vụ chăm sóc sức khỏe chuyên nghiệp. Với đội ngũ chuyên gia giàu
              kinh nghiệm và tình yêu thương dành cho động vật, chúng tôi cam kết mang đến những trải nghiệm tốt nhất
              cho thú cưng của bạn.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-[#7B4F35] mb-4">Những người bạn đáng yêu</h3>
          <p className="text-[#8B5A3C]">Khám phá thế giới đa dạng của các loài thú cưng mà chúng tôi chăm sóc</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {pets.map((pet) => (
            <div key={pet.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
              <Lens
                zoomFactor={2}
                lensSize={100}
                isStatic={false}
                ariaLabel="Zoom Pet Image"
              >
                <img
                  src={pet.src || "/placeholder.svg"}
                  alt={pet.alt}
                  className="w-full h-full object-cover transition-transform duration-300 rounded-xl"
                />
              </Lens>
            </div>
          ))}
        </div>
        
      </div>
      
      {/* Decor Images */}
      <Image src="/assets/icon/cat1.png" alt="Cat Decor" width={200} height={200} className="absolute top-8 left-0 " />
      <Image src="/assets/icon/cat2.png" alt="Cat Decor" width={200} height={200} className="absolute top-8 right-[-80px] " />
      <Image src="/assets/iconAnimate/pet-care.gif" alt="Cat Decor" width={200} height={200} className="absolute bottom-100 right-[-20px] " />
    </section>
  )
}