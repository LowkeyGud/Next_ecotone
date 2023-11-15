/* eslint-disable camelcase */
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../styles/prism.css";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
  title: "Ecotone",
  description:
    "Online community for developers to learn and share their programming knowledge",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
  openGraph: {
    title: "Eco Tone",
    description:
      "Have a persistent code bug that just doesn't go away? Just post it to EcoTone and people around the globe will help you kill it.",
    url: "https://next-ecotone.vercel.app/",
    siteName: "Eco Tone",
    images: [
      {
        url: "https://i.ibb.co/xhnpKJ6/ecotone-image.png",
        width: 1200,
        height: 630,
        alt: "EcoTone Q&A",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco Tone",
    description:
      "Have a persistent code bug that just doesn't go away? Just post it to EcoTone and people around the globe will help you kill it.",
    // siteId: '',
    creator: "@LastSighh",
    // creatorId: '',
    images: ["https://i.ibb.co/xhnpKJ6/ecotone-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
