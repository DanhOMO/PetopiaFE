import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MainPage from "@/app/mainpage/page";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <Header />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="max-w-screen-xl mx-auto px-4">
          <MainPage />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

