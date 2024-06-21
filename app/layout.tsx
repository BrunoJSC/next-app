import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/sections/Footer";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ArticleJsonLd } from "next-seo";
import Head from "next/head";
import GoogleAdsense from "./google-adsense";
const inter = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "AutoNegocie",
  description: "Site de anúncios de veículos",
  openGraph: {
    title: "AutoNegocie",
    description: "Site de anúncios de veículos",
  },
  metadataBase: new URL("https://autonegocie.com.br"),
  icons: {
    icon: {
      url: "/logo.svg",
      href: "/logo.svg",
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />,
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <ArticleJsonLd
          title="AutoNegocie"
          authorName="AutoNegocie"
          useAppDir={true}
          url="https://autonegocie.com.br"
          images={["https://autonegocie.com.br/logo.svg"]}
          datePublished="2021-09-01T00:00:00Z"
          description="Site de anúncios de veículos"
        />
        <meta
          name="facebook-domain-verification"
          content="eca4hpikk17nstym5cd7hep5q0weew"
        />
      </Head>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          <link rel="icon" href="/logo.svg" sizes="any" />
          <Provider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </Provider>
        </body>
        <GoogleAnalytics gaId="G-XYZ" />
        <GoogleAdsense pId={process.env.NEXT_GOOGLE_ADS!} />
      </html>
    </>
  );
}
