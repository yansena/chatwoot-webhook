import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import './assets/css/tailwind.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Providers } from "./providers";

import Header from "@/components/Header";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

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
    <html lang="en" className="scroll-smooth">
      <body className={twMerge(inter.className, plusJakarta.className, 'text-base text-slate-900 dark:text-white bg-slate-50')}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
