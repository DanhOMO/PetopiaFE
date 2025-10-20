// src/app/(personal)/account/page.tsx
"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useAuth } from "@/context/AuthContext"; 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/app/components/loading";

// Đây chính là component UserProfilePage mà chúng ta đã làm
export default function AccountPage() {
  const { user: authUser, isLoading: isAuthLoading } = useAuth();
  const userId = authUser?.userId;

  const { data: user, isLoading: isUserLoading, error } = trpc.user.getById.useQuery(
    { userId: userId! },
    { enabled: !!userId }
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveChanges = () => {
    console.log("Saving data:", formData);
    setIsEditing(false);
  };

  if (isAuthLoading || (userId && isUserLoading)) return <Loading />;
  
  if (!authUser) {
     return <div className="text-center text-gray-500 py-10">Vui lòng đăng nhập để xem thông tin tài khoản.</div>;
  }
  
  if (error) return <div className="text-center text-red-500 py-10">Lỗi: {error.message}</div>;
  if (!user) return <div className="text-center text-gray-500 py-10">Không tìm thấy người dùng.</div>;

  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Thông tin cá nhân</h1>
        
        {/* THẺ THÔNG TIN CÁ NHÂN */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Chi tiết</CardTitle>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="username">Tên đăng nhập</Label>
                    <p id="username" className="font-semibold text-gray-700">{user.username}</p>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <p id="email" className="font-semibold text-gray-700">{user.email}</p>
                </div>
            </div>
            <div>
              <Label htmlFor="fullName">Họ và tên</Label>
              {isEditing ? (
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
              ) : (
                <p className="font-semibold text-gray-700">{user.fullName || "Chưa cập nhật"}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              {isEditing ? (
                <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
              ) : (
                <p className="font-semibold text-gray-700">{user.phoneNumber || "Chưa cập nhật"}</p>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-4">
                <Button onClick={handleSaveChanges}>Lưu thay đổi</Button>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Hủy</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* THẺ ĐIỂM THƯỞNG VÀ THÔNG TIN KHÁC */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin thành viên</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div>
              <Label>Vai trò</Label>
              <div>
                <Badge variant={user.role === "ADMIN" ? "destructive" : "secondary"}>{user.role}</Badge>
              </div>
            </div>
             <div>
              <Label>Ngày tham gia</Label>
              <p className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}