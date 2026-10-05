import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/links")({
  head: () => ({ meta: [
    { title: "Professional Links — FolioX" }, { name: "description", content: "Guide people to your work, profiles, writing, and professional destinations." },
    { property: "og:title", content: "Professional Links — FolioX" }, { property: "og:description", content: "Guide people to your work, profiles, writing, and professional destinations." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="links" />,
});
