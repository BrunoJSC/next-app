import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/sections/Footer";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "AutoNegocie",
  description: "Site de anúncios de veículos",
  icons: {
    icon: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Provider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
