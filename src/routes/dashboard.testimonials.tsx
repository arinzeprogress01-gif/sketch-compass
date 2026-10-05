import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/testimonials")({
  head: () => ({ meta: [
    { title: "Testimonials — FolioX" }, { name: "description", content: "Curate professional recommendations with clear relationship context." },
    { property: "og:title", content: "Testimonials — FolioX" }, { property: "og:description", content: "Curate professional recommendations with clear relationship context." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="testimonials" />,
});
