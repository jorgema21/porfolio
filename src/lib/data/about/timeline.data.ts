export type TimelineCategory = "study" | "infography" | "style" | "motherhood";

export type TimelineId =
  | "journalism-degree"
  | "student-media"
  | "data-discovery"
  | "visual-storytelling"
  | "editorial-design"
  | "visual-narratives"
  | "interactive-graphics"
  | "frontend-learning"
  | "svelte-start"
  | "start-lifestyle"
  | "start-motherhood"
  | "data-visual-specialization";

export type TimelineItem = {
  id: TimelineId;
  date: string;
  category: TimelineCategory;
};

export const timeline: TimelineItem[] = [
  {
    id: "journalism-degree",
    date: "2017",
    category: "study",
  },

  {
    id: "student-media",
    date: "2018",
    category: "study",
  },

  {
    id: "data-discovery",
    date: "2019",
    category: "infography",
  },

  {
    id: "visual-storytelling",
    date: "2020",
    category: "infography",
  },

  {
    id: "editorial-design",
    date: "2021",
    category: "style",
  },

  {
    id: "visual-narratives",
    date: "2022",
    category: "infography",
  },

  {
    id: "interactive-graphics",
    date: "2023",
    category: "infography",
  },

  {
    id: "frontend-learning",
    date: "2023",
    category: "study",
  },

  {
    id: "svelte-start",
    date: "2024",
    category: "infography",
  },

  {
    id: "start-lifestyle",
    date: "2024",
    category: "style",
  },

  {
    id: "start-motherhood",
    date: "2025",
    category: "motherhood",
  },

  {
    id: "data-visual-specialization",
    date: "2025",
    category: "infography",
  },
];
