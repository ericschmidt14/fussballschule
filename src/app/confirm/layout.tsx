"use client";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-between gap-8">
        <Header />
        {children}
      </div>
      <Footer />
    </main>
  );
}
