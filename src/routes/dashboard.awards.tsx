import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/awards")({
  head: () => ({ meta: [
    { title: "Awards & Achievements — FolioX" }, { name: "description", content: "Highlight recognition and meaningful professional milestones." },
    { property: "og:title", content: "Awards & Achievements — FolioX" }, { property: "og:description", content: "Highlight recognition and meaningful professional milestones." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="awards" />,
});
