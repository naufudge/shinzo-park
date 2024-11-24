import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Roboto, Dancing_Script } from "next/font/google"
import "@/app/globals.css";
import NavBar from "@/components/NavBar";
import * as motion from "framer-motion/client"

export const metadata: Metadata = {
  title: "Shinzo Park",
  description: "The best theme park in Maldives!",
};

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins" })
const roboto = Roboto({ subsets: ["latin"], weight: ["500", "700", "900"], variable: "--font-roboto" })
const dancing = Dancing_Script({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dancing" })
// (≥o≤)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
      </head>
      <body
        className={`${poppins.variable} ${roboto.variable} ${dancing.variable} antialiased bg-slate-100 h-full`}
      > 
        <motion.div 
          className="sticky top-4 z-[100]"
          initial={{translateY: -100}}
          animate={{translateY: 0}}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 9,
            mass: 1,
            duration: 0.5,
          }}
        >
          <NavBar />
        </motion.div>
        {children}
      </body>
    </html>
  );
}
