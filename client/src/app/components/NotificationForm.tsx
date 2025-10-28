"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NotificationForm() {
  return (
    <div className="max-3w-xl mx-auto py-10">
      <Card className="w-full shadow-xl border-0 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#C46C2B]">Tạo thông báo mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="notification_id" className="block text-sm font-medium text-gray-700 mb-1">Mã thông báo</label>
              <Input id="notification_id" type="text" placeholder="Nhập mã thông báo" required className="bg-gray-50" />
            </div>
            <div>
              <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">Mã người dùng</label>
              <Input id="user_id" type="text" placeholder="Nhập mã người dùng" required className="bg-gray-50" />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
              <Input id="title" type="text" placeholder="Nhập tiêu đề" required className="bg-gray-50" />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <textarea id="content" placeholder="Nhập nội dung thông báo" required className="bg-gray-50 w-full rounded-lg border border-gray-200 p-2 min-h-[80px]" />
            </div>
            <div>
              <label htmlFor="typeNote" className="block text-sm font-medium text-gray-700 mb-1">Loại thông báo</label>
              <Select required>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Chọn loại thông báo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORDER_UPDATE">Cập nhật đơn hàng</SelectItem>
                  <SelectItem value="NEW_PET">Thú cưng mới</SelectItem>
                  <SelectItem value="VACCINATION_REMINDER">Nhắc tiêm phòng</SelectItem>
                  <SelectItem value="PROMOTION">Khuyến mãi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input id="is_read" type="checkbox" className="h-4 w-4 text-[#C46C2B] border-gray-300 rounded" />
              <label htmlFor="is_read" className="text-sm text-gray-600">Đã đọc</label>
            </div>
            <Button type="submit" className="w-full bg-[#C46C2B] text-white font-bold rounded-lg py-3 text-lg hover:bg-[#7B4F35] transition">Tạo thông báo</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
