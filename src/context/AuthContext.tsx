"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// Import type User từ router của bạn để đảm bảo dữ liệu nhất quán
import type { User } from '@/server/routers/user'; 


// DỮ LIỆU NGƯỜI DÙNG CỨNG ĐỂ TEST
const MOCK_USER: User = {
  userId: "U001",
  username: "danh_test",
  email: "danh.test@example.com",
  passwordHash: "hidden_for_security",
  fullName: "Phan Thanh Danh",
  phoneNumber: "0987654321",
  role: "CUSTOMER", // Bạn có thể đổi thành "ADMIN" để test quyền
  
  isActive: true,
  createdAt: new Date("2025-01-15T10:00:00Z").toISOString(),
  updatedAt: new Date().toISOString(),
  avatarUrl: "/assets/imgs/avatar/avatar1.png",
};

// Định nghĩa cấu trúc của Context
interface AuthContextType {
  user: User | null;      // Chứa thông tin người dùng nếu đã đăng nhập
  login: () => void;      // Hàm để "đăng nhập"
  logout: () => void;     // Hàm để "đăng xuất"
  isLoading: boolean;   // Trạng thái chờ khi kiểm tra localStorage lần đầu
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Component Provider để bọc toàn bộ ứng dụng
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chỉ chạy 1 lần khi app khởi động để kiểm tra session giả trong localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userSection');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Lỗi khi đọc session từ localStorage", error);
    } finally {
      setIsLoading(false); // Hoàn tất kiểm tra
    }
  }, []);

  const login = () => {
    localStorage.setItem('userSection', JSON.stringify(MOCK_USER));
    setUser(MOCK_USER);
  };

  const logout = () => {
    localStorage.removeItem('userSection');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>

        {children}
        
    </AuthContext.Provider>

  );
}

// Custom hook để sử dụng Context một cách tiện lợi
export function useAuth() {
   const context = useContext(AuthContext);
   if (context === undefined) {
     throw new Error('useAuth phải được dùng bên trong một AuthProvider');
   }
   return context;
 }