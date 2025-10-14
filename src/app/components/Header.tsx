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
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { 
  Search, 
  ShoppingCart, 
  Menu
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";

const navItems = [
  { href: "/", label: "TRANG CHỦ" },
  { href: "/pets", label: "THÚ CƯNG" },
  { href: "/services", label: "DỊCH VỤ" },
  { href: "/news", label: "TIN TỨC" },
  { href: "/contacts", label: "LIÊN HỆ" },
  { href: "/abouts", label: "GIỚI THIỆU" },
];

export default function Header() {
  const pathname = usePathname();
  const { getTotalQuantity } = useCart();

  // Giả lập trạng thái đăng nhập
  const [user, setUser] = React.useState<null | { name: string; avatar?: string }>(null);
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
      {/* Left: Logo & Navigation */}
      <div className="flex items-center gap-4 lg:gap-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/assets/imgs/logo.png"
            alt="Petopia Logo"
            width={48}
            height={48}
            className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-white rounded-full border-solid transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-white text-lg lg:text-xl font-medium group-hover:text-orange-200 transition-colors duration-300">
            Petopia
          </span>
        </Link>

        {/* Navigation - Hidden on mobile */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={`px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:bg-white/20 hover:text-[#F5D7B7] hover:scale-105 ${
                    pathname === item.href ? "bg-white/25 font-bold text-[#F5D7B7] shadow-lg" : ""
                  }`}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: Search, Hotline, Cart, Avatar */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white hover:bg-[#F5D7B7] transition-all duration-300 hover:scale-110 shadow-md group"
        >
          <Search size={20} className="text-[#7B4F35] group-hover:text-[#6B3F25]" />
        </Button>

        {/* Cart */}
        <Link href="/carts" className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="bg-[#A0694B] hover:bg-[#8B5A3C] rounded-full transition-all duration-300 hover:scale-110 shadow-lg relative group"
          >
            <ShoppingCart size={20} className="text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {getTotalQuantity()}
            </span>
          </Button>
        </Link>

        {/* User dropdown */}
        <div id="user-avatar-dropdown" className="relative flex items-center">
          <button
            className="flex items-center gap-1 focus:outline-none"
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
          className="lg:hidden text-white hover:bg-white/20 transition-all duration-300 rounded-xl"
        >
          <Menu size={24} />
        </Button>
      </div>
    </header>
  );
}
