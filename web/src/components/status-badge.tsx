import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ElectionStatus } from "@/lib/types";

const MAP: Record<ElectionStatus, { label: string; cls: string }> = {
  draft: { label: "Draft", cls: "bg-muted text-muted-foreground" },
  configured: { label: "Configured", cls: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  live: { label: "Live", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  closed: { label: "Closed", cls: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
};

export function StatusBadge({ status }: { status: ElectionStatus }) {
  const m = MAP[status];
  return <Badge className={cn("border-transparent font-medium", m.cls)}>{m.label}</Badge>;
}
