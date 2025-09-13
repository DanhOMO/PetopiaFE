import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import Image from "next/image"
import React from "react"
import { forwardRef } from "react"
const BookingSection = forwardRef<HTMLElement>((props, ref) => {
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
      // Xử lý gửi form ở đây
      alert("Đặt lịch thành công!");
    }
  };

  return (
    <section ref={ref} className="relative bg-[#F5D7B7] py-10 px-4 flex flex-col items-center">
       <Image
        src="/assets/iconAnimate/dog.gif"
        alt="Dog Icon"
        width={300}
        height={300}
        className="absolute top-10 left-5 md:left-12 z-0"
      />
      <h2 className="text-[#7B4F35] text-3xl font-bold mb-6 text-center">
        Đặt Lịch Ngay
        <span className="block h-1 w-32 bg-[#7B4F35] mx-auto mt-2 rounded"></span>
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 gap-5 relative z-10">
        <div>
          <Input
            placeholder="Họ tên"
            className="h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#C46C2B]"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
        </div>
        <div>
          <Input
            placeholder="Số điện thoại"
            className="h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#C46C2B]"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
        </div>
        <div>
          <Input
            placeholder="Email"
            className="h-12 px-4 border rounded-lg focus:ring-2 focus:ring-[#C46C2B]"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
        </div>
        <div>
          <Select value={form.service} onValueChange={(v) => handleChange("service", v)}>
            <SelectTrigger className="h-12 px-4 border rounded-lg bg-white focus:ring-2 focus:ring-[#C46C2B]">
              <SelectValue placeholder="Chọn dịch vụ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spa">Spa thú cưng</SelectItem>
              <SelectItem value="hotel">Khách sạn thú cưng</SelectItem>
              <SelectItem value="grooming">Cắt tỉa lông</SelectItem>
              <SelectItem value="training">Huấn luyện</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && <span className="text-red-500 text-xs mt-1 block">{errors.service}</span>}
        </div>
        <textarea
          placeholder="Nội dung yêu cầu"
          className="w-full min-h-[80px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C46C2B]"
          value={form.note}
          onChange={(e) => handleChange("note", e.target.value)}
        />
        <Button type="submit" className="w-full h-12 bg-[#C46C2B] text-white font-bold rounded-lg hover:bg-[#7B4F35] transition mt-2">
          Đặt lịch ngay
        </Button>
      </form>
       <Image
         src="/assets/icon/dog4.png"
         alt="Dog Icon"
         width={200}
         height={200}
         className="absolute top-4 right-0 md:right-12 z-0"
       />
    </section>
  )
})
BookingSection.displayName = "BookingSection";
export default BookingSection;
