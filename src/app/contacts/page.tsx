"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

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
    <div className="min-h-screen bg-[#F3E5D8] py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Thông tin liên hệ */}
        <Card className="bg-transparent shadow-none border-none">
          <CardHeader>
            <h1 className="text-5xl font-bold text-[#7B4F35] mb-4 text-center md:text-left">
              Liên Hệ
            </h1>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="flex items-center gap-2">
              <span>🌳</span>
              <span>Địa chỉ: 00 Quang Trung, phường 11 Gò Vấp</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💌</span>
              <span>
                Email:{" "}
                <a
                  href="mailto:nguyencongdanhvippro@gmail.com"
                  className="underline text-blue-600"
                >
                  nguyencongdanhvippro@gmail.com
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>☎️</span>
              <span>Liên hệ: 0352 903 906</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔎</span>
              <span>
                Website:{" "}
                <a
                  href="https://anniepetsalon.com/"
                  target="_blank"
                  className="underline text-blue-600"
                ></a>
              </span>
            </div>
            <div>Thiết kế web: Danh. 0352903906</div>
          </CardContent>
        </Card>

        {/* Form liên hệ */}
        <Card className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Họ tên"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="phone"
                placeholder="Điện thoại"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="address"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={handleChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              name="subject"
              placeholder="Chủ đề"
              value={form.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="content"
              placeholder="Nội dung"
              value={form.content}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#7B4F35]"
            />
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#C46C2B] text-white"
              >
                {loading ? "Đang gửi..." : "Gửi"}
              </Button>
              <Button type="reset" variant="secondary">
                Nhập lại
              </Button>
            </div>
            {status && <p className="text-sm text-green-600">{status}</p>}
          </form>
        </Card>
      </div>

      {/* Google Map */}
      <div className="max-w-5xl mx-auto mt-10 rounded-lg overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps?q=Quang+Trung,+phường+11,+Gò+Vấp&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
