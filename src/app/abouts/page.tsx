"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // shadcn/ui
import { trpc } from "../../utils/trpc"; // Sẵn sàng cho tương lai

export default function AboutPage() {
  const { data: services } = trpc.service.getAll.useQuery(); // Sử dụng khi có API

  return (
    <div className="about-container max-w-2xl mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold text-center mb-2">Giới thiệu về Petopia</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <img src="/imgs/logo.png" alt="Petopia Logo" className="mb-4 rounded-full shadow" style={{ width: 120 }} />
          <p className="text-center text-lg mb-2">
            Petopia là nền tảng kết nối cộng đồng yêu thú cưng, cung cấp các dịch vụ chăm sóc, mua bán, và chia sẻ kiến thức về thú cưng.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Giá trị nổi bật</h2>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            <li>Dịch vụ đa dạng: Spa, khám bệnh, mua bán thú cưng</li>
            <li>Đội ngũ chuyên nghiệp, tận tâm</li>
            <li>Cộng đồng thân thiện, chia sẻ kinh nghiệm</li>
          </ul>
          <div>
            {services?.map(s => (
              <div key={s.id}>{s.name}</div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Tầm quan trọng của việc sử dụng dịch vụ cho thú cưng</h2>
        </CardHeader>
        <CardContent>
          <p>
            Việc sử dụng dịch vụ chăm sóc chuyên nghiệp giúp thú cưng khỏe mạnh, phòng tránh bệnh tật và tăng tuổi thọ. Petopia cam kết mang lại trải nghiệm tốt nhất cho thú cưng và chủ nhân.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Đội ngũ phát triển</h2>
        </CardHeader>
        <CardContent>
          <p>
            Petopia được xây dựng bởi những người yêu động vật, mong muốn mang lại trải nghiệm tốt nhất cho cộng đồng.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Liên hệ</h2>
        </CardHeader>
        <CardContent>
          <p>Email: <a href="mailto:contact@petopia.vn" className="text-blue-600 underline">contact@petopia.vn</a></p>
          <p>Facebook: <a href="https://facebook.com/petopia" target="_blank" className="text-blue-600 underline">facebook.com/petopia</a></p>
        </CardContent>
      </Card>
    </div>
  );
}