import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const email =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    "Jarvis.funstudio@gmail.com";

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">Contact</h1>
        <p className="text-sm text-neutral-300">
          For support, feedback, or takedown requests, email:
        </p>
        <a className="text-sm underline underline-offset-4" href={`mailto:${email}`}>
          {email}
        </a>
        <p className="text-xs text-neutral-500">
          Note: Do not include sensitive personal information in queries.
        </p>
      </div>
    </main>
  );
}
