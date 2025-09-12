"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#C46C2B]">Đăng nhập tài khoản</CardTitle>
          <p className="text-gray-500 text-sm mt-2">Chào mừng bạn quay lại Petopia!</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input id="email" type="email" placeholder="Nhập email" required className="bg-gray-50" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <Input id="password" type="password" placeholder="Nhập mật khẩu" required className="bg-gray-50" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-[#C46C2B] border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">Ghi nhớ đăng nhập</label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#C46C2B] hover:underline">Quên mật khẩu?</Link>
            </div>
            <Button type="submit" className="w-full bg-[#C46C2B] text-white font-bold rounded-lg py-3 text-lg hover:bg-[#7B4F35] transition">Đăng nhập</Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-[#C46C2B] font-semibold hover:underline">Đăng ký ngay</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
