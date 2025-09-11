"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/Cart";

export default function CartPage() {
  const { cart, isReady, removeFromCart, updateQuantity, getTotal, clearCart } =
    useCart();

  if (!isReady) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">
          Đang tải giỏ hàng...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5D7B7] min-h-screen py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#7B4F35] mb-8">Giỏ Hàng</h1>
  <div className="w-full max-w-6xl mx-auto space-y-10 px-2 md:px-8">
        {cart.length === 0 ? (
          <Card className="p-10 text-center text-[#7B4F35] font-semibold shadow-lg bg-white/80">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/imgs/imgPet/animal-8165466_1280.jpg"
                alt="empty"
                width={150}
                height={150}
                className="opacity-60 mb-2"
              />
              <span className="text-xl">Giỏ hàng của bạn đang trống.</span>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-10">
            {cart.map((item: CartItem) => (
              <Card
                key={item.pet.pet_id}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 rounded-3xl shadow-2xl bg-white hover:shadow-2xl transition-all border-0 w-full"
              >
                {/* Bên trái */}
                <div className="flex items-start gap-6">
                  <div className="w-40 h-40 relative rounded-xl overflow-hidden border-2 border-[#C46C2B] bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.img || "/imgs/imgPet/animal-8165466_1280.jpg"}
                      alt={item.pet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <h2 className="font-bold text-2xl text-[#7B4F35]">
                      {item.pet.name}
                    </h2>
                    {item.pet.description && (
                      <p className="text-gray-600 text-base line-clamp-3">
                        {item.pet.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bên phải */}
                <div className="flex flex-col justify-between items-end text-lg">
                  {/* Nút xóa */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-100 self-end"
                    onClick={() => removeFromCart(item.pet.pet_id)}
                    aria-label="Xóa khỏi giỏ hàng"
                  >
                    ✕
                  </Button>

                  {/* Giá */}
                  <div className="flex items-center gap-3 mb-4">
                    {item.pet.discount_price ? (
                      <>
                        <span className="text-3xl font-extrabold text-[#C46C2B]">
                          {item.pet.discount_price.toLocaleString()}₫
                        </span>
                        <span className="text-gray-400 line-through text-lg">
                          {item.pet.price.toLocaleString()}₫
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-extrabold text-[#C46C2B]">
                        {item.pet.price.toLocaleString()}₫
                      </span>
                    )}
                  </div>

                  {/* Số lượng */}
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-base text-gray-600">Số lượng:</span>
                    <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                      <Button
                        variant="ghost"
                        className="w-10 h-10 flex items-center justify-center text-[#C46C2B] text-xl"
                        onClick={() =>
                          updateQuantity(
                            item.pet.pet_id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        −
                      </Button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        className="w-10 h-10 flex items-center justify-center text-[#C46C2B] text-xl"
                        onClick={() =>
                          updateQuantity(item.pet.pet_id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Tổng cộng + hành động */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-40">
          <div className="w-full max-w-4xl bg-white rounded-t-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C46C2B]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
              <span className="text-xl font-bold text-[#7B4F35]">
                Tổng cộng:
              </span>
              <span className="text-3xl font-extrabold text-[#C46C2B]">
                {getTotal().toLocaleString()}₫
              </span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-[#C46C2B] text-[#C46C2B] hover:bg-[#C46C2B] hover:text-white transition px-4 py-2 font-semibold"
                onClick={clearCart}
              >
                Xóa tất cả
              </Button>
              <Link href="/checkout" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#C46C2B] text-white font-bold rounded-lg hover:bg-[#7B4F35] transition px-8 py-2 text-lg">
                  Thanh toán
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
