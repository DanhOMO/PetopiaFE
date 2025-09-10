"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../hooks/useCart";


export default function CartPage() {  
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();


  return (
    <section className="bg-[#F5D7B7] min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#7B4F35] mb-8">Giỏ Hàng</h1>
      <div className="w-full max-w-3xl space-y-6">
        {cart.length === 0 ? (
          <Card className="p-8 text-center text-[#7B4F35] font-semibold">
            Giỏ hàng của bạn đang trống.
          </Card>
        ) : (
          cart.map((item) => (
            <Card
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-2xl shadow-md bg-white"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-xl object-cover border border-[#C46C2B]"
              />
              <div className="flex-1">
                <h2 className="font-bold text-lg text-[#7B4F35]">{item.name}</h2>
                <div className="text-[#C46C2B] font-semibold">
                  {item.price.toLocaleString()}₫
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">Số lượng:</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-[#C46C2B] text-[#C46C2B] px-2"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-[#C46C2B] text-[#C46C2B] px-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#C46C2B] text-[#C46C2B] hover:bg-[#C46C2B] hover:text-white transition"
                onClick={() => removeFromCart(item.id)}
              >
                Xóa
              </Button>
            </Card>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="w-full max-w-3xl mt-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-end">
          <div className="flex w-full justify-between items-center mb-4">
            <div className="text-xl font-bold text-[#7B4F35]">
              Tổng cộng:{" "}
              <span className="text-[#C46C2B]">
                {getTotal().toLocaleString()}₫
              </span>
            </div>
            <Button
              variant="outline"
              className="border-[#C46C2B] text-[#C46C2B] hover:bg-[#C46C2B] hover:text-white transition px-4 py-2"
              onClick={clearCart}
            >
              Xóa tất cả
            </Button>
          </div>
          <Link href="/checkout" className="w-full">
            <Button className="w-full bg-[#C46C2B] text-white font-bold rounded-lg hover:bg-[#7B4F35] transition">
              Thanh toán
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
