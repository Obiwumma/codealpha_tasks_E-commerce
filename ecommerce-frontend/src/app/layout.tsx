import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "My E-Commerce Store",
  description: "E-Commerce store for buying your luxury jerseys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 🚨 FIX: Added overflow-x-hidden to prevent horizontal scroll bleed */}
      <body className="bg-gray-50 text-gray-900 antialiased overflow-x-hidden">
        <Navbar />
        
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}