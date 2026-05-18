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
  title: string;
  description: string;
  category: TimelineCategory;
};

export const timeline: TimelineItem[] = [
  {
    id: "journalism-degree",
    date: "2017",
    title: "Grado en Periodismo",
    description: "Inicio de la carrera y primeros proyectos narrativos.",
    category: "study",
  },

  {
    id: "student-media",
    date: "2018",
    title: "Primeros medios universitarios",
    description:
      "Participación en proyectos de redacción, entrevistas y reportajes.",
    category: "study",
  },

  {
    id: "data-discovery",
    date: "2019",
    title: "Descubrimiento del periodismo de datos",
    description:
      "Primer contacto con visualización, hojas de cálculo y gráficos.",
    category: "infography",
  },

  {
    id: "visual-storytelling",
    date: "2020",
    title: "Narrativa visual",
    description:
      "Desarrollo de piezas donde diseño y texto trabajan conjuntamente.",
    category: "infography",
  },

  {
    id: "editorial-design",
    date: "2021",
    title: "Diseño editorial",
    description:
      "Aprendizaje de composición visual, jerarquía y ritmo gráfico.",
    category: "style",
  },

  {
    id: "visual-narratives",
    date: "2022",
    title: "Narrativas Visuales",
    description: "Especialización intensiva en infografía y datos.",
    category: "infography",
  },

  {
    id: "interactive-graphics",
    date: "2023",
    title: "Visualizaciones interactivas",
    description: "Creación de proyectos digitales con enfoque scrollytelling.",
    category: "infography",
  },

  {
    id: "frontend-learning",
    date: "2023",
    title: "Aprendizaje frontend",
    description: "HTML, CSS y JavaScript orientado a visualización.",
    category: "study",
  },

  {
    id: "svelte-start",
    date: "2024",
    title: "Primeros proyectos con Svelte",
    description: "Componentes interactivos y sistemas reutilizables.",
    category: "infography",
  },

  {
    id: "start-lifestyle",
    date: "2024",
    title: "Inicio estilo de vida",
    description: "Nueva arquitectura visual centrada en narrativa.",
    category: "style",
  },

  {
    id: "start-motherhood",
    date: "2025",
    title: "Inicio maternidad",
    description: "Proyectos de maternidad y estilo de vida.",
    category: "motherhood",
  },

  {
    id: "data-visual-specialization",
    date: "2025",
    title: "Especialización en visualización",
    description: "Profundización en gráficos interactivos y scrollytelling.",
    category: "infography",
  },
];
