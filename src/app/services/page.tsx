"use client";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

export default function ServicesPage() {
  const { data: services, isLoading, error } = trpc.service.getAll.useQuery();

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Dịch vụ của Petopia</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services?.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <h2 className="text-xl font-semibold text-center">{service.name}</h2>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{service.description}</p>
              <div className="font-bold text-[#C46C2B] text-lg mb-2">
                {service.price.toLocaleString()}₫
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-auto">
              <Button className="w-full bg-[#C46C2B] text-white">Đặt lịch</Button>
              <Link href={`/services/${service.id}`}>
                <Button className="w-full" variant="outline">Xem chi tiết</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}