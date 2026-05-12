import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import icon from "@/public/repair-shop.png";

export const metadata: Metadata = {
  title: "አቤ ጋራዥ ",
  description:
    "Full-service garage management and vehicle maintenance platform based in Ethiopia.",

  icons: {
    icon: icon.src,
  },

  openGraph: {
    title: "አቤ ጋራዥ ",
    description:
      "Modern garage management and vehicle service platform built with Next.js and MongoDB.",
    url: "https://abe-garage-app.vercel.app",
    siteName: "Abe Garage",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abe Garage Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "አቤ ጋራዥ | Abe Garage",
    description: "Modern garage management and vehicle service platform.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
