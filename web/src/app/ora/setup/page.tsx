"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { ElectionWizard } from "./election-wizard";
import { useI18n } from "@/lib/i18n";
import {
  candidates as allCandidates,
  constituencies as allConstituencies,
  countries,
  elections as allElections,
  parties as allParties,
  partyById,
} from "@/lib/mock-data";

const nf = new Intl.NumberFormat("en-US");

export default function SetupPage() {
  const { t, lang } = useI18n();
  const [country, setCountry] = useState<string>("all");

  const scope = (cid: string) => country === "all" || cid === country;

  const elections = useMemo(() => allElections.filter((e) => scope(e.countryId)), [country]);
  const parties = useMemo(() => allParties.filter((p) => scope(p.countryId)), [country]);
  const candidates = useMemo(() => allCandidates.filter((c) => scope(c.countryId)), [country]);
  const constituencies = useMemo(() => allConstituencies.filter((c) => scope(c.countryId)), [country]);

  const countryName = (id: string) => {
    const c = countries.find((x) => x.id === id);
    if (!c) return id;
    return `${c.flag} ${lang === "ar" ? c.nameAr : c.name}`;
  };

  const stats = [
    { key: "common.elections", value: elections.length },
    { key: "common.parties", value: parties.length },
    { key: "common.candidates", value: candidates.length },
    { key: "common.constituencies", value: constituencies.length },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t("setup.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("setup.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={country} onValueChange={(v) => setCountry(v ?? "all")}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allCountries")}</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.flag} {lang === "ar" ? c.nameAr : c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ElectionWizard
            trigger={
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t("action.newElection")}
              </Button>
            }
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.key}>
            <CardContent className="py-4">
              <div className="text-3xl font-semibold tabular-nums">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t(s.key)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="elections" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-grid sm:grid-cols-4">
          <TabsTrigger value="elections">{t("setup.tab.elections")}</TabsTrigger>
          <TabsTrigger value="parties">{t("setup.tab.parties")}</TabsTrigger>
          <TabsTrigger value="candidates">{t("setup.tab.candidates")}</TabsTrigger>
          <TabsTrigger value="constituencies">{t("setup.tab.constituencies")}</TabsTrigger>
        </TabsList>

        {/* Elections */}
        <TabsContent value="elections">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("field.country")}</TableHead>
                    <TableHead>{t("field.type")}</TableHead>
                    <TableHead>{t("field.date")}</TableHead>
                    <TableHead className="text-end">{t("field.seats")}</TableHead>
                    <TableHead>{t("field.rule")}</TableHead>
                    <TableHead className="text-end">{t("field.rounds")}</TableHead>
                    <TableHead>{t("field.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {elections.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{countryName(e.countryId)}</TableCell>
                      <TableCell>{e.type}</TableCell>
                      <TableCell className="tabular-nums">{e.date}</TableCell>
                      <TableCell className="text-end tabular-nums">{nf.format(e.seatCount)}</TableCell>
                      <TableCell className="max-w-[260px] text-muted-foreground">{e.electoralRule}</TableCell>
                      <TableCell className="text-end tabular-nums">{e.rounds.length}</TableCell>
                      <TableCell><StatusBadge status={e.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parties */}
        <TabsContent value="parties">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("field.party")}</TableHead>
                    <TableHead>{t("field.acronym")}</TableHead>
                    <TableHead>{t("field.country")}</TableHead>
                    <TableHead>{t("field.leader")}</TableHead>
                    <TableHead>{t("field.color")}</TableHead>
                    <TableHead className="text-end">{t("field.target")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parties.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">
                        <span className="me-2">{p.symbol}</span>
                        {p.name}
                      </TableCell>
                      <TableCell><Badge variant="secondary">{p.acronym}</Badge></TableCell>
                      <TableCell>{countryName(p.countryId)}</TableCell>
                      <TableCell>{p.leader}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block h-4 w-4 rounded-full border"
                            style={{ backgroundColor: p.color }}
                          />
                          <span className="text-xs text-muted-foreground tabular-nums">{p.color}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-end tabular-nums">{nf.format(p.seatsTarget)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Candidates */}
        <TabsContent value="candidates">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("field.name")}</TableHead>
                    <TableHead>{t("field.party")}</TableHead>
                    <TableHead>{t("field.district")}</TableHead>
                    <TableHead>{t("field.position")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((c) => {
                    const p = partyById(c.partyId);
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">
                          <span className="me-2 text-lg">{c.photo}</span>
                          {c.name}
                        </TableCell>
                        <TableCell>
                          {p && (
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                className="inline-block h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: p.color }}
                              />
                              {p.acronym}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{c.district}</TableCell>
                        <TableCell className="text-muted-foreground">{c.position}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Constituencies */}
        <TabsContent value="constituencies">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("field.district")}</TableHead>
                    <TableHead>{t("field.country")}</TableHead>
                    <TableHead>{t("field.region")}</TableHead>
                    <TableHead className="text-end">{t("field.seats")}</TableHead>
                    <TableHead className="text-end">{t("field.voters")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {constituencies.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{countryName(c.countryId)}</TableCell>
                      <TableCell className="text-muted-foreground">{c.region}</TableCell>
                      <TableCell className="text-end tabular-nums">{c.seats}</TableCell>
                      <TableCell className="text-end tabular-nums">{nf.format(c.registeredVoters)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
