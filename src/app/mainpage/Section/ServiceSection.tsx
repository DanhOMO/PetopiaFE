import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const hotelServices = [
  {
    id: 1,
    icon: "/assets/icon/pet-house-5792.png",
    title: "1-8kg : Theo Ngày",
    desc: "Đưa Pet yêu ghé Petopia để trải nghiệm dịch vụ Spa chất lượng...",
    color: "bg-[#A0694B]"
  },
  {
    id: 2,
    icon: "/assets/icon/pets-9555.png",
    title: "1-8kg : Sáng - Chiều",
    desc: "Đưa Pet yêu ghé Petopia để trải nghiệm dịch vụ Spa chất lượng...",
    color: "bg-[#A0694B]"
  },
  {
    id: 3,
    icon: "/assets/icon/pet-3189.png",
    title: "1-8kg : Theo Tháng",
    desc: "Đưa Pet yêu ghé Petopia để trải nghiệm dịch vụ Spa chất lượng...",
    color: "bg-[#A0694B]"
  },
  {
    id: 4,
    icon: "/assets/icon/pet-care-5012.png",
    title: "8-15kg : Theo Ngày",
    desc: "Đưa Pet yêu ghé Petopia để trải nghiệm dịch vụ Spa chất lượng...",
    color: "bg-[#A0694B]"
  },
  {
    id: 5,
    icon: "/assets/icon/dog-9306.png",
    title: "8-15kg : Sáng - Chiều",
    desc: "Đưa Pet yêu ghé Petopia để trải nghiệm dịch vụ Spa chất lượng...",
    color: "bg-[#A0694B]"
  },
  {
    id: 6,
    icon: "/assets/icon/anh-chup-man-hinh-2024-06-26-luc-223800-6080-removebg-preview-5604.png",
    title: "15-21kg : Theo Ngày",
    desc: "Đưa Pet yêu ghé Petopia để trải nghiệm dịch vụ Spa chất lượng...",
    color: "bg-[#A0694B]"
  },
]

const services = hotelServices

export default function ServiceSection() {
  return (
    <section className="bg-[#F5D7B7] py-10 px-4 flex flex-col items-center relative">
      {/* Title */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative">
          <span className="inline-block bg-[#7B4F35] rounded-full px-10 py-3 text-white text-3xl font-bold shadow-lg border-4 border-white">
            Dịch Vụ
          </span>
        </div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="hotel" className="w-full max-w-6xl">
        <TabsList className="flex justify-center gap-4 mb-8 bg-transparent">
          <TabsTrigger 
            value="hotel" 
            className="data-[state=active]:bg-[#7B4F35] data-[state=active]:text-white bg-white text-[#7B4F35] border-2 border-[#7B4F35] px-6 py-2 rounded-full font-semibold hover:bg-[#7B4F35] hover:text-white transition-all duration-300"
          >
            Hotel Pets
          </TabsTrigger>
          <TabsTrigger 
            value="dog" 
            className="data-[state=active]:bg-[#7B4F35] data-[state=active]:text-white bg-white text-[#7B4F35] border-2 border-[#7B4F35] px-6 py-2 rounded-full font-semibold hover:bg-[#7B4F35] hover:text-white transition-all duration-300"
          >
            Spa Cho Cún
          </TabsTrigger>
          <TabsTrigger 
            value="cat" 
            className="data-[state=active]:bg-[#7B4F35] data-[state=active]:text-white bg-white text-[#7B4F35] border-2 border-[#7B4F35] px-6 py-2 rounded-full font-semibold hover:bg-[#7B4F35] hover:text-white transition-all duration-300"
          >
            Spa Cho Mèo
          </TabsTrigger>
        </TabsList>
        {/* Tab Content */}
        <TabsContent value="hotel">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelServices.map((service) => (
              <Card key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100">
                <CardContent className="flex flex-col items-center p-6">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4 shadow-md group`}>
                    <Image 
                      src={service.icon} 
                      alt="Service Icon" 
                      width={40} 
                      height={40} 
                      className="transition-transform duration-500 group-hover:[transform:rotateY(180deg)]"
                    />
                  </div>
                  <h3 className="text-[#7B4F35] font-bold text-xl mb-2 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dog">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100">
                <CardContent className="flex flex-col items-center p-6">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4 shadow-md group`}>
                    <Image 
                      src={service.icon} 
                      alt="Service Icon" 
                      width={40} 
                      height={40} 
                      className="transition-transform duration-500 group-hover:[transform:rotateY(180deg)]"
                    />
                  </div>
                  <h3 className="text-[#7B4F35] font-bold text-xl mb-2 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-sm text-center mb-3 leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cat">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100">
                <CardContent className="flex flex-col items-center p-6">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-4 shadow-md group`}>
                    <Image 
                      src={service.icon} 
                      alt="Service Icon" 
                      width={40} 
                      height={40} 
                      className="transition-transform duration-500 group-hover:[transform:rotateY(180deg)]"
                    />
                  </div>
                  <h3 className="text-[#7B4F35] font-bold text-xl mb-2 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-sm text-center mb-3 leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
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