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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import type { ElectoralSystem } from "@/lib/types";
import {
  candidaciesByCountry,
  candidateById,
  coalitionById,
  coalitionsByCountry,
  constituencyById,
  constituencies as allConstituencies,
  countries,
  electionById,
  elections as allElections,
  parties as allParties,
  partyById,
} from "@/lib/mock-data";

const nf = new Intl.NumberFormat("en-US");

export default function SetupPage() {
  const { t, lang } = useI18n();
  const [country, setCountry] = useState<string>("all");

  const inScope = (cid: string) => country === "all" || cid === country;
  // Localized name picker
  const L = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const elections = useMemo(() => allElections.filter((e) => inScope(e.countryId)), [country]);
  const parties = useMemo(() => allParties.filter((p) => inScope(p.countryId)), [country]);
  const coalitions = useMemo(
    () => countries.flatMap((c) => (inScope(c.id) ? coalitionsByCountry(c.id) : [])),
    [country],
  );
  const candidacies = useMemo(
    () => countries.flatMap((c) => (inScope(c.id) ? candidaciesByCountry(c.id) : [])),
    [country],
  );
  const constituencies = useMemo(
    () => allConstituencies.filter((c) => inScope(c.countryId)),
    [country],
  );

  const candidateCount = useMemo(
    () => new Set(candidacies.map((cy) => cy.candidateId)).size,
    [candidacies],
  );

  const countryLabel = (id: string) => {
    const c = countries.find((x) => x.id === id);
    return c ? `${c.flag} ${L(c.name, c.nameAr)}` : id;
  };

  // Localized electoral-system label (avoids English-only displayLabel in Arabic)
  const systemLabel = (s: ElectoralSystem) => {
    const base = t(`formula.${s.formula}`);
    return s.thresholdPct ? `${base} · ${s.thresholdPct}% ${t("system.threshold")}` : base;
  };

  const stats = [
    { key: "common.elections", value: elections.length },
    { key: "common.parties", value: parties.length },
    { key: "common.coalitions", value: coalitions.length },
    { key: "common.candidates", value: candidateCount },
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
              <SelectValue>
                {(val: string | null) =>
                  val && val !== "all" ? countryLabel(val) : t("common.allCountries")
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.allCountries")}</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.flag} {L(c.name, c.nameAr)}
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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
        <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-grid sm:grid-cols-5">
          <TabsTrigger value="elections">{t("setup.tab.elections")}</TabsTrigger>
          <TabsTrigger value="parties">{t("setup.tab.parties")}</TabsTrigger>
          <TabsTrigger value="coalitions">{t("setup.tab.coalitions")}</TabsTrigger>
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
                    <TableHead>{t("field.system")}</TableHead>
                    <TableHead>{t("field.date")}</TableHead>
                    <TableHead className="text-end">{t("field.seats")}</TableHead>
                    <TableHead className="text-end">{t("field.rounds")}</TableHead>
                    <TableHead>{t("field.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {elections.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{countryLabel(e.countryId)}</TableCell>
                      <TableCell>{t(`type.${e.type}`)}</TableCell>
                      <TableCell className="text-muted-foreground">{systemLabel(e.system)}</TableCell>
                      <TableCell className="tabular-nums">{e.date}</TableCell>
                      <TableCell className="text-end tabular-nums">{nf.format(e.seatCount)}</TableCell>
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
                    <TableHead>{t("field.bloc")}</TableHead>
                    <TableHead>{t("field.color")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parties.map((p) => {
                    const bloc = coalitionById(p.coalitionId);
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">
                          <span className="me-2">{p.symbol}</span>
                          {L(p.name, p.nameAr)}
                        </TableCell>
                        <TableCell><Badge variant="secondary">{p.acronym}</Badge></TableCell>
                        <TableCell>{countryLabel(p.countryId)}</TableCell>
                        <TableCell>{p.leader}</TableCell>
                        <TableCell>
                          {bloc ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bloc.color }} />
                              {L(bloc.name, bloc.nameAr)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">{t("value.unaligned")}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="inline-block h-4 w-4 rounded-full border" style={{ backgroundColor: p.color }} />
                            <span className="text-xs text-muted-foreground tabular-nums">{p.color}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coalitions (read-only bloc display) */}
        <TabsContent value="coalitions">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("field.bloc")}</TableHead>
                    <TableHead>{t("field.country")}</TableHead>
                    <TableHead>{t("field.color")}</TableHead>
                    <TableHead>{t("field.members")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coalitions.map((co) => (
                    <TableRow key={co.id}>
                      <TableCell className="font-medium">
                        <span className="me-2 inline-block h-3 w-3 rounded-sm align-middle" style={{ backgroundColor: co.color }} />
                        {L(co.name, co.nameAr)}
                      </TableCell>
                      <TableCell>{countryLabel(co.countryId)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums">{co.color}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1.5">
                          {co.partyIds.map((pid) => {
                            const p = partyById(pid);
                            if (!p) return null;
                            return (
                              <Badge key={pid} variant="outline" className="gap-1.5">
                                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                                {p.acronym}
                              </Badge>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Candidates (one row per candidacy) */}
        <TabsContent value="candidates">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("field.name")}</TableHead>
                    <TableHead>{t("field.party")}</TableHead>
                    <TableHead>{t("field.election")}</TableHead>
                    <TableHead>{t("field.district")}</TableHead>
                    <TableHead className="text-end">{t("field.ballot")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidacies.map((cy) => {
                    const cand = candidateById(cy.candidateId);
                    const p = partyById(cy.partyId);
                    const con = constituencyById(cy.constituencyId);
                    const el = electionById(cy.electionId);
                    return (
                      <TableRow key={cy.id}>
                        <TableCell className="font-medium">
                          <span className="me-2 text-lg">{cand?.photo}</span>
                          {cand ? L(cand.name, cand.nameAr) : cy.candidateId}
                        </TableCell>
                        <TableCell>
                          {p ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                              {p.acronym}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">{t("value.independent")}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{el ? t(`type.${el.type}`) : ""}</TableCell>
                        <TableCell>
                          {con ? L(con.name, con.nameAr) : <span className="text-muted-foreground">{t("value.nationalList")}</span>}
                        </TableCell>
                        <TableCell className="text-end tabular-nums">{cy.ballotPosition}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Constituencies (scoped to election) */}
        <TabsContent value="constituencies">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("field.district")}</TableHead>
                    <TableHead>{t("field.election")}</TableHead>
                    <TableHead>{t("field.region")}</TableHead>
                    <TableHead className="text-end">{t("field.seats")}</TableHead>
                    <TableHead className="text-end">{t("field.voters")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {constituencies.map((c) => {
                    const el = electionById(c.electionId);
                    const parent = constituencyById(c.parentRegionId);
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{L(c.name, c.nameAr)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {el ? `${countryLabel(el.countryId)} · ${t(`type.${el.type}`)}` : c.electionId}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {parent ? L(parent.name, parent.nameAr) : "—"}
                        </TableCell>
                        <TableCell className="text-end">
                          <span className="inline-flex items-center gap-2">
                            <Badge variant="outline" className="font-normal">
                              {c.seats > 1 ? t("value.multiMember") : t("value.singleMember")}
                            </Badge>
                            <span className="tabular-nums">{c.seats}</span>
                          </span>
                        </TableCell>
                        <TableCell className="text-end tabular-nums">{nf.format(c.registeredVoters)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
