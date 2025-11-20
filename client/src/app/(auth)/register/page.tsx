"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#C46C2B]">Đăng ký tài khoản</CardTitle>
          <p className="text-gray-500 text-sm mt-2">Tạo tài khoản mới để trải nghiệm Petopia!</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <Input id="name" type="text" placeholder="Nhập họ tên" required className="bg-gray-50" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input id="email" type="email" placeholder="Nhập email" required className="bg-gray-50" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <Input id="password" type="password" placeholder="Tạo mật khẩu" required className="bg-gray-50" />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
              <Input id="confirm" type="password" placeholder="Nhập lại mật khẩu" required className="bg-gray-50" />
            </div>
            <Button type="submit" className="w-full bg-[#C46C2B] text-white font-bold rounded-lg py-3 text-lg hover:bg-[#7B4F35] transition">Đăng ký</Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-[#C46C2B] font-semibold hover:underline">Đăng nhập</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
