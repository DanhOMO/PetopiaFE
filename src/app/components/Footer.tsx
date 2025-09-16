"use client";

import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe,
  FileText,
  Shield,
  CreditCard,
  Handshake,
  Heart,
  ShoppingCart,
  Gift
} from "lucide-react"
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  
  
  return (
    <footer className="gradient-primary text-white pt-12  animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Petopia Info */}
        <div className="animate-slide-up space-y-3">
          <h3 className="font-bold text-xl mb-4 text-orange-200">Petopia</h3>
          <div className="space-y-2 text-gray-100">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Địa chỉ: phường 11 Gò Vấp
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> Email: abc@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> Liên hệ: 092 532 37 37
            </p>
            <p className="flex items-center gap-2">
              <Globe size={16} /> Website: https://abc.com
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover-lift cursor-pointer p-2">
              <Image 
                src="/assets/icon/facebook.png" 
                alt="Facebook" 
                width={24} 
                height={24}
                className="object-contain"
              />
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover-lift cursor-pointer p-2">
              <Image 
                src="/assets/icon/tiktok.png" 
                alt="TikTok" 
                width={24} 
                height={24}
                className="object-contain"
              />
            </div>
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover-lift cursor-pointer p-2">
              <Image 
                src="/assets/icon/youtube.png" 
                alt="YouTube" 
                width={24} 
                height={24}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Chính Sách */}
        <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
          <h3 className="font-bold text-xl mb-4 text-orange-200">Chính Sách</h3>
          <ul className="space-y-3 text-gray-100">
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <FileText size={16} /> Chính sách hỗ trợ
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <Shield size={16} /> Chính sách bảo hành
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <CreditCard size={16} /> Chính sách thanh toán
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <Handshake size={16} /> Chính sách chăm sóc khách hàng
            </li>
          </ul>
        </div>

        {/* Góc Hỗ Trợ */}
        <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
          <h3 className="font-bold text-xl mb-4 text-orange-200">Góc Hỗ Trợ</h3>
          <ul className="space-y-3 text-gray-100">
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <Heart size={16} /> Giới thiệu về pet xinh
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <ShoppingCart size={16} /> Hướng dẫn mua hàng
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <Phone size={16} /> Liên hệ với chúng tôi
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <Gift size={16} /> Ưu đãi mua hàng
            </li>
          </ul>
        </div>

        {/* Hình ảnh bên phải */}
        <div className="hidden md:block animate-scale-in" style={{animationDelay: '0.3s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-300 rounded-lg rotate-3 opacity-50"></div>
            <div className="relative bg-white p-4 rounded-lg rotate-6 hover-lift transition-transform duration-500 hover:rotate-2">
              <div className="w-40 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg flex items-center justify-center text-6xl">
                🐱
              </div>
            </div>
          </div>
        </div>
      </div>
      
     
      {/* Google Map */}
      {pathname !== "/contacts" && (  
        <div className="w-full h-80 mt-10">
          <iframe
            src="https://www.google.com/maps?q=phường+11+Gò+Vấp&output=embed"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Petopia Location"
          />
        </div>
      )}
      
    </footer>
  )
} 