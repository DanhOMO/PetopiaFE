// src/app/account/orders/page.tsx
"use client";

import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/app/components/loading';
import { Receipt, PackageSearch } from 'lucide-react';
import { Order } from '@/server/routers/order';


export default function OrderHistoryPage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { data: orders, isLoading: isOrdersLoading, error } = trpc.order.getByUser.useQuery(
    { userId: user?.userId || "" },
    { enabled: !!user } // Chỉ fetch khi đã có thông tin user
  );
  
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'DELIVERED': return 'default';
        case 'PROCESSING': return 'secondary';
        case 'SHIPPED': return 'outline';
        case 'CANCELLED': return 'destructive';
        default: return 'secondary';
    }
  }

  // --- Xử lý các trạng thái ---
  if (isAuthLoading || (user && isOrdersLoading)) {
    return <Loading />;
  }

  if (!user) {
    return <div className="text-center py-20">Vui lòng đăng nhập để xem lịch sử đơn hàng.</div>;
  }
  
  if (error) {
    return <div className="text-center text-red-500 py-10">Lỗi: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
    return (
        <div className="text-center py-20 max-w-2xl mx-auto flex flex-col items-center">
            <PackageSearch size={64} className="text-[#F5D7B7] mb-4" />
            <h1 className="text-2xl font-bold text-[#7B4F35] mb-4">Bạn chưa có đơn hàng nào</h1>
            <p className="text-gray-600 mb-6">Tất cả các đơn hàng của bạn sẽ được hiển thị ở đây. Hãy bắt đầu mua sắm nào!</p>
            <Link href="/pets">
                <Button className="bg-[#C46C2B] hover:bg-[#A0694B]">Khám phá thú cưng</Button>
            </Link>
        </div>
    );
  }

  // --- Giao diện chính ---
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Receipt className="h-8 w-8 text-[#7B4F35]" />
        <h1 className="text-3xl font-bold text-[#7B4F35]">Lịch sử Đơn hàng</h1>
      </div>
      <div className="space-y-6">
        {orders.map((order : Order) => (
          <Card key={order.orderId} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row justify-between items-center bg-gray-50/50 p-4 border-b">
              <div>
                <CardTitle className="text-base font-bold text-[#6B3F25]">
                  Mã đơn hàng: #{order.orderId}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                  Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <Badge variant={getStatusVariant(order.status)} className="capitalize text-xs">
                {order.status.toLowerCase()}
              </Badge>
            </CardHeader>
            <CardContent className="p-4">
              {/* Có thể thêm tóm tắt sản phẩm ở đây nếu muốn */}
              <p className="text-sm text-gray-600">Địa chỉ giao hàng: {order.addressId}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-gray-50/50 p-4">
               <div className="text-lg">
                <span className="text-gray-600">Tổng tiền: </span>
                <span className="font-bold text-[#C46C2B]">{order.totalAmount.toLocaleString()}₫</span>
               </div>
              <Link href={`/account/orders/${order.orderId}`}>
                <Button variant="outline" size="sm">Xem chi tiết</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}