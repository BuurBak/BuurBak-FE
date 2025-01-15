import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ErrorToast from "./Components/ErrorToast";
import Footer from "./Components/Footer";
import Navbar from "./Components/NavBar";
import SuccessToast from "./Components/SuccesToast";
import { Toaster } from "./Components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuurBak",
  description: "Aanhanger huur en verhuur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
        <SuccessToast />
        <ErrorToast />
      </body>
    </html>
  );
}
