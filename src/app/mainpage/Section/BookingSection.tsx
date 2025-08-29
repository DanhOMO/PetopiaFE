import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Image from "next/image"

export default function BookingSection() {
  return (
    <section className="relative bg-[#F5D7B7] py-10 px-4 flex flex-col items-center">
      <h2 className="text-[#7B4F35] text-3xl font-bold mb-6 text-center">
        Đặt Lịch Ngay
        <span className="block h-1 w-32 bg-[#7B4F35] mx-auto mt-2 rounded"></span>
      </h2>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent relative z-10">
        <div className="flex flex-col gap-4">
          <Input placeholder="Type here" className="bg-white" />
          <Input placeholder="Typing |" className="bg-white" />
          <Input placeholder="Typing |" className="bg-white" />
          <Input placeholder="Typing |" className="bg-white" />
        </div>
        <div className="flex flex-col gap-4">
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Dropdown option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="San Salvador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="San Salvador">San Salvador</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="MEJICANOS" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MEJICANOS">MEJICANOS</SelectItem>
              <SelectItem value="CIUDAD DELGADO">CIUDAD DELGADO</SelectItem>
              <SelectItem value="CUSCATANCINGO">CUSCATANCINGO</SelectItem>
              <SelectItem value="SOYAPANGO">SOYAPANGO</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="bg-[#7B4F35] text-white rounded-full px-8 py-2 mt-8">Đăng ký</Button>
      <Image
        src="/assets/icon/dog4.png"
        alt="Cat Icon"
        width={120}
        height={120}
        className="absolute top-4 right-0 md:right-12 z-0"
      />
    </section>
  )
}