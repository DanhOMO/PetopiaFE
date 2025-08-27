"use client";
import HeroSection from "./Section/HeroSection"
import ServiceSection from "./Section/ServiceSection"
import BookingSection from "./Section/BookingSection"
import ProductSection from "./Section/ProductSection"
import AboutSection from "./Section/AboutSection"

export default function MainPage() {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        backgroundImage: "url('/assets/imgs/bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <HeroSection />
      <ServiceSection />
      <BookingSection />
      <ProductSection />
      <AboutSection />
    </main>
  )
}