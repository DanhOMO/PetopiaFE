import Image from "next/image"

export default function Footer() {
  return (
    <footer className="gradient-primary text-white py-12 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Petopia Info */}
        <div className="animate-slide-up space-y-3">
          <h3 className="font-bold text-xl mb-4 text-orange-200">Petopia</h3>
          <div className="space-y-2 text-gray-100">
            <p className="flex items-center gap-2">
              <span>📍</span> Địa chỉ: phường 11 Gò Vấp
            </p>
            <p className="flex items-center gap-2">
              <span>📧</span> Email: abc@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <span>📞</span> Liên hệ: 092 532 37 37
            </p>
            <p className="flex items-center gap-2">
              <span>🌐</span> Website: https://abc.com
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover-lift cursor-pointer">
              📘
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover-lift cursor-pointer">
              🎵
            </div>
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover-lift cursor-pointer">
              📺
            </div>
          </div>
        </div>

        {/* Chính Sách */}
        <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
          <h3 className="font-bold text-xl mb-4 text-orange-200">Chính Sách</h3>
          <ul className="space-y-3 text-gray-100">
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              📋 Chính sách hỗ trợ
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              🛡️ Chính sách bảo hành
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              💳 Chính sách thanh toán
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              🤝 Chính sách chăm sóc khách hàng
            </li>
          </ul>
        </div>

        {/* Góc Hỗ Trợ */}
        <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
          <h3 className="font-bold text-xl mb-4 text-orange-200">Góc Hỗ Trợ</h3>
          <ul className="space-y-3 text-gray-100">
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              🐾 Giới thiệu về pet xinh
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              🛒 Hướng dẫn mua hàng
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              📞 Liên hệ với chúng tôi
            </li>
            <li className="hover:text-orange-200 transition-colors duration-300 cursor-pointer">
              🎁 Ưu đãi mua hàng
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
      
      {/* Copyright */}
      <div className="mt-12 pt-8 border-t border-white/20 text-center text-gray-200">
        <p>&copy; 2024 Petopia. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  )
}