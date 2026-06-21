"use client";

import { useState, type ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { countries } from "@/lib/mock-data";
import type { ElectionSystemType } from "@/lib/types";

const SYSTEMS: ElectionSystemType[] = ["Presidency", "Senate", "Parliament"];

export function ElectionWizard({ trigger }: { trigger: ReactElement }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("wizard.title")}</DialogTitle>
          <DialogDescription>{t("wizard.hint")}</DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <div className="grid gap-2">
            <Label>{t("field.country")}</Label>
            <Select defaultValue={countries[0].id}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.flag} {lang === "ar" ? c.nameAr : c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>{t("field.type")}</Label>
              <Select defaultValue={SYSTEMS[0]}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SYSTEMS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">{t("field.date")}</Label>
              <Input id="date" type="date" defaultValue="2026-09-14" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="seats">{t("field.seats")}</Label>
              <Input id="seats" type="number" min={1} defaultValue={1} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rounds">{t("field.rounds")}</Label>
              <Input id="rounds" type="number" min={1} max={3} defaultValue={1} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rule">{t("field.rule")}</Label>
            <Input id="rule" placeholder="e.g. Two-round runoff (50% + 1)" />
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              {t("action.cancel")}
            </DialogClose>
            <Button type="submit">{t("action.create")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
