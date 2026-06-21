"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

export function Topbar() {
  const { t, toggle, lang } = useI18n();

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-5">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold md:hidden">{t("module.ora")}</h1>
        <Badge variant="outline" className="gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live · ≤3s
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={toggle} className="gap-2">
          <Languages className="h-4 w-4" />
          {t("lang.toggle")}
          <span className="text-xs text-muted-foreground">({lang.toUpperCase()})</span>
        </Button>
      </div>
    </header>
  );
}
