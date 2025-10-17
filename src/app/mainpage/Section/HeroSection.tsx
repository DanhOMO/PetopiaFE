import { Button } from "@/components/ui/button"
import Image from "next/image"
import PetCannon from "../animate/PetCannon/PetCannon"

export default function HeroSection({onBookingClick}: {onBookingClick: () => void}) {
  return (
    <section className="bg-[#F5D7B7] py-10 px-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="flex-1">
          <p className="text-[#7B4F35] text-sm mb-4">Kết nối tâm hồn thú cưng</p>
          <h1 className="text-[#7B4F35] text-4xl md:text-5xl mb-6">
            Khởi đầu hành trình của mỗi thú cưng với tình yêu.
          </h1>
          <p className="text-[#7B4F35] mb-8">
            Chúng tôi hiểu rằng mỗi thú cưng đều xứng đáng được yêu thương và chăm sóc tận tình. Hãy để chúng tôi đồng hành cùng bạn trong việc mang lại những trải nghiệm tuyệt vời nhất cho người bạn bốn chân của bạn.
          </p>
          <Button className="bg-[#7B4F35] text-white rounded-full px-6 py-2"
          onClick={onBookingClick}
          >ĐẶT LỊCH NGAY</Button>
        </div>

        {/* Center - Pet Cannon */}
        <div className="flex-shrink-0">
          <PetCannon />
        </div>

        {/* Right content */}
        <div className="flex-1 flex justify-end">
          <Image src="/assets/iconAnimate/cat.gif" alt="Hero" width={400} height={200} className="rounded-xl" />
        </div>
      </div>
    </section>
  )
}