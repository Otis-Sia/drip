import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cartContext";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://afrodrip.co.ke"),
  title: {
    default: "Afrodrip Limited | Climate-Smart Agricultural Solutions",
    template: "%s | Afrodrip Limited",
  },
  alternates: {
    canonical: "https://afrodrip.co.ke",
  },
  description:
    "Empowering farmers with cutting-edge greenhouse systems, efficient irrigation, and climate-smart farming technologies across Kenya and East Africa.",
  keywords: [
    "greenhouse",
    "irrigation",
    "agriculture",
    "farming",
    "Afrodrip",
    "Kenya",
    "drip irrigation",
    "climate-smart agriculture",
    "greenhouse accessories",
    "farm infrastructure",
  ],
  authors: [{ name: "Afrodrip Limited" }],
  creator: "Afrodrip Limited",
  publisher: "Afrodrip Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://afrodrip.co.ke",
    siteName: "Afrodrip Limited",
    title: "Afrodrip Limited | Climate-Smart Agricultural Solutions",
    description:
      "Empowering farmers with cutting-edge greenhouse systems, efficient irrigation, and climate-smart farming technologies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Afrodrip Limited – Climate-Smart Agricultural Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afrodrip Limited | Climate-Smart Agricultural Solutions",
    description:
      "Empowering farmers with cutting-edge greenhouse systems, efficient irrigation, and climate-smart farming technologies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
