import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/dashboard/ModulePage";

export const Route = createFileRoute("/dashboard/certifications")({
  head: () => ({ meta: [
    { title: "Certifications — FolioX" }, { name: "description", content: "Manage professional credentials and the evidence behind them." },
    { property: "og:title", content: "Certifications — FolioX" }, { property: "og:description", content: "Manage professional credentials and the evidence behind them." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <ModulePage moduleKey="certifications" />,
});
