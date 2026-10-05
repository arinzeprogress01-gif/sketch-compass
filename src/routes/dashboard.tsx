import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Workspace — FolioX" }, { name: "description", content: "Build, manage, preview, and present your complete professional identity in FolioX." },
    { property: "og:title", content: "Workspace — FolioX" }, { property: "og:description", content: "Your private FolioX professional workspace." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}),
  component: DashboardRoute,
});

function DashboardRoute() { return <DashboardLayout><Outlet /></DashboardLayout>; }