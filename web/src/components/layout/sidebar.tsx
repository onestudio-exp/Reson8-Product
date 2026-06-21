"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { oraNav } from "@/lib/nav";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-e bg-sidebar md:flex">
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
          R8
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{t("app.brand")}</div>
          <div className="text-xs text-muted-foreground">{t("module.ora")}</div>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {oraNav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.slug}
              href={item.status === "ready" ? item.href : "#"}
              aria-disabled={item.status === "soon"}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                item.status === "soon" && "cursor-not-allowed opacity-55 hover:bg-transparent",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">{t(item.labelKey)}</span>
              {item.status === "soon" && (
                <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {t("status.soon")}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3 text-[11px] text-muted-foreground">
        Reson8 · ORA Elections — UI preview (mock data)
      </div>
    </aside>
  );
}
