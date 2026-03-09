import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const resolvedSiteUrl = (siteUrl ?? "https://quickquery-ai.pages.dev").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(resolvedSiteUrl),
  title: {
    default: "QuickQuery AI",
    template: "%s · QuickQuery AI",
  },
  description: "Premium, fast, concise AI answers — with optional citations.",
  applicationName: "QuickQuery AI",
  openGraph: {
    type: "website",
    url: resolvedSiteUrl,
    title: "QuickQuery AI",
    description: "Premium, fast, concise AI answers — with optional citations.",
    siteName: "QuickQuery AI",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "QuickQuery AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickQuery AI",
    description: "Premium, fast, concise AI answers — with optional citations.",
    images: ["/og.svg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleSiteVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
    "mRVVOITmtxMev-nCATEMULyHrI-lZikDVUbORGEk4gY";

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content={googleSiteVerification}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
