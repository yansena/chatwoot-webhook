import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './assets/css/tailwind.css'
import "./assets/css/materialdesignicons.min.css"
import { Providers } from "./providers";

import Header from "@/components/Header";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webhook - Chawtoot",
  description: "Webhook for interactive chatw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={twMerge(inter.className, 'text-base text-slate-900 dark:text-white dark:bg-slate-900')}>
        <Header />
        {children}
      </body>
    </html>
  );
}
