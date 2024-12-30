"use client";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[length:300%_300%] bg-gradient-to-r from-[#b3193e] via-[#aa1124] via-30% to-[#220407] bg-right">
      <div className="flex flex-col justify-between">
        <Header />
        {children}
      </div>
      <Footer />
    </main>
  );
}
