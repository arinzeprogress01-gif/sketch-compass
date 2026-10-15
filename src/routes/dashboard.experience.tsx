import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/experience")({
  head: () => ({ meta: [
    { title: "Experience — FolioPro" }, { name: "description", content: "Showcase the professional roles and positions that shaped your journey." },
    { property: "og:title", content: "Experience — FolioPro" }, { property: "og:description", content: "Showcase the professional roles and positions that shaped your journey." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="experience" />,
});
