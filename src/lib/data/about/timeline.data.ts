export type TimelineCategory = "study" | "infography" | "style" | "parenting";

export type TimelineId =
  | "journalism-degree"
  | "erasmus-year"
  | "end-degree"
  | "start-ep"
  | "start-internship"
  | "end-internship"
  | "sports-ep"
  | "start-freelance"
  | "end-a14"
  | "start-lifestyle"
  | "start-parenting"
  | "start-sty"
  | "start-col"
  | "start-epgente"
  | "start-dataista"
  | "this-portfolio";

export type TimelineItem = {
  readonly id: TimelineId;
  readonly date: string;
  readonly category: TimelineCategory;
};

const rawTimeline = [
  { id: "journalism-degree", date: "09-2017", category: "study" },
  { id: "erasmus-year", date: "09-2019", category: "study" },
  { id: "end-degree", date: "07-2021", category: "study" },
  { id: "start-ep", date: "10-2021", category: "study" },
  { id: "start-internship", date: "09-2022", category: "infography" },
  { id: "end-internship", date: "09-2023", category: "infography" },
  { id: "sports-ep", date: "02-2024", category: "infography" },
  { id: "start-freelance", date: "04-2024", category: "infography" },
  { id: "end-a14", date: "12-2024", category: "infography" },
  { id: "start-lifestyle", date: "02-2025", category: "style" },
  { id: "start-parenting", date: "04-2025", category: "parenting" },
  { id: "start-sty", date: "05-2025", category: "infography" },
  { id: "start-col", date: "05-2025", category: "infography" },
  { id: "start-epgente", date: "09-2025", category: "style" },
  { id: "start-dataista", date: "11-2025", category: "study" },
  { id: "this-portfolio", date: "06-2026", category: "study" },
] as const satisfies readonly TimelineItem[];

export const timeline: TimelineItem[] = [...rawTimeline].sort(
  (a, b) => Number(a.date) - Number(b.date),
);
