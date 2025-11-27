import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../data/siteConfig";
import Navbar from "../components/Navbar";
import ThreeBackground from "../components/ThreeBackground";
import Cursor from "../components/Cursor";
import AIChatbot from "../components/AIChatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata = {
  title: `${siteConfig.name} – AI Engineer Portfolio`,
  description: siteConfig.tagline,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} ${orbitron.variable} bg-black text-white antialiased selection:bg-cyan/30 selection:text-cyan relative overflow-x-hidden`}>
        <ThreeBackground />
        <Cursor />
        <Navbar />
        <AIChatbot />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
