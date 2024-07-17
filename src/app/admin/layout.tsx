"use client";
import { SessionProvider } from "next-auth/react";
import Header from "./components/header";
import Footer from "../components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="min-h-screen flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <Header />
          {children}
        </div>
        <Footer />
      </main>
    </SessionProvider>
  );
}
