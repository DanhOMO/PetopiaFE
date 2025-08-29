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
          <NavigationMenuList className="flex gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:text-orange-200 ${
                    pathname === item.href ? "bg-white/20 font-bold" : ""
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
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white hover:bg-gray-100 transition-all duration-300 hover:scale-110 shadow-md"
        >
          🔍
        </Button>

        <div className="hidden md:flex items-center gap-2">
          <div className="text-2xl">📞</div>
          <div className="text-white text-xs lg:text-sm">
            Hotline:
            <br />
            <span className="font-bold text-sm lg:text-base">123 456 78 90</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="bg-[#C46C2B] hover:bg-[#B85B1F] rounded-full transition-all duration-300 hover:scale-110 shadow-md"
        >
          🛒
        </Button>

        <Avatar className="transition-transform duration-300 hover:scale-110">
          <AvatarImage src="/avatar.jpg" alt="Avatar" />
          <AvatarFallback className="bg-white text-[#7B4F35] font-bold">U</AvatarFallback>
        </Avatar>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/10 transition-colors duration-300"
        >
          ☰
        </Button>
      </div>
    </header>
  );
}
