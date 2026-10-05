import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/media")({
  head: () => ({ meta: [
    { title: "Media & Documents — FolioX" }, { name: "description", content: "Manage professional evidence without publishing anything by default." },
    { property: "og:title", content: "Media & Documents — FolioX" }, { property: "og:description", content: "Manage professional evidence without publishing anything by default." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="media" />,
});
