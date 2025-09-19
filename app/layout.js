import { Geist, Geist_Mono } from "next/font/google";
import { Kaushan_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kaushanScript = Kaushan_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-kaushan-script',
});

export const metadata = {
  title: "CyberWare – Ultimate Scam Detection",
  description: "Deepfake and Phishing detection tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kaushanScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
