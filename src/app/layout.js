import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "WarrantyAI - Never Miss a Warranty Again",
  description: "Smart AI assistant to track, manage, and remind users of all warranties, services, and coverage across electronics, home, vehicles, and appliances.",
  keywords: "warranty tracking, AI assistant, receipt management, warranty reminders, asset management",
  authors: [{ name: "WarrantyAI Team" }],
  creator: "WarrantyAI",
  publisher: "WarrantyAI",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased bg-space text-white overflow-x-hidden`}
      >
        <div className="min-h-screen bg-gradient-to-br from-space via-surface to-space">
          {children}
        </div>
      </body>
    </html>
  );
}
