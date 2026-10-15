import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/skills")({
  head: () => ({ meta: [
    { title: "Skills — FolioPro" }, { name: "description", content: "Organize the expertise, tools, languages, and strengths behind your work." },
    { property: "og:title", content: "Skills — FolioPro" }, { property: "og:description", content: "Organize the expertise, tools, languages, and strengths behind your work." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="skills" />,
});
