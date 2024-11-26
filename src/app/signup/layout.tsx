"use client";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-between">
        <Header />
        {children}
      </div>
      <Footer />
    </main>
  );
}
