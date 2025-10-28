"use client";

import Sidebar from "./components/Sidebar";
import Header from "./pages/Header";
// import ChartSection from "./components/ChartSection";
// import TopSection from "./components/TopSection";
// import StatsSection from "./components/StatsSection";
import Products from "./components/Products";
import { useState } from "react";
import MyInvoices from "./components/MyInvoices";
import CreateInvoice from "./components/CreateInvoice";
import Transactions from "./components/Transactions";
import SingleTransaction from "./components/SingleTransaction";
import AllUsers from "./components/AllUsers";
import Profile from "./components/Profile";
import RevenueStatistics from "./components/RevenueStatistics";
import PetStatistics from "./components/PetStatistics";
import Dashboard from "./components/Dashboard";
import ArticleManager from "./components/ArticleManager";
import PromotionManagement from "./components/promotions/PromotionManagement";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      // case "dashboard":
      //   return (
      //     <div>
      //       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
      //         <div className="lg:col-span-9">
      //           <ChartSection darkMode={darkMode} />
      //         </div>
      //         <div className="lg:col-span-3">
      //           <TopSection darkMode={darkMode} />
      //         </div>
      //       </div>
      //       <StatsSection darkMode={darkMode} />
      //     </div>
      //   );
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <Products />;
      case "billings":
        return <div>Billings Page</div>;
      case "revenue-statistics":
        return <RevenueStatistics />;
      case "pet-statistics":
        return <PetStatistics />;
      case "articles":
        return <ArticleManager />;

      case "invoices":
        return (
          <MyInvoices
            onCreateInvoice={() => setCurrentPage("create-invoice")}
          />
        );
      case "create-invoice":
        return <CreateInvoice onBack={() => setCurrentPage("invoices")} />;
      case "transactions":
        return (
          <Transactions
            onSelectTransaction={(tx) => {
              setSelectedTransaction(tx);
              setCurrentPage("single-transactions");
            }}
          />
        );
      case "single-transactions":
        return (
          <SingleTransaction
            transaction={selectedTransaction}
            onBack={() => setCurrentPage("transactions")}
          />
        );

      case "promotions":
        return <PromotionManagement />;

      case "users":
        return <AllUsers />;
      case "user-profiles":
        return <Profile />;
      case "pages":
        return <div>Pages</div>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Header spans full width at top */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Sidebar on left below header */}
      <Sidebar
        darkMode={darkMode}
        onItemClick={(path) => {
          setCurrentPage(path);
        }}
      />

      {/* Main content area with left margin for sidebar */}
      <main className="pt-20 pl-64">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
