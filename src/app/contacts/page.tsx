"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F3E5D8] py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Thông tin liên hệ */}
        <Card className="bg-transparent shadow-none border-none">
          <CardHeader>
            <h1 className="text-5xl font-bold text-[#7B4F35] mb-4 text-center md:text-left">Liên Hệ</h1>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="flex items-center gap-2">
              <span>🌳</span>
              <span>Địa chỉ: 00 Quang Trung, phường 11 Gò Vấp</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💌</span>
              <span>Email: <a href="mailto:nguyencongdanhvippro@gmail.com" className="underline text-blue-600">nguyencongdanhvippro@gmail.com</a></span>
            </div>
            <div className="flex items-center gap-2">
              <span>☎️</span>
              <span>Liên hệ: 0352 903 906</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔎</span>
              <span>Website: <a href="https://anniepetsalon.com/" target="_blank" className="underline text-blue-600"></a></span>
            </div>
            <div>
              Thiết kế web: Danh. 0352903906
            </div>
          </CardContent>
        </Card>

        {/* Form liên hệ */}
        <Card className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Họ tên" />
              <Input placeholder="Điện thoại" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Địa chỉ" />
              <Input placeholder="Email" />
            </div>
            <Input placeholder="Chủ đề" />
            <textarea
              className="w-full border rounded-md p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#7B4F35]"
              placeholder="Nội dung"
            />
            <div className="flex gap-4">
              <Button type="submit" className="bg-[#C46C2B] text-white">Gửi</Button>
              <Button type="reset" variant="secondary">Nhập lại</Button>
            </div>
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