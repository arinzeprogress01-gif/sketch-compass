import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/services")({
  head: () => ({ meta: [
    { title: "Services — FolioX" }, { name: "description", content: "Communicate what you offer and how people can work with you." },
    { property: "og:title", content: "Services — FolioX" }, { property: "og:description", content: "Communicate what you offer and how people can work with you." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="services" />,
});
