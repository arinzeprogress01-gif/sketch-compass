import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronLeft, ChevronRight, CircleHelp, LogOut, Menu, Search, Settings, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FolioXMark } from "@/components/dashboard/FolioXMark";
import { navGroups, viewer, type DashboardPath } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const pathLabels: Record<string, string> = {
  "/dashboard": "Dashboard", "/dashboard/profile": "Profile", "/dashboard/experience": "Experience",
  "/dashboard/education": "Education", "/dashboard/skills": "Skills", "/dashboard/projects": "Projects / Work",
  "/dashboard/certifications": "Certifications", "/dashboard/awards": "Awards", "/dashboard/publications": "Publications",
  "/dashboard/services": "Services", "/dashboard/testimonials": "Testimonials", "/dashboard/media": "Media & Documents",
  "/dashboard/links": "Links", "/dashboard/portfolio": "My Portfolio", "/dashboard/portfolio/preview": "Portfolio Preview",
  "/dashboard/portfolio/settings": "Portfolio Settings", "/dashboard/settings": "Settings", "/dashboard/help": "Help & Support",
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("foliox-sidebar-collapsed");
    setCollapsed(stored === "true");
  }, []);
  const toggleCollapsed = () => setCollapsed((value) => { window.localStorage.setItem("foliox-sidebar-collapsed", String(!value)); return !value; });

  return (
    <div className="min-h-screen bg-subtle text-foreground">
      <aside className={cn("fixed inset-y-0 left-0 z-40 hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 lg:flex lg:flex-col", collapsed ? "w-20" : "w-72")}>
        <div className="flex h-18 items-center justify-between px-5"><FolioXMark compact={collapsed} inverse />{!collapsed && <button onClick={toggleCollapsed} className="grid size-8 place-items-center rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground" aria-label="Collapse sidebar"><ChevronLeft className="size-4" /></button>}</div>
        <SidebarNavigation pathname={pathname} collapsed={collapsed} onNavigate={() => undefined} />
        <AccountArea collapsed={collapsed} />
        {collapsed && <button onClick={toggleCollapsed} className="mx-auto mb-3 grid size-9 place-items-center rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground" aria-label="Expand sidebar"><ChevronRight className="size-4" /></button>}
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-50 bg-foreground/50 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[18rem] max-w-[86vw] flex-col bg-sidebar text-sidebar-foreground shadow-premium transition-transform lg:hidden", mobileOpen ? "translate-x-0" : "-translate-x-full")} aria-hidden={!mobileOpen}>
        <div className="flex h-18 items-center justify-between px-5"><FolioXMark inverse /><button onClick={() => setMobileOpen(false)} className="grid size-10 place-items-center rounded-lg hover:bg-sidebar-foreground/10" aria-label="Close navigation"><X className="size-5" /></button></div>
        <SidebarNavigation pathname={pathname} collapsed={false} onNavigate={() => setMobileOpen(false)} />
        <AccountArea collapsed={false} />
      </aside>

      <div className={cn("min-h-screen transition-[padding] duration-200", collapsed ? "lg:pl-20" : "lg:pl-72")}>
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md sm:px-7">
          <div className="flex min-w-0 items-center gap-3"><button onClick={() => setMobileOpen(true)} className="grid size-10 place-items-center rounded-lg border border-border bg-card lg:hidden" aria-label="Open navigation"><Menu className="size-5" /></button><div className="min-w-0"><p className="hidden text-[10px] font-bold uppercase text-muted-foreground sm:block">Workspace /</p><p className="truncate font-display text-sm font-bold">{pathLabels[pathname] ?? "Workspace"}</p></div></div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={() => setSearchOpen(true)} className="hidden h-10 w-52 items-center gap-2 rounded-xl border border-border bg-subtle px-3 text-xs text-muted-foreground md:flex"><Search className="size-4" />Search workspace<span className="ml-auto rounded border border-border bg-card px-1.5 py-0.5 text-[9px]">⌘K</span></button>
            <button onClick={() => setSearchOpen(true)} className="grid size-10 place-items-center rounded-xl hover:bg-muted md:hidden" aria-label="Search"><Search className="size-4" /></button>
            <button onClick={() => setNotificationsOpen(true)} className="relative grid size-10 place-items-center rounded-xl hover:bg-muted" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-2 top-2 size-2 rounded-full bg-accent ring-2 ring-background" /></button>
            <Link to="/dashboard/help" className="grid size-10 place-items-center rounded-xl hover:bg-muted" aria-label="Help and support"><CircleHelp className="size-4" /></Link>
            <UserMenu compact />
          </div>
        </header>
        <main className="mx-auto max-w-[96rem] px-4 py-7 sm:px-7 sm:py-10">{children}</main>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <NotificationsDialog open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </div>
  );
}

function SidebarNavigation({ pathname, collapsed, onNavigate }: { pathname: string; collapsed: boolean; onNavigate: () => void }) {
  return <nav className="flex-1 overflow-y-auto px-3 pb-5" aria-label="Workspace navigation">{navGroups.map((group) => <div key={group.label} className="mb-5">{!collapsed && <p className="mb-2 px-3 text-[9px] font-bold uppercase text-sidebar-foreground/40">{group.label}</p>}<div className="space-y-1">{group.items.map((item) => { const active = item.to === "/dashboard" ? pathname === item.to : pathname === item.to || pathname.startsWith(`${item.to}/`); return <Link key={item.to} to={item.to} onClick={onNavigate} title={collapsed ? item.label : undefined} className={cn("flex h-10 items-center rounded-lg text-xs font-semibold transition-colors", collapsed ? "justify-center px-2" : "gap-3 px-3", active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-accent" : "text-sidebar-foreground/65 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground")}><item.icon className="size-4 shrink-0" />{!collapsed && <span className="truncate">{item.label}</span>}</Link>; })}</div></div>)}</nav>;
}

function AccountArea({ collapsed }: { collapsed: boolean }) {
  return <div className="border-t border-sidebar-border p-3"><UserMenu compact={collapsed} inverse /></div>;
}

function UserMenu({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return <DropdownMenu><DropdownMenuTrigger className={cn("flex items-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring", compact ? "size-10 justify-center" : "w-full gap-3 p-2 text-left", inverse && "hover:bg-sidebar-foreground/10")} aria-label="Open account menu"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-highlight font-display text-xs font-bold text-foreground">{viewer.initials}</span>{!compact && <span className="min-w-0"><span className="block truncate text-xs font-bold">{viewer.fullName}</span><span className={cn("block truncate text-[10px]", inverse ? "text-sidebar-foreground/50" : "text-muted-foreground")}>{viewer.headline}</span></span>}</DropdownMenuTrigger><DropdownMenuContent align="end" className="w-64 rounded-xl p-2"><DropdownMenuLabel><span className="block text-xs">{viewer.fullName}</span><span className="block text-[10px] font-normal text-muted-foreground">{viewer.email}</span></DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem asChild><Link to="/dashboard/profile"><UserRound />My Profile</Link></DropdownMenuItem><DropdownMenuItem asChild><Link to="/dashboard/portfolio"><Settings />My Portfolio</Link></DropdownMenuItem><DropdownMenuItem asChild><Link to="/dashboard/settings"><Settings />Settings</Link></DropdownMenuItem><DropdownMenuItem asChild><Link to="/dashboard/help"><CircleHelp />Help & Support</Link></DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem asChild className="text-destructive focus:text-destructive"><Link to="/login"><LogOut />Log Out</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => navGroups.flatMap((group) => group.items).filter((item) => item.label.toLowerCase().includes(query.toLowerCase()) && query.trim()), [query]);
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="top-[16%] translate-y-0 rounded-2xl sm:max-w-xl"><DialogHeader><DialogTitle className="font-display">Search FolioX</DialogTitle><DialogDescription>Find a workspace section. Content search will be connected with your account data.</DialogDescription></DialogHeader><div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input autoFocus maxLength={100} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “projects” or “certifications”" className="h-12 rounded-xl pl-10" /></div><div className="max-h-72 overflow-y-auto">{query && !results.length && <p className="py-8 text-center text-sm text-muted-foreground">No matching workspace sections.</p>}{results.map((item) => <Link key={item.to} to={item.to} onClick={() => onOpenChange(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-subtle"><item.icon className="size-4 text-accent"/><span className="text-sm font-semibold">{item.label}</span></Link>)}</div></DialogContent></Dialog>;
}

function NotificationsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [unread, setUnread] = useState(true);
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="rounded-2xl sm:max-w-md"><DialogHeader><DialogTitle className="font-display">Notifications</DialogTitle><DialogDescription>Helpful signals about your professional identity.</DialogDescription></DialogHeader>{unread ? <div className="rounded-xl border border-border bg-subtle p-4"><div className="flex gap-3"><span className="mt-1 size-2 rounded-full bg-accent"/><div><p className="text-sm font-bold">Your profile is almost ready</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Add a profile photo to strengthen your public portfolio.</p><button onClick={() => setUnread(false)} className="mt-3 text-xs font-bold text-accent">Mark as read</button></div></div></div> : <div className="py-8 text-center"><Bell className="mx-auto size-6 text-muted-foreground"/><p className="mt-3 text-sm font-bold">You’re all caught up</p><p className="mt-1 text-xs text-muted-foreground">New notifications will appear here.</p></div>}</DialogContent></Dialog>;
}