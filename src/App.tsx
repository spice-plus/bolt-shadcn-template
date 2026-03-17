import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import HomePage from "@/pages/HomePage";
import Menu1Page from "@/pages/Menu1Page";
import Menu2Page from "@/pages/Menu2Page";
import ComponentsPage from "@/pages/ComponentsPage";

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu1" element={<Menu1Page />} />
            <Route path="/menu2" element={<Menu2Page />} />
            <Route path="/components" element={<ComponentsPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
