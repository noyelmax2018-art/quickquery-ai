"use client";

import Script from "next/script";

type Props = {
  /** e.g. "1234567890" (slot id from AdSense) */
  slot: string;
  className?: string;
};

/**
 * Minimal AdSense placeholder.
 * - Does nothing unless NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
 * - Safe to ship even before approval; it will render a placeholder.
 */
export default function AdSlot({ slot, className }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!client) {
    return (
      <div
        className={
          className ??
          "rounded-md border border-neutral-800 bg-neutral-900 p-4 text-xs text-neutral-400"
        }
      >
        Ad placeholder (set <code>NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> to enable)
      </div>
    );
  }

  return (
    <div className={className}>
      <Script
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
          client
        )}`}
        crossOrigin="anonymous"
      />

      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      <Script
        id={`adsbygoogle-${slot}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
}
