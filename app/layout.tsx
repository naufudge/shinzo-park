import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Roboto } from "next/font/google"
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Shinzo Park",
  description: "The best theme park in Maldives!",
};

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins" })
const roboto = Roboto({ subsets: ["latin"], weight: ["900"], variable: "--font-roboto" })
// (≥o≤)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased bg-slate-100`}
      >
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
