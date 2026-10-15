import { createFileRoute, Outlet } from "@tanstack/react-router";
import { WorkspaceProvider } from "@/components/dashboard/WorkspaceProvider";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [
    { title: "Workspace — FolioPro" }, { name: "description", content: "Build, manage, preview, and present your complete professional identity in FolioPro." },
    { property: "og:title", content: "Workspace — FolioPro" }, { property: "og:description", content: "Your private FolioPro professional workspace." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}),
  component: DashboardRoute,
});

function DashboardRoute() { return <WorkspaceProvider><DashboardLayout><Outlet /></DashboardLayout></WorkspaceProvider>; }