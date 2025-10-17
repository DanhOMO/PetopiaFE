import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Image from "next/image"
import React from "react"
import { forwardRef } from "react"

const BookingSection = forwardRef<HTMLElement>((props, ref) => {
  const [activeTab, setActiveTab] = React.useState("booking");
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    note: ""
  });
  const [errors, setErrors] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: ""
  });

  const validate = () => {
    const newErrors: typeof errors = { name: "", phone: "", email: "", service: "" };
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ tên.";
    if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^0\d{9,10}$/.test(form.phone.trim())) newErrors.phone = "Số điện thoại không hợp lệ.";
    if (!form.email.trim()) newErrors.email = "Vui lòng nhập email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) newErrors.email = "Email không hợp lệ.";
    if (!form.service) newErrors.service = "Vui lòng chọn dịch vụ.";
    setErrors(newErrors);
    return Object.values(newErrors).every((v) => !v);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Đặt lịch thành công!");
    }
  };

  return (
    <section ref={ref} className="relative py-16 px-4 bg-gradient-to-br from-[#f8f4f0] to-[#ede7e0] flex flex-col items-center justify-center">
      {/* Background Images - Vị trí như cũ */}
      <Image
        src="/assets/iconAnimate/dog.gif"
        alt="Dog Icon"
        width={300}
        height={300}
        className="absolute top-10 left-5 md:left-12 z-0"
      />
      <Image
        src="/assets/icon/dog4.png"
        alt="Dog Icon"
        width={200}
        height={200}
        className="absolute top-4 right-0 md:right-12 z-0"
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#7B4F35]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#C46C2B]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl text-[#8B4513] mb-4 tracking-wide">Đặt Lịch Ngay</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi cung cấp các dịch vụ chăm sóc thú cưng chất lượng cao với đội ngũ chuyên gia giàu kinh nghiệm,
            đảm bảo sự an toàn và hạnh phúc cho những người bạn bốn chân của bạn.
          </p>
        </div>

        {/* Tab Navigation - Đặt Lịch */}
        <div className="flex justify-center mb-8">
          <h2 className="text-4xl text-[#8B4513] mb-4">Đặt Lịch</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Họ tên */}
            <div>
              <Input
                placeholder="Họ tên"
                className="h-14 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#7B4F35] focus:border-transparent"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
            </div>

            {/* Số điện thoại */}
            <div>
              <Input
                placeholder="Số điện thoại"
                className="h-14 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#7B4F35] focus:border-transparent"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div>
              <Input
                placeholder="Email"
                type="email"
                className="h-14 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#7B4F35] focus:border-transparent"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
            </div>

            {/* Chọn dịch vụ */}
            <div>
              <Select value={form.service} onValueChange={(v) => handleChange("service", v)}>
                <SelectTrigger className="h-14 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#7B4F35] focus:border-transparent text-gray-500">
                  <SelectValue placeholder="Chọn dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spa">Spa thú cưng</SelectItem>
                  <SelectItem value="nail">Cắt móng & vệ sinh tai</SelectItem>
                  <SelectItem value="checkup">Khám bệnh tổng quát</SelectItem>
                  <SelectItem value="hotel">Khách sạn thú cưng</SelectItem>
                  <SelectItem value="coloring">Nhuộm màu lông</SelectItem>
                </SelectContent>
              </Select>
              {errors.service && <span className="text-red-500 text-xs mt-1 block">{errors.service}</span>}
            </div>
          </div>

          {/* Ghi chú - Full Width */}
          <div className="mb-8">
            <textarea
              placeholder="Nội dung yêu cầu / Ghi chú"
              className="w-full min-h-[100px] px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#7B4F35] focus:border-transparent resize-none"
              value={form.note}
              onChange={(e) => handleChange("note", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-14 bg-[#7B4F35] text-white font-semibold text-lg rounded-xl hover:bg-[#5a3827] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Đặt lịch ngay
          </Button>
        </form>
      </div>
    </section>
  )
})
BookingSection.displayName = "BookingSection";
export default BookingSection;
