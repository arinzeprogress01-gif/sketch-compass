import { createContext, useContext, useState, type ReactNode } from "react";
import { modules, viewer, type ModuleKey, type ModuleDefinition } from "@/data/dashboard";

export type WorkspaceEntry = ModuleDefinition["entries"][number] & { id: string; fields: Record<string, string> };
export type WorkspaceProfile = { name: string; headline: string; email: string; phone: string; location: string; about: string; photo: string; visibility: "Public" | "Private" };
export type PortfolioPreferences = { username: string; theme: "Ink" | "Light" | "Warm"; publicProfile: boolean; showLinks: boolean; showEvidence: boolean; discoverable: boolean };
function seedEntries(): Record<ModuleKey, WorkspaceEntry[]> {
  return Object.fromEntries(Object.entries(modules).map(([key, definition]) => [key, definition.entries.map((entry, index) => ({ ...entry, id: `${key}-${index}`, fields: Object.fromEntries(definition.fields.map((field, i) => [field.key, i === 0 ? entry.title : field.key === "description" || field.key === "testimonial" ? entry.detail : i === 1 ? entry.meta.split(" · ")[0] ?? "" : ""])) }))])) as Record<ModuleKey, WorkspaceEntry[]>;
}
const initialProfile: WorkspaceProfile = { name: viewer.fullName, headline: viewer.headline, email: viewer.email, phone: "", location: "Lagos, Nigeria", about: "I am a product designer and researcher focused on making complex public services understandable, inclusive, and human.", photo: "", visibility: "Public" };
type Workspace = { entries: Record<ModuleKey, WorkspaceEntry[]>; setEntries: React.Dispatch<React.SetStateAction<Record<ModuleKey, WorkspaceEntry[]>>>; profile: WorkspaceProfile; setProfile: React.Dispatch<React.SetStateAction<WorkspaceProfile>>; portfolio: PortfolioPreferences; setPortfolio: React.Dispatch<React.SetStateAction<PortfolioPreferences>>; published: boolean; setPublished: React.Dispatch<React.SetStateAction<boolean>> };
const WorkspaceContext = createContext<Workspace | null>(null);
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState(seedEntries);
  const [profile, setProfile] = useState(initialProfile);
  const [portfolio, setPortfolio] = useState<PortfolioPreferences>({ username: viewer.username, theme: "Ink", publicProfile: true, showLinks: true, showEvidence: false, discoverable: false });
  const [published, setPublished] = useState(false);
  return <WorkspaceContext.Provider value={{ entries, setEntries, profile, setProfile, portfolio, setPortfolio, published, setPublished }}>{children}</WorkspaceContext.Provider>;
}
export function useWorkspace() { const value = useContext(WorkspaceContext); if (!value) throw new Error("Workspace provider is required"); return value; }