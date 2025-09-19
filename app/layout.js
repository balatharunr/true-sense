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
  title: "TrueSense – Ultimate Scam Detection",
  description: "Deepfake and Phishing detection tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kaushanScript.variable} antialiased`}
      >
        <header className="bg-transparent absolute top-0 left-0 w-full z-50 pt-4 pb-2">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <img 
              src="/homepage/icon.png" 
              alt="True Sense Logo" 
              className="h-12 w-auto mr-3 -mt-2.5" 
            />
            <span className="font-bold text-5xl" style={{ 
              fontFamily: '"League Spartan", sans-serif',
              fontOpticalSizing: 'auto',
              fontWeight: 700,
              fontStyle: 'normal'
            }}>
              <span className="text-white">TRUE</span>
              <span className="text-red-600"> SENSE</span>
            </span>
          </div>
          {/* <hr className="border-blue-900 mt-3" /> */}
        </header>
        {children}
      </body>
    </html>
  );
}
