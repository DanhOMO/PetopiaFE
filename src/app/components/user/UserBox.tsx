"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
    Heart, 
    Bookmark, 
    Receipt,
    Star, 
    UserCog, 
    ClipboardList
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; 

export default function UserBox() {
  const { user, login, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Card className="shadow-xl border rounded-xl">
        <div className="h-[320px] bg-gray-200 animate-pulse"></div>
      </Card>
    );
  }

  // GIAO DIỆN KHI ĐÃ ĐĂNG NHẬẬP
  if (user) {
    return (
      <Card className="shadow-xl border rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Banner */}
          <div className="bg-[#FDF5F0] p-4 flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-[#7B4F35]">
              <AvatarImage src="/avatar.jpg" alt={user.fullName || "User"} />
              <AvatarFallback className="bg-[#EADDD7] text-[#7B4F35] font-bold text-xl">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-[#7B4F35] text-lg leading-tight">Chào mừng trở lại!</p>
              <p className="text-sm text-gray-600 truncate">{user.fullName}</p>
            </div>
          </div>

          {/* Nút */}
          <div className="flex gap-3 p-4">
            <Link href="/account/user" className="flex-1">
              <Button className="w-full bg-[#7B4F35] hover:bg-[#6B3F25] text-white">
                <UserCog className="w-4 h-4 mr-2" />
                Tài khoản
              </Button>
            </Link>
            <Button onClick={logout} variant="outline" className="flex-1">
              Đăng xuất
            </Button>
          </div>

          {/* Tiện ích */}
          <div className="border-t">
            <ul className="divide-y">
              {user.role === 'ADMIN' && (
                <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  {/* Link cho admin (nếu có) */}
                  <span className="flex items-center gap-3 text-gray-700 font-medium">
                    <ClipboardList className="w-5 h-5 text-[#7B4F35]" /> Quản lý tin đăng
                  </span>
                </li>
              )}
              {/* === SỬA Ở ĐÂY === */}
              <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <Link href="/account/wishList" className="w-full flex items-center gap-3 text-gray-700 font-medium">
                  <Heart className="w-5 h-5 text-[#7B4F35]" /> Thú cưng đã thích
                </Link>
              </li>
              <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <span className="flex items-center gap-3 text-gray-700 font-medium">
                  <Bookmark className="w-5 h-5 text-[#7B4F35]" /> Tìm kiếm đã lưu
                </span>
              </li>
              {/* === VÀ SỬA Ở ĐÂY === */}
              <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <Link href="/account/orders" className="w-full flex items-center gap-3 text-gray-700 font-medium">
                  <Receipt className="w-5 h-5 text-[#7B4F35]" /> Lịch sử đơn hàng
                </Link>
              </li>
              <li className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
                <span className="flex items-center gap-3 text-gray-700 font-medium">
                  <Star className="w-5 h-5 text-[#7B4F35]" /> Đánh giá của tôi
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  // GIAO DIỆN KHI CHƯA ĐĂNG NHẬP (GIỮ NGUYÊN)
  return (
    <Card className="shadow-xl border rounded-xl overflow-hidden">
        <CardContent className="p-0">
            <div className="bg-[#FDF5F0] p-4 flex justify-between items-center">
                <div>
                    <p className="font-bold text-[#7B4F35] text-lg">Mua thì hời, bán thì lời.</p>
                    <p className="text-sm text-gray-600">Đăng nhập cái đã!</p>
                </div>
                <div className="text-4xl">🐝</div>
            </div>
            <div className="flex gap-3 p-4">
                <Link href="/register" className="flex-1">
                    <Button variant="outline" className="w-full border-[#7B4F35] text-[#7B4F35]">
                        Tạo tài khoản
                    </Button>
                </Link>
                <Button onClick={login} className="flex-1 bg-[#7B4F35] hover:bg-[#6B3F25]">
                    Đăng nhập
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}