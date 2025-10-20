// src/app/(personal)/layout.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Đảm bảo đường dẫn đúng

// Mảng các link cho sidebar để dễ quản lý
const sidebarNavItems = [
    { href: '/account', label: 'Thông tin tài khoản', icon: User },
    { href: '/orders', label: 'Lịch sử đơn hàng', icon: ShoppingBag },
    { href: '/wishlist', label: 'Danh sách yêu thích', icon: Heart },
];

function UserSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="w-64 flex-shrink-0 border-r pr-8">
            <nav className="flex flex-col space-y-2">
                {sidebarNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                                ${isActive 
                                    ? 'bg-[#7B4F35] text-white font-semibold' 
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
                <button
                    onClick={logout}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
                >
                    <LogOut className="h-5 w-5" />
                    Đăng xuất
                </button>
            </nav>
        </aside>
    );
}

export default function PersonalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Layout này có thể thêm logic kiểm tra đăng nhập chung ở đây nếu cần
    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="flex gap-12">
                <UserSidebar />
                <main className="flex-1">
                    {children} {/* children ở đây là nội dung của các file page.tsx */}
                </main>
            </div>
        </div>
    );
}