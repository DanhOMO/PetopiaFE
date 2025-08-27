"use client";

import MainPage from "@/app/mainpage/page";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
     

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="max-w-screen-xl mx-auto px-4">
          <MainPage />
        </div>
      </main>

     
    </div>
  );
}

