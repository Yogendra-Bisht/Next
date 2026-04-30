import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ChatWidget from "./components/ChatWidget";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yogendra Bisht | Full-Stack Developer",
  description: "Portfolio of Yogendra Bisht — MCA student specializing in Next.js, React, Java, and DSA. Explore my projects and get in touch!",
  keywords: ["Yogendra Bisht", "portfolio", "Next.js developer", "React", "Java", "full-stack"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
        <ChatWidget />
        <SpeedInsights />
      </body>
    </html>
  );
}
