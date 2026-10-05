import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/education")({
  head: () => ({ meta: [
    { title: "Education — FolioX" }, { name: "description", content: "Share your academic journey, specialist training, and learning milestones." },
    { property: "og:title", content: "Education — FolioX" }, { property: "og:description", content: "Share your academic journey, specialist training, and learning milestones." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="education" />,
});
