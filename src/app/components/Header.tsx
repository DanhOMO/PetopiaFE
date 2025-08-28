"use client";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
    <header className="w-full bg-[#7B4F35] flex items-center justify-between px-8 py-3">
      {/* Left: Logo & Navigation */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/imgs/logo.png"
            alt="Petopia Logo"
            width={48}
            height={48}
            className="h-12 w-12 border-2 border-white rounded-full border-solid"
          />
          <span className="text-white text-xl font-medium">Petopia</span>
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={`text-white hover: ${
                    pathname === item.href ? "font-bold " : ""
                  }`}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Dropdown Example */}
            {/* <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white flex items-center gap-1">
                  SẢN PHẨM <span>▼</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/products/product-1">Sản phẩm 1</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/product-2">Sản phẩm 2</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: Search, Hotline, Cart, Avatar */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white"
        >
          <Image
            src="/search-icon.svg"
            alt="Tìm kiếm"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </Button>

        <div className="flex items-center gap-2">
          <Image
            src="/pet-icon.png"
            alt="Pet"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div className="text-white text-sm">
            Hotline:
            <br />
            <span className="font-bold text-base">123 456 78 90</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="bg-[#C46C2B] rounded-full"
        >
          <Image
            src="/cart-icon.svg"
            alt="Giỏ hàng"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </Button>

        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
