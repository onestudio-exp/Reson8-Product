// ORA Elections feature navigation — mirrors the approved roadmap.
// "ready" features are built; "soon" are placeholders.
import {
  Activity,
  Award,
  CalendarDays,
  Map,
  Megaphone,
  MonitorPlay,
  Network,
  Newspaper,
  Plug,
  Radio,
  Settings2,
  Sparkles,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  slug: string;
  href: string;
  labelKey: string;
  icon: LucideIcon;
  status: "ready" | "soon";
}

export const oraNav: NavItem[] = [
  { slug: "setup", href: "/ora/setup", labelKey: "nav.setup", icon: Settings2, status: "ready" },
  { slug: "calendar", href: "/ora/calendar", labelKey: "nav.calendar", icon: CalendarDays, status: "soon" },
  { slug: "map", href: "/ora/map", labelKey: "nav.map", icon: Map, status: "soon" },
  { slug: "entities", href: "/ora/entities", labelKey: "nav.entities", icon: Users, status: "soon" },
  { slug: "breaking-news", href: "/ora/breaking-news", labelKey: "nav.breaking", icon: Newspaper, status: "soon" },
  { slug: "coalition", href: "/ora/coalition", labelKey: "nav.coalition", icon: Network, status: "soon" },
  { slug: "achievements", href: "/ora/achievements", labelKey: "nav.achievements", icon: Award, status: "soon" },
  { slug: "preparations", href: "/ora/preparations", labelKey: "nav.preparations", icon: Activity, status: "soon" },
  { slug: "prediction", href: "/ora/prediction", labelKey: "nav.prediction", icon: Sparkles, status: "soon" },
  { slug: "broadcast", href: "/ora/broadcast", labelKey: "nav.broadcast", icon: Radio, status: "soon" },
  { slug: "programs", href: "/ora/programs", labelKey: "nav.programs", icon: MonitorPlay, status: "soon" },
  { slug: "take-to-air", href: "/ora/take-to-air", labelKey: "nav.takeToAir", icon: Megaphone, status: "soon" },
  { slug: "control-room", href: "/ora/control-room", labelKey: "nav.controlRoom", icon: SlidersHorizontal, status: "soon" },
  { slug: "integrations", href: "/ora/integrations", labelKey: "nav.integrations", icon: Plug, status: "soon" },
];
