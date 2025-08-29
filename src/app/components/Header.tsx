"use client";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { 
  Search, 
  Phone, 
  ShoppingCart, 
  Menu, 
  Home,
  Heart,
  Settings,
  Newspaper,
  MessageCircle,
  Info
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          <span className="text-white text-lg lg:text-xl font-medium group-hover:text-orange-200 transition-colors duration-300">Petopia</span>
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
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: Search, Hotline, Cart, Avatar */}
      <div className="flex items-center gap-3 lg:gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white hover:bg-[#F5D7B7] transition-all duration-300 hover:scale-110 shadow-md group"
        >
          <Search size={20} className="text-[#7B4F35] group-hover:text-[#6B3F25]" />
        </Button>

        <div className="hidden md:flex items-center gap-3">
          <Image 
            src="/assets/icon/phucyen.png" 
            alt="Phone Icon" 
            width={24} 
            height={24} 
            className="object-contain"
          />
          <div className="text-white">
            <div className="text-white font-medium text-sm">Hotline:</div>
            <div className="font-bold text-base">092 532 37 37</div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="bg-[#A0694B] hover:bg-[#8B5A3C] rounded-full transition-all duration-300 hover:scale-110 shadow-lg relative group"
        >
          <ShoppingCart size={20} className="text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span>
        </Button>

        <Avatar className="transition-transform duration-300 hover:scale-110 ring-2 ring-white/30 hover:ring-white/50">
          <AvatarImage src="/avatar.jpg" alt="Avatar" />
          <AvatarFallback className="bg-[#F5D7B7] text-[#7B4F35] font-bold">U</AvatarFallback>
        </Avatar>

        {/* Mobile menu button */}
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
