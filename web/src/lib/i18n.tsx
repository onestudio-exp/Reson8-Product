"use client";

// Lightweight i18n + direction provider.
// Supports the cross-cutting "Translation (RTL + Arabic)" requirement.
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

const DICT: Dict = {
  // Brand / module
  "app.brand": { en: "Reson8", ar: "ريزون8" },
  "module.ora": { en: "ORA · Elections", ar: "أورا · الانتخابات" },
  "lang.toggle": { en: "العربية", ar: "English" },
  "status.soon": { en: "Soon", ar: "قريبًا" },
  "status.ready": { en: "Ready", ar: "جاهز" },

  // Nav features
  "nav.setup": { en: "Country Setup", ar: "إعداد الدولة" },
  "nav.calendar": { en: "Calendar", ar: "التقويم" },
  "nav.map": { en: "Interactive Map", ar: "الخريطة التفاعلية" },
  "nav.entities": { en: "Entity Profiles", ar: "ملفات الكيانات" },
  "nav.breaking": { en: "Breaking News", ar: "أخبار عاجلة" },
  "nav.coalition": { en: "Coalition", ar: "الائتلاف" },
  "nav.achievements": { en: "Achievements", ar: "الإنجازات" },
  "nav.preparations": { en: "Election Prep", ar: "التحضيرات" },
  "nav.prediction": { en: "AI Prediction", ar: "التنبؤ بالذكاء" },
  "nav.broadcast": { en: "Broadcast", ar: "البث" },
  "nav.programs": { en: "Programs", ar: "البرامج" },
  "nav.takeToAir": { en: "Take to Air", ar: "البث المباشر" },
  "nav.controlRoom": { en: "Control Room", ar: "غرفة التحكم" },
  "nav.integrations": { en: "Integrations", ar: "التكاملات" },

  // Setup page
  "setup.title": { en: "Country & Election Setup", ar: "إعداد الدولة والانتخابات" },
  "setup.subtitle": {
    en: "Configure countries, election systems, parties, candidates and constituencies.",
    ar: "قم بإعداد الدول وأنظمة الانتخابات والأحزاب والمرشحين والدوائر.",
  },
  "setup.tab.elections": { en: "Elections", ar: "الانتخابات" },
  "setup.tab.parties": { en: "Parties", ar: "الأحزاب" },
  "setup.tab.candidates": { en: "Candidates", ar: "المرشحون" },
  "setup.tab.constituencies": { en: "Constituencies", ar: "الدوائر" },

  // Fields
  "field.country": { en: "Country", ar: "الدولة" },
  "field.type": { en: "System", ar: "النظام" },
  "field.date": { en: "Date", ar: "التاريخ" },
  "field.seats": { en: "Seats", ar: "المقاعد" },
  "field.rule": { en: "Electoral rule", ar: "القاعدة الانتخابية" },
  "field.status": { en: "Status", ar: "الحالة" },
  "field.rounds": { en: "Rounds", ar: "الجولات" },
  "field.party": { en: "Party", ar: "الحزب" },
  "field.acronym": { en: "Acronym", ar: "الاختصار" },
  "field.leader": { en: "Leader", ar: "الزعيم" },
  "field.color": { en: "Colour", ar: "اللون" },
  "field.target": { en: "Seat target", ar: "المقاعد المستهدفة" },
  "field.name": { en: "Name", ar: "الاسم" },
  "field.district": { en: "District", ar: "الدائرة" },
  "field.position": { en: "Position", ar: "المنصب" },
  "field.region": { en: "Region", ar: "المنطقة" },
  "field.voters": { en: "Registered voters", ar: "الناخبون المسجلون" },

  "action.newElection": { en: "New Election", ar: "انتخابات جديدة" },
  "wizard.title": { en: "Election Configuration Wizard", ar: "معالج إعداد الانتخابات" },
  "wizard.hint": {
    en: "Mock wizard — demonstrates the setup flow. Submitting does not persist.",
    ar: "معالج تجريبي — يوضح خطوات الإعداد. الإرسال لا يحفظ البيانات.",
  },
  "action.create": { en: "Create", ar: "إنشاء" },
  "action.cancel": { en: "Cancel", ar: "إلغاء" },

  "common.allCountries": { en: "All countries", ar: "كل الدول" },
  "common.summary": { en: "Summary", ar: "ملخص" },
  "common.elections": { en: "Elections", ar: "الانتخابات" },
  "common.parties": { en: "Parties", ar: "الأحزاب" },
  "common.candidates": { en: "Candidates", ar: "المرشحون" },
  "common.constituencies": { en: "Constituencies", ar: "الدوائر" },
};

interface I18nCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: keyof typeof DICT | string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      dir,
      setLang,
      toggle: () => setLang((l) => (l === "en" ? "ar" : "en")),
      t: (key) => DICT[key as string]?.[lang] ?? (key as string),
    }),
    [lang, dir],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
