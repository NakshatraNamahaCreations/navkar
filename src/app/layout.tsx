import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SitePreloader from "@/components/SitePreloader";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const interBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Navkar Global: Global Product Sourcing",
  description:
    "Navkar Global connects brands to the world's most capable manufacturers, with precision sourcing, quality assurance, and end-to-end supply chain management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interBody.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <SitePreloader />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <BackToTop />
      </body>
    </html>
  );
}
