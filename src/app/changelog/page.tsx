import Shell from "@/components/Shell";
import ChangelogClient from "@/app/changelog/ChangelogClient";

export const metadata = {
  title: "Changelog — QuickQuery AI",
  description: "Product updates and release notes.",
};

export default function ChangelogPage() {
  return (
    <Shell title="Changelog" subtitle="What’s new in QuickQuery AI.">
      <ChangelogClient />
    </Shell>
  );
}
