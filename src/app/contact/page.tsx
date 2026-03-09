import type { Metadata } from "next";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "Jarvis.funstudio@gmail.com";

  return (
    <Shell title="Contact" subtitle="Support, feedback, or takedown requests">
      <div className="space-y-4">
        <p className="text-sm text-neutral-300">Email:</p>
        <a
          className="inline-flex rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 underline underline-offset-4"
          href={`mailto:${email}`}
        >
          {email}
        </a>
        <p className="text-xs text-neutral-500">
          Note: Don’t include sensitive personal information in queries.
        </p>
      </div>
    </Shell>
  );
}
