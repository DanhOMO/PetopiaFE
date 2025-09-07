import { Button } from "@/components/ui/button"
import Image from "next/image"
import IconEffect from "../animate/IconEffect"

export default function HeroSection() {
  return (
    <section className="bg-[#F5D7B7] py-10 px-4 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h1 className="text-[#7B4F35] text-3xl font-bold mb-2">Thú cưng đáng yêu<br />Bạn của mọi nhà</h1>
        <p className="text-[#7B4F35] mb-4">Nâng niu thú cưng – Trao trọn yêu thương từ ngôi nhà bạn!</p>
        <Button className="bg-[#7B4F35] text-white rounded-full px-6 py-2">Xem Thêm...</Button>
      </div>
      <div>
        <IconEffect />
      </div>
      <div className="flex items-center gap-4">
        <Image src="/assets/icon/dog3.png" alt="Hero" width={300} height={200} className="rounded-xl" />
      </div>
    </section>
  )
}