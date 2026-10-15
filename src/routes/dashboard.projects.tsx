import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/projects")({
  head: () => ({ meta: [
    { title: "Projects / Work — FolioPro" }, { name: "description", content: "Present your work through clear stories of context, contribution, and outcome." },
    { property: "og:title", content: "Projects / Work — FolioPro" }, { property: "og:description", content: "Present your work through clear stories of context, contribution, and outcome." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="projects" />,
});
