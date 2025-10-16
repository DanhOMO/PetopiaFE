"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    subject: "",
    content: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Hàm cập nhật form khi người dùng nhập
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Hàm submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gửi thất bại");
      const data = await res.json();

      setStatus(data.content || "Gửi thành công 🎉");
      setForm({
        name: "",
        phone: "",
        address: "",
        email: "",
        subject: "",
        content: "",
      }); // reset form
    } catch (err) {
      console.error(err);
      setStatus("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Contact Title */}
      <div className="relative py-24">
        <div className="absolute inset-0">
          <img 
            src="/assets/imgs/imgBackgroundTitle/bc-conatct.jpg"
            alt="Contact Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 
            className="text-center font-bold text-6xl text-white drop-shadow-lg"
          >
            Liên Hệ
          </h1>
        </div>
      </div>

      <div className="bg-[#f5d7b7]" style={{ height: '100px' }}></div>

      <div className="flex relative">
        {/* Location Info Overlay - Center between left and right */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-3/4 -translate-y-1/2 text-white p-6 rounded-lg shadow-lg max-w-xs z-20" style={{ marginLeft: '-25px', backgroundColor: '#1fa8be' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-lg" style={{ color: '#1fa8be' }}>📍</span>
          </div>
          <h3 className="text-xl font-bold">Vị Trí</h3>
        </div>
        <p className="text-sm italic mb-3">đến đây để gặp chúng tôi !</p>
        <div className="space-y-1 text-sm">
          <p>00 Quang Trung, phường 11</p>
          <p>Gò Vấp, TP.HCM</p>
          <p>Việt Nam</p>
        </div>
      </div>

        {/* Left side - Map */}
        <div className="w-1/2 relative min-h-screen">
        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps?q=Quang+Trung,+phường+11,+Gò+Vấp&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
        

        {/* Close button */}
        <button className="absolute top-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100">
          <span className="text-gray-600 text-xl">×</span>
        </button>

        {/* Zoom controls */}
        <div className="absolute bottom-8 right-8 flex flex-col bg-white rounded shadow-lg">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 border-b">
            <span className="text-gray-600 text-xl">+</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100">
            <span className="text-gray-600 text-xl">−</span>
          </button>
        </div>
      </div>

        {/* Right side - Contact Form */}
        <div className="w-1/2 flex flex-col justify-center p-12 relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/imgs/imgContact/contact_bg.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-md relative z-10">
          <h1 className="text-4xl font-bold text-[#7B4F35] mb-2">Liên Hệ Với Chúng Tôi!</h1>
          <p className="text-[#A0694B] italic mb-2">Hãy liên lạc với chúng tôi !</p>
          <p className="text-sm text-[#8B5A3C] mb-8">
            Nhập thông tin của bạn vào đây để gửi yêu cầu trực tiếp đến địa chỉ 
            email của chúng tôi.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Họ tên*"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4F35]/20 focus:border-[#7B4F35] shadow-none transition-all duration-200"
              />
              <Input
                name="phone"
                placeholder="Điện thoại*"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4F35]/20 focus:border-[#7B4F35] shadow-none transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                name="address"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4F35]/20 focus:border-[#7B4F35] shadow-none transition-all duration-200"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email*"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4F35]/20 focus:border-[#7B4F35] shadow-none transition-all duration-200"
              />
            </div>

            <div>
              <Input
                name="subject"
                placeholder="Chủ đề*"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4F35]/20 focus:border-[#7B4F35] shadow-none transition-all duration-200"
              />
            </div>

            <div>
              <textarea
                name="content"
                placeholder="Nội dung*"
                value={form.content}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4F35]/20 focus:border-[#7B4F35] shadow-none transition-all duration-200 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7B4F35] hover:bg-[#A0694B] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
            >
              {loading ? "Đang gửi..." : "Gửi Tin Nhắn"}
            </Button>

            {status && (
              <p className={`text-sm mt-2 ${
                status.includes("thành công") ? "text-green-600" : "text-red-600"
              }`}>
                {status}
              </p>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-[#8B5A3C] mb-1">
              <span className="font-semibold">Điện thoại :</span> <span className="font-semibold" style={{ color: '#2d8aa3' }}>0786012569</span>
            </p>
            <p className="text-[#8B5A3C]">
              <span className="font-semibold">Email :</span>{" "}
              <a href="mailto:duchaunguyen131@gmail.com" className="hover:underline font-semibold" style={{ color: '#2d8aa3', textUnderlineOffset: '3px' }}>
                duchaunguyen131@gmail.com
              </a>
            </p>
          </div>
        </div>
        </div>
      </div>
      <div className="bg-[#f5d7b7]" style={{ height: '100px' }}></div>

    </div>
  );
}
