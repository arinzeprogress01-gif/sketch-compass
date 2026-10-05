import {
  Award, BookOpen, BriefcaseBusiness, CircleUserRound, FileBadge, FileText, FolderKanban,
  GraduationCap, HelpCircle, LayoutDashboard, Link2, Medal, MessageSquareQuote, Settings,
  Shapes, Sparkles, UserRound, Wrench,
  type LucideIcon,
} from "lucide-react";

export type DashboardPath =
  | "/dashboard" | "/dashboard/profile" | "/dashboard/experience" | "/dashboard/education"
  | "/dashboard/skills" | "/dashboard/projects" | "/dashboard/certifications" | "/dashboard/awards"
  | "/dashboard/publications" | "/dashboard/services" | "/dashboard/testimonials" | "/dashboard/media"
  | "/dashboard/links" | "/dashboard/portfolio" | "/dashboard/portfolio/preview"
  | "/dashboard/portfolio/settings" | "/dashboard/settings" | "/dashboard/help";

export type NavItem = { label: string; to: DashboardPath; icon: LucideIcon; hint?: string };
export const navGroups: Array<{ label: string; items: NavItem[] }> = [
  { label: "Main", items: [{ label: "Dashboard", to: "/dashboard", icon: LayoutDashboard }] },
  { label: "Professional identity", items: [
    { label: "Profile", to: "/dashboard/profile", icon: CircleUserRound },
    { label: "Experience", to: "/dashboard/experience", icon: BriefcaseBusiness },
    { label: "Education", to: "/dashboard/education", icon: GraduationCap },
    { label: "Skills", to: "/dashboard/skills", icon: Shapes },
  ]},
  { label: "Work & achievements", items: [
    { label: "Projects / Work", to: "/dashboard/projects", icon: FolderKanban },
    { label: "Certifications", to: "/dashboard/certifications", icon: FileBadge },
    { label: "Awards", to: "/dashboard/awards", icon: Award },
  ]},
  { label: "Professional content", items: [
    { label: "Publications", to: "/dashboard/publications", icon: BookOpen },
    { label: "Services", to: "/dashboard/services", icon: Wrench },
    { label: "Testimonials", to: "/dashboard/testimonials", icon: MessageSquareQuote },
  ]},
  { label: "Evidence & links", items: [
    { label: "Media & Documents", to: "/dashboard/media", icon: FileText },
    { label: "Links", to: "/dashboard/links", icon: Link2 },
  ]},
  { label: "My portfolio", items: [
    { label: "Overview", to: "/dashboard/portfolio", icon: Sparkles },
    { label: "Preview", to: "/dashboard/portfolio/preview", icon: UserRound },
    { label: "Portfolio settings", to: "/dashboard/portfolio/settings", icon: Settings },
  ]},
];

export const viewer = {
  firstName: "Amara",
  fullName: "Amara Okafor",
  initials: "AO",
  headline: "Product Designer · Researcher",
  email: "amara@example.com",
  username: "amara",
};

export type ModuleKey = "experience" | "education" | "skills" | "projects" | "certifications" | "awards" | "publications" | "services" | "testimonials" | "media" | "links";
export type ModuleDefinition = {
  title: string; singular: string; description: string; addLabel: string; icon: LucideIcon;
  emptyTitle: string; emptyCopy: string; fields: Array<{ key: string; label: string; placeholder: string; type?: string; required?: boolean }>;
  entries: Array<{ title: string; meta: string; detail: string; visibility: "Public" | "Private" | "Hidden"; evidence?: string }>;
};

export const modules: Record<ModuleKey, ModuleDefinition> = {
  experience: { title: "Experience", singular: "experience", description: "Showcase the roles and positions that have shaped your professional journey.", addLabel: "Add Experience", icon: BriefcaseBusiness, emptyTitle: "No experience added yet", emptyCopy: "Add a role, position, engagement, or other meaningful professional chapter.", fields: [
    { key: "title", label: "Position or role", placeholder: "Lead Product Designer", required: true }, { key: "organization", label: "Organization", placeholder: "Organization name", required: true }, { key: "location", label: "Location", placeholder: "City, country or Remote" }, { key: "description", label: "Description", placeholder: "Describe your responsibilities and impact" },
  ], entries: [{ title: "Lead Product Designer", meta: "Civic Lab · 2022 — Present · Lagos, Nigeria", detail: "Leading service design and research for more accessible public services.", visibility: "Public", evidence: "3 evidence attachments" }, { title: "Senior Product Designer", meta: "Kora Systems · 2020 — 2022 · Remote", detail: "Built research-led product experiences with multidisciplinary teams.", visibility: "Public", evidence: "1 evidence attachment" }] },
  education: { title: "Education", singular: "education", description: "Share your academic journey, specialist training, and learning milestones.", addLabel: "Add Education", icon: GraduationCap, emptyTitle: "No education added yet", emptyCopy: "Add your qualifications, institutions, or ongoing studies.", fields: [{ key: "qualification", label: "Qualification", placeholder: "MSc Human-Computer Interaction", required: true }, { key: "institution", label: "Institution", placeholder: "Institution name", required: true }, { key: "field", label: "Field of study", placeholder: "Area of study" }, { key: "description", label: "Description", placeholder: "Highlights and achievements" }], entries: [{ title: "MSc Human-Computer Interaction", meta: "University of Lagos · 2018 — 2020", detail: "Research focused on inclusive public-service experiences.", visibility: "Public", evidence: "Degree certificate" }] },
  skills: { title: "Skills", singular: "skill", description: "Organize the expertise, tools, languages, and strengths behind your work.", addLabel: "Add Skill", icon: Shapes, emptyTitle: "No skills added yet", emptyCopy: "Add your first skill and group it in a category that fits your profession.", fields: [{ key: "title", label: "Skill", placeholder: "Service Design", required: true }, { key: "category", label: "Category", placeholder: "Professional Skills", required: true }, { key: "level", label: "Proficiency", placeholder: "Advanced" }], entries: [{ title: "Service Design", meta: "Professional Skills · Advanced", detail: "Journey mapping, service blueprints, and collaborative facilitation.", visibility: "Public" }, { title: "User Research", meta: "Research · Advanced", detail: "Qualitative interviews, synthesis, and opportunity framing.", visibility: "Public" }, { title: "Workshop Facilitation", meta: "Leadership · Proficient", detail: "Cross-functional sessions for alignment and decision-making.", visibility: "Public" }] },
  projects: { title: "Projects / Work", singular: "project", description: "Turn your work into clear stories of context, contribution, and outcome.", addLabel: "Add Project", icon: FolderKanban, emptyTitle: "No projects yet", emptyCopy: "Your projects are where your work becomes tangible. Add your first project to start building your professional story.", fields: [{ key: "title", label: "Project or work title", placeholder: "Civic Access", required: true }, { key: "role", label: "Your role", placeholder: "Lead Designer" }, { key: "organization", label: "Organization or client", placeholder: "Client or organization" }, { key: "description", label: "Story and outcomes", placeholder: "Describe the context, contribution, and results" }], entries: [{ title: "Civic Access", meta: "Lead Designer · Civic Lab · 2024", detail: "Redesigned a public-service journey, reducing incomplete applications by 31%.", visibility: "Public", evidence: "Case study + 4 images" }, { title: "Community Research Toolkit", meta: "Research Lead · Independent · 2023", detail: "An adaptable toolkit for community-led discovery sessions.", visibility: "Hidden" }] },
  certifications: { title: "Certifications", singular: "certification", description: "Manage credentials and the professional evidence behind them.", addLabel: "Add Certification", icon: FileBadge, emptyTitle: "No certifications yet", emptyCopy: "Add a qualification, license, or professional credential.", fields: [{ key: "title", label: "Certification name", placeholder: "Certified UX Researcher", required: true }, { key: "issuer", label: "Issuing organization", placeholder: "Organization", required: true }, { key: "credential", label: "Credential ID", placeholder: "Optional credential ID" }, { key: "description", label: "Description", placeholder: "What this credential represents" }], entries: [{ title: "Certified UX Researcher", meta: "Research Guild · Issued Mar 2024", detail: "Advanced qualitative research practice and ethical participant engagement.", visibility: "Public", evidence: "Certificate · PDF" }, { title: "Service Design Practitioner", meta: "Design Institute · Issued Sep 2022", detail: "Service systems, facilitation, and experience strategy.", visibility: "Private", evidence: "Certificate · PDF" }] },
  awards: { title: "Awards & Achievements", singular: "award", description: "Highlight recognition and meaningful milestones across your career.", addLabel: "Add Award", icon: Medal, emptyTitle: "No awards yet", emptyCopy: "Add recognition, honors, or a milestone worth sharing.", fields: [{ key: "title", label: "Award title", placeholder: "Design Impact Award", required: true }, { key: "organization", label: "Awarding organization", placeholder: "Organization", required: true }, { key: "date", label: "Date", placeholder: "2024" }, { key: "description", label: "Description", placeholder: "Why this recognition matters" }], entries: [{ title: "Design Impact Award", meta: "African Design Council · 2024", detail: "Recognized for improving access to essential digital public services.", visibility: "Public", evidence: "Award letter" }] },
  publications: { title: "Publications", singular: "publication", description: "Collect articles, research, books, reports, and other published thinking.", addLabel: "Add Publication", icon: BookOpen, emptyTitle: "No publications yet", emptyCopy: "Add an article, paper, book, report, or other published work when it supports your story.", fields: [{ key: "title", label: "Publication title", placeholder: "Designing for public trust", required: true }, { key: "type", label: "Publication type", placeholder: "Article, paper, book…", required: true }, { key: "publisher", label: "Publisher", placeholder: "Publisher or journal" }, { key: "url", label: "External URL", placeholder: "https://" }], entries: [] },
  services: { title: "Services", singular: "service", description: "Communicate what you offer and how people can work with you.", addLabel: "Add Service", icon: Wrench, emptyTitle: "No services yet", emptyCopy: "Add an optional service when you are ready to make your expertise available.", fields: [{ key: "title", label: "Service name", placeholder: "Design Research Sprint", required: true }, { key: "category", label: "Category", placeholder: "Research & Strategy" }, { key: "delivery", label: "Delivery information", placeholder: "Remote · 2 weeks" }, { key: "description", label: "Description", placeholder: "What clients can expect" }], entries: [{ title: "Design Research Sprint", meta: "Research & Strategy · Remote", detail: "A focused research engagement that turns uncertainty into a practical opportunity map.", visibility: "Public" }] },
  testimonials: { title: "Testimonials", singular: "testimonial", description: "Curate professional recommendations with clear relationship context.", addLabel: "Add Testimonial", icon: MessageSquareQuote, emptyTitle: "No testimonials yet", emptyCopy: "Add a recommendation from someone who can speak to your work.", fields: [{ key: "name", label: "Person's name", placeholder: "Full name", required: true }, { key: "position", label: "Position and organization", placeholder: "Role · Organization" }, { key: "relationship", label: "Relationship", placeholder: "Former manager, client, collaborator" }, { key: "testimonial", label: "Testimonial", placeholder: "Their recommendation", required: true }], entries: [{ title: "Nneka Eze", meta: "Director of Programs · Civic Lab", detail: "Amara brings rare clarity to complex services and makes every team around her better.", visibility: "Public" }] },
  media: { title: "Media & Documents", singular: "document", description: "Manage the professional evidence connected to your story without publishing anything by default.", addLabel: "Upload Evidence", icon: FileText, emptyTitle: "No evidence uploaded yet", emptyCopy: "Add a certificate, document, image, or other supporting evidence. New uploads stay private.", fields: [{ key: "title", label: "Evidence title", placeholder: "Certificate or document name", required: true }, { key: "type", label: "Category", placeholder: "Certificate, document, image…", required: true }, { key: "description", label: "Description", placeholder: "What this evidence supports" }], entries: [{ title: "UX Research Certificate.pdf", meta: "Certificate · 1.8 MB · Added 12 Sep 2026", detail: "Connected to Certified UX Researcher.", visibility: "Public" }, { title: "Civic Access research notes.pdf", meta: "Project media · 4.2 MB · Added 08 Sep 2026", detail: "Internal research evidence connected to Civic Access.", visibility: "Private" }] },
  links: { title: "Professional Links", singular: "link", description: "Guide people to your work, profiles, writing, and other professional destinations.", addLabel: "Add Link", icon: Link2, emptyTitle: "No links yet", emptyCopy: "Add a website, professional profile, research page, or custom destination.", fields: [{ key: "label", label: "Link label", placeholder: "Personal website", required: true }, { key: "url", label: "URL", placeholder: "https://", required: true }, { key: "description", label: "Description", placeholder: "Optional context" }], entries: [{ title: "Personal website", meta: "amaradesigns.com", detail: "Selected work, writing, and speaking.", visibility: "Public" }, { title: "Research profile", meta: "research.example/amara", detail: "Published research and citations.", visibility: "Public" }] },
};

export const completionItems = [
  { label: "Core profile", complete: true }, { label: "Professional headline", complete: true },
  { label: "Experience", complete: true }, { label: "Education", complete: true },
  { label: "Skills", complete: true }, { label: "Profile photo", complete: false },
];

export const activities = [
  { text: "Updated Civic Access project", time: "2 hours ago", icon: FolderKanban },
  { text: "Added UX Research certificate", time: "Yesterday", icon: FileBadge },
  { text: "Updated professional profile", time: "3 days ago", icon: UserRound },
];
