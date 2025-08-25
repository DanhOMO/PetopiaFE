import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const services = [
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

export default function ServiceSection() {
  return (
    <section className="bg-[#F5D7B7] py-10 px-4 flex flex-col items-center relative">
      {/* Title */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          <span className="inline-block bg-[#7B4F35] rounded-full px-8 py-2 text-white text-2xl font-bold shadow">
            Dịch Vụ
          </span>
          {/* Có thể thêm hình nền hoặc icon ở đây nếu muốn */}
        </div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="hotel" className="w-full max-w-4xl">
        <TabsList className="flex justify-center gap-4 mb-8 bg-transparent">
          <TabsTrigger value="hotel" className="bg-[#7B4F35] text-white px-6 py-2 rounded-full font-semibold">Hotel Pets</TabsTrigger>
          <TabsTrigger value="dog" className="bg-white text-[#7B4F35] border border-[#7B4F35] px-6 py-2 rounded-full font-semibold">Spa Cho Cún</TabsTrigger>
          <TabsTrigger value="cat" className="bg-white text-[#7B4F35] border border-[#7B4F35] px-6 py-2 rounded-full font-semibold">Spa Cho Mèo</TabsTrigger>
        </TabsList>
        {/* Tab Content */}
        <TabsContent value="hotel">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-white rounded-xl shadow flex flex-col items-center py-6 px-4">
                <CardContent className="flex flex-col items-center">
                  <Image src={service.icon} alt="Service Icon" width={48} height={48} className="mb-2" />
                  <h3 className="text-[#7B4F35] font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-[#7B4F35] text-sm text-center">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dog">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Có thể thay đổi dữ liệu cho Spa Cho Cún nếu cần */}
            {services.map((service) => (
              <Card key={service.id} className="bg-white rounded-xl shadow flex flex-col items-center py-6 px-4">
                <CardContent className="flex flex-col items-center">
                  <Image src={service.icon} alt="Service Icon" width={48} height={48} className="mb-2" />
                  <h3 className="text-[#7B4F35] font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-[#7B4F35] text-sm text-center">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cat">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Có thể thay đổi dữ liệu cho Spa Cho Mèo nếu cần */}
            {services.map((service) => (
              <Card key={service.id} className="bg-white rounded-xl shadow flex flex-col items-center py-6 px-4">
                <CardContent className="flex flex-col items-center">
                  <Image src={service.icon} alt="Service Icon" width={48} height={48} className="mb-2" />
                  <h3 className="text-[#7B4F35] font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-[#7B4F35] text-sm text-center">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {/* Pagination */}
      <div className="flex gap-2 mt-8 justify-center">
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