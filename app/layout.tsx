import "./globals.css";
import { Nunito } from "next/font/google";
import type { Metadata } from "next";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MDRScore",
  description: "Personal Growth & Life Management System",
  icons: {
    icon: "/mdrscore-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={nunito.variable}>
      <body className="min-h-screen bg-white text-pelangi-abu-gelap antialiased">
        {children}
      </body>
    </html>
  );
}