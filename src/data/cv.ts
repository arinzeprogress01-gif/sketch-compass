import type { WorkspaceEntry, WorkspaceProfile } from "@/components/dashboard/WorkspaceProvider";
import type { ModuleKey } from "@/data/dashboard";

export type CvSection = "experience" | "education" | "skills" | "projects" | "certifications";
export const cvSections: CvSection[] = ["experience", "education", "skills", "projects", "certifications"];
export type CvItem = { id: string; title: string; subtitle: string; description: string };
export type CvDocument = { name: string; headline: string; email: string; phone: string; location: string; summary: string; sections: Record<CvSection, CvItem[]> };
export function createCv(profile: WorkspaceProfile, entries: Record<ModuleKey, WorkspaceEntry[]>): CvDocument {
  return { name: profile.name, headline: profile.headline, email: profile.email, phone: profile.phone, location: profile.location, summary: profile.about, sections: Object.fromEntries(cvSections.map((key) => [key, entries[key].map((entry) => ({ id: entry.id, title: entry.title, subtitle: entry.meta, description: entry.detail }))])) as Record<CvSection, CvItem[]> };
}
export function cvFilename(name: string) { return `${name.trim().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") || "FolioPro"}-CV.pdf`; }