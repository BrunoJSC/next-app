import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/sections/Footer";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ArticleJsonLd } from "next-seo";
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
        <meta charSet="utf-8" />,
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ArticleJsonLd
          title="AutoNegocie"
          authorName="AutoNegocie"
          useAppDir={true}
          url="https://autonegocie.com.br"
          images={["https://autonegocie.com.br/logo.svg"]}
          datePublished="2021-09-01T00:00:00Z"
          description="Site de anúncios de veículos"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Provider>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  );
}
