"use client";

import { useMemo, useState, type ReactElement } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import type {
  ElectionType,
  ElectoralFormula,
  MajorityRule,
} from "@/lib/types";

const FORMULAS: { value: ElectoralFormula; seatsPerConstituency: number; majority: MajorityRule }[] = [
  { value: "FPTP", seatsPerConstituency: 1, majority: "Plurality" },
  { value: "TwoRound", seatsPerConstituency: 1, majority: "AbsoluteMajority" },
  { value: "DHondt", seatsPerConstituency: 8, majority: "Plurality" },
  { value: "SainteLague", seatsPerConstituency: 8, majority: "Plurality" },
];

export function ElectionWizard({ trigger }: { trigger: ReactElement }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  const [countryId, setCountryId] = useState(countries[0].id);
  const [type, setType] = useState<ElectionType>("Parliament");
  const [formula, setFormula] = useState<ElectoralFormula>("DHondt");

  const selectedCountry = countries.find((c) => c.id === countryId);
  const isBicameral = selectedCountry?.isBicameral ?? false;

  // Senate type only offered for bicameral countries.
  const types: ElectionType[] = useMemo(
    () => (isBicameral ? ["Presidency", "Parliament", "Senate"] : ["Presidency", "Parliament"]),
    [isBicameral],
  );

  const formulaMeta = FORMULAS.find((f) => f.value === formula)!;
  const isProportional = formula === "DHondt" || formula === "SainteLague";
  const addsRunoff = formulaMeta.majority === "AbsoluteMajority";

  // If a non-bicameral country is chosen while Senate is selected, fall back.
  const effectiveType = !isBicameral && type === "Senate" ? "Parliament" : type;

  const L = (en: string, ar: string) => (lang === "ar" ? ar : en);

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
          {/* Country */}
          <div className="grid gap-2">
            <Label>{t("field.country")}</Label>
            <Select value={countryId} onValueChange={(v) => v && setCountryId(v)}>
              <SelectTrigger>
                <SelectValue>
                  {(val: string | null) => {
                    const c = countries.find((x) => x.id === val);
                    return c ? `${c.flag} ${L(c.name, c.nameAr)}` : "";
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.flag} {L(c.name, c.nameAr)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isBicameral && (
              <p className="text-xs text-muted-foreground">{t("wizard.senateNote")}</p>
            )}
          </div>

          {/* Type + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>{t("field.type")}</Label>
              <Select value={effectiveType} onValueChange={(v) => v && setType(v as ElectionType)}>
                <SelectTrigger>
                  <SelectValue>{(val: string | null) => (val ? t(`type.${val}`) : "")}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {types.map((ty) => (
                    <SelectItem key={ty} value={ty}>{t(`type.${ty}`)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">{t("field.date")}</Label>
              <Input id="date" type="date" defaultValue="2026-09-14" />
            </div>
          </div>

          {/* Electoral formula */}
          <div className="grid gap-2">
            <Label>{t("field.formula")}</Label>
            <Select value={formula} onValueChange={(v) => v && setFormula(v as ElectoralFormula)}>
              <SelectTrigger>
                <SelectValue>{(val: string | null) => (val ? t(`formula.${val}`) : "")}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {FORMULAS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>{t(`formula.${f.value}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seats + threshold */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="seats">
                {isProportional ? t("field.seats") : t("field.seats")}
              </Label>
              <Input
                id="seats"
                type="number"
                min={1}
                defaultValue={effectiveType === "Presidency" ? 1 : isProportional ? 30 : 1}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="threshold">{t("field.threshold")}</Label>
              <Input
                id="threshold"
                type="number"
                min={0}
                max={100}
                placeholder={isProportional ? "4" : "—"}
                disabled={!isProportional}
              />
            </div>
          </div>

          {/* Majority rule (derived) */}
          <div className="grid gap-2">
            <Label>{t("field.majority")}</Label>
            <Input
              readOnly
              value={addsRunoff ? t("value.absolute") : t("value.plurality")}
              className="bg-muted/50"
            />
            {addsRunoff && (
              <p className="text-xs text-amber-600 dark:text-amber-500">{t("wizard.runoffNote")}</p>
            )}
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
