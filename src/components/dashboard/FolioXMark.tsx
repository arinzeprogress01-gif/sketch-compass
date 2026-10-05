import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function FolioXMark({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <Link to="/dashboard" className="group flex min-w-0 items-center gap-2.5" aria-label="FolioX dashboard">
      <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", inverse ? "bg-background text-foreground" : "bg-primary text-primary-foreground")}>
        <Check className="size-4 stroke-[3] transition-transform group-hover:scale-110" />
      </span>
      {!compact && <span className="truncate font-display text-base font-extrabold">FolioX</span>}
    </Link>
  );
}