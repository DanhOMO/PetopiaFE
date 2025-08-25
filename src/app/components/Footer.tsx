import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#7B4F35] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Petopia Info */}
        <div>
          <h3 className="font-bold text-lg mb-2">Petopia</h3>
          <p className="mb-1">Địa chỉ: phường 11 Gò Vấp</p>
          <p className="mb-1">Email: abc@gmail.com</p>
          <p className="mb-1">Liên hệ: 092 532 37 37</p>
          <p className="mb-3">Website: https://abc.com</p>
          <div className="flex gap-3 mt-2">
            <Image src="/assets/icon/facebook.png" alt="Facebook" width={36} height={36} />
            <Image src="/assets/icon/tiktok.png" alt="TikTok" width={36} height={36} />
            <Image src="/assets/icon/youtube.png" alt="YouTube" width={36} height={36} />
          </div>
        </div>
        {/* Chính Sách */}
        <div>
          <h3 className="font-bold text-lg mb-2">Chính Sách</h3>
          <ul className="space-y-1">
            <li>Chính sách hỗ trợ</li>
            <li>Chính sách bảo hành</li>
            <li>Chính sách thanh toán</li>
            <li>Chính sách chăm sóc khách hàng</li>
          </ul>
        </div>
        {/* Góc Hỗ Trợ */}
        <div>
          <h3 className="font-bold text-lg mb-2">Góc Hỗ Trợ</h3>
          <ul className="space-y-1">
            <li>Giới thiệu về pet xinh</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Liên hệ với chúng tôi</li>
            <li>Ưu đãi mua hàng</li>
          </ul>
        </div>
        {/* Hình ảnh bên phải */}
        <div className="hidden md:block">
          <Image
            src="/assets/imgs/footer-img.png"
            alt="Footer Image"
            width={180}
            height={140}
            className="rounded-lg rotate-6 shadow-lg"
          />
        </div>
      </div>
    </footer>
  )
}