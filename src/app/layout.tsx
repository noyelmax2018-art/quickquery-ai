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

export const metadata: Metadata = {
  title: {
    default: "QuickQuery AI",
    template: "%s · QuickQuery AI",
  },
  description: "Fast, concise AI answers with optional citations.",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
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
