import { Button } from "@/components/ui/button"
import Image from "next/image"
import PetCannon from "../animate/PetCannon/PetCannon"

export default function HeroSection({onBookingClick}: {onBookingClick: () => void}) {
  return (
    <section className="bg-[#F5D7B7] py-10 px-10">
      <div className="flex flex-col  md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="flex-1">
          <h1 className="text-[#7B4F35] text-3xl font-bold mb-2">Thú cưng đáng yêu<br />Bạn của mọi nhà</h1>
          <p className="text-[#7B4F35] mb-4">Nâng niu thú cưng – Trao trọn yêu thương từ ngôi nhà bạn!</p>
          <Button className="bg-[#7B4F35] text-white rounded-full px-6 py-2"
          onClick={onBookingClick}
          >Đặt lịch ngay!!!</Button>
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