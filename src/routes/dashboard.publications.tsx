import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/publications")({
  head: () => ({ meta: [
    { title: "Publications — FolioX" }, { name: "description", content: "Collect your articles, research, books, reports, and published thinking." },
    { property: "og:title", content: "Publications — FolioX" }, { property: "og:description", content: "Collect your articles, research, books, reports, and published thinking." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="publications" />,
});
