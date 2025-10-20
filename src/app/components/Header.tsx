"use client";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import UserBox from "@/app/components/user/UserBox";

import { 
  Search, 
  ShoppingCart, 
  Menu,
  Heart
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// --- CONTEXT & HOOKS ---
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext"; // Sửa đường dẫn nếu cần

// --- UI COMPONENTS (shadcn/ui) ---
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // 1. THAY THẾ DROPDOWN BẰNG POPOVER
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";

// --- ICONS ---
import { Search, ShoppingCart, Menu } from "lucide-react";

// --- CUSTOM COMPONENTS ---
import UserBox from "@/app/components/user/UserBox"; // 2. IMPORT USERBOX CỦA BẠN

const leftLinks = [
  { label: "TRANG CHỦ", href: "/" },
  { label: "GIỚI THIỆU", href: "/abouts" },
  { label: "TIN TỨC", href: "/news" },
];

const rightLinks = [
  { label: "THÚ CƯNG", href: "/pets" },
  { label: "DỊCH VỤ", href: "/services" },
  { label: "LIÊN HỆ", href: "/contacts" },
];

// Sub-component cho Navigation trên Desktop (Không đổi)
function DesktopNav() {
  const pathname = usePathname();
  const { getTotalQuantity } = useCart();

  // Giả lập trạng thái đăng nhập
  const [user] = React.useState<null | { name: string; avatar?: string }>(null);
  const [openUserBox, setOpenUserBox] = React.useState(false);

  // Đóng dropdown khi click ngoài
  React.useEffect(() => {
    if (!openUserBox) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.closest("#user-avatar-dropdown")) setOpenUserBox(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openUserBox]);

  return (
    <header className="w-full bg-[#7B4F35] flex items-center justify-between px-4 lg:px-8 py-4 backdrop-blur-sm transition-all duration-300">
      {/* Left: Logo + All Navigation */}
      <div className="flex items-center gap-4 lg:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <Image
            src="/assets/imgs/logo.png"
            alt="Petopia Logo"
            width={40}
            height={40}
            className="w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {/* All Navigation Items */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-2 text-white hover:text-[#F5D7B7] transition-colors font-medium ${
                pathname === link.href ? "text-[#F5D7B7] font-bold" : ""
              }`}
            >
              <Image
                src="/assets/svg/chanmeo.svg"
                alt="Paw icon"
                width={20}
                height={20}
                className="w-5 h-5 filter brightness-0 invert transition-all duration-300 group-hover:brightness-0 group-hover:saturate-100 group-hover:invert-[53%] group-hover:sepia-100 group-hover:saturate-[4000%] group-hover:hue-rotate-[340deg] group-hover:brightness-105 group-hover:contrast-105"
              />
              {link.label}
            </Link>
          ))}
          
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-2 text-white hover:text-[#F5D7B7] transition-colors font-medium ${
                pathname === link.href ? "text-[#F5D7B7] font-bold" : ""
              }`}
            >
              <Image
                src="/assets/svg/chanmeo.svg"
                alt="Paw icon"
                width={20}
                height={20}
                className="w-5 h-5 filter brightness-0 invert transition-all duration-300 group-hover:brightness-0 group-hover:saturate-100 group-hover:invert-[53%] group-hover:sepia-100 group-hover:saturate-[4000%] group-hover:hue-rotate-[340deg] group-hover:brightness-105 group-hover:contrast-105"
              />
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white hover:bg-[#F5D7B7] transition-all duration-300 hover:scale-110 shadow-md group cursor-pointer"
        >
          <Search size={20} className="text-[#7B4F35] group-hover:text-[#6B3F25]" />
        </Button>

        {/* Heart/Wishlist */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white hover:bg-[#F5D7B7] transition-all duration-300 hover:scale-110 shadow-md group cursor-pointer"
        >
          <Heart size={20} className="text-[#7B4F35] group-hover:text-[#6B3F25]" />
        </Button>

        {/* Cart */}
        <Link href="/carts" className="relative cursor-pointer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white hover:bg-[#F5D7B7] transition-all duration-300 hover:scale-110 shadow-md group cursor-pointer"
          >
            <ShoppingCart size={20} className="text-[#7B4F35] group-hover:text-[#6B3F25]" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {getTotalQuantity()}
            </span>
          </Button>
        </Link>

        {/* User dropdown */}
        <div id="user-avatar-dropdown" className="relative flex items-center">
          <button
            className="flex items-center gap-1 focus:outline-none cursor-pointer"
            onClick={() => setOpenUserBox((v) => !v)}
            aria-label="Tài khoản"
            type="button"
          >
            <Avatar className="transition-transform duration-300 hover:scale-110 ring-2 ring-white/30 hover:ring-white/50">
              {user && user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarImage src="/avatar.jpg" alt="Avatar" />
              )}
              <AvatarFallback className="bg-[#F5D7B7] text-[#7B4F35] font-bold">
                {user ? user.name.charAt(0).toUpperCase() : <span className="text-xl">👤</span>}
              </AvatarFallback>
            </Avatar>
            <ChevronDown size={20} className="text-[#fff] ml-1" />
          </button>
          {openUserBox && (
            <div className="absolute right-0 w-80 max-w-xs"
            style={{ marginTop: '400px' }}>
              <UserBox />
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/20 transition-all duration-300 rounded-xl cursor-pointer"
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#7B4F35] text-white border-l-0 p-6">
        <div className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link href={item.href} className="text-lg font-medium py-2 px-4 rounded-md hover:bg-white/10">
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Sub-component cho menu người dùng ĐÃ ĐƯỢC CẬP NHẬT
function UserMenu() {
  const { user, login, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-10 w-24 bg-white/20 animate-pulse rounded-full" />;
  }

  // Nếu chưa đăng nhập, chỉ hiển thị nút Đăng nhập đơn giản
  if (!user) {
    return <Button onClick={login} className="bg-white/90 text-[#7B4F35] font-bold hover:bg-white">Đăng nhập</Button>;
  }

  // Nếu đã đăng nhập, hiển thị Avatar và Popover chứa UserBox
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 focus:outline-none ring-offset-2 ring-offset-[#7B4F35] focus-visible:ring-2 focus-visible:ring-white rounded-full">
          <Avatar className="ring-2 ring-white/50 hover:ring-white transition">
            <AvatarImage src={"/avatar.jpg"} alt={user.fullName || "User"} />
            <AvatarFallback className="bg-[#F5D7B7] text-[#7B4F35] font-bold">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-white font-medium">{user.fullName}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4 mt-2 p-0 border-0 shadow-2xl">
        {/* 3. ĐẶT USERBOX VÀO ĐÂY */}
        <UserBox />
      </PopoverContent>
    </Popover>
  );
}

// Component Header chính (Không đổi)
export default function Header() {
  const { getTotalQuantity } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#7B4F35]/80 flex items-center justify-between px-4 lg:px-8 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-4 lg:gap-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/assets/imgs/logo.png" alt="Petopia Logo" width={48} height={48} className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-white rounded-full transition-transform duration-300 group-hover:scale-110" />
          <span className="text-white text-lg lg:text-xl font-medium group-hover:text-orange-200">Petopia</span>
        </Link>
        <DesktopNav />
      </div>
      <div className="flex items-center gap-3 lg:gap-5">
        <Button variant="ghost" size="icon" className="rounded-full bg-white hover:bg-[#F5D7B7] shadow-md">
          <Search size={20} className="text-[#7B4F35]" />
        </Button>
        <Link href="/carts" className="relative">
          <Button variant="ghost" size="icon" className="bg-[#A0694B] hover:bg-[#8B5A3C] rounded-full shadow-lg">
            <ShoppingCart size={20} className="text-white" />
          </Button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-[#7B4F35]">
            {getTotalQuantity()}
          </span>
        </Link>
        <UserMenu />
        <MobileNav />
      </div>
    </header>
  );
}