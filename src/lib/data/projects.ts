export type HomeZone =
  | "heroMain"
  | "heroSide"
  | "gridTop"
  | "features"
  | "listBlock"
  | "heroBottom"
  | "finalGrid";

export interface ProjectTitle {
  es: string;
  en: string;
}

export interface Project {
  id: string;
  slug: string;
  title: ProjectTitle;

  description: {
    es: string;
    en: string;
  };

  image?: string;
  category: string;

  // 🔥 SISTEMA ÚNICO
  homeZone: HomeZone;
  homeOrder?: number;
  homeVisible?: boolean;
}

const projects: Project[] = [
  // HERO MAIN
  {
    id: "p1",
    slug: "proyecto-1",
    title: { es: "Proyecto 1", en: "Project 1" },
    description: {
      es: "Descripción del proyecto 1",
      en: "Project 1 description",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "heroMain",
    homeOrder: 1,
    homeVisible: true
  },

  // HERO SIDE
  {
    id: "p2",
    slug: "proyecto-2",
    title: { es: "Proyecto 2", en: "Project 2" },
    description: { es: "Descripción corta", en: "Short description" },
    category: "estilo",
    homeZone: "heroSide",
    homeOrder: 1,
    homeVisible: true
  },
  {
    id: "p3",
    slug: "proyecto-3",
    title: { es: "Proyecto 3", en: "Project 3" },
    description: { es: "Descripción corta", en: "Short description" },
    category: "estilo",
    homeZone: "heroSide",
    homeOrder: 2,
    homeVisible: true
  },
  {
    id: "p4",
    slug: "proyecto-4",
    title: { es: "Proyecto 4", en: "Project 4" },
    description: { es: "Descripción corta", en: "Short description" },
    category: "estilo",
    homeZone: "heroSide",
    homeOrder: 3,
    homeVisible: true
  },

  // GRID TOP
  {
    id: "p5",
    slug: "proyecto-5",
    title: { es: "Proyecto 5", en: "Project 5" },
    description: { es: "Descripción breve", en: "Short description" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "gridTop",
    homeOrder: 1,
    homeVisible: true
  },
  {
    id: "p6",
    slug: "proyecto-6",
    title: { es: "Proyecto 6", en: "Project 6" },
    description: { es: "Descripción breve", en: "Short description" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "gridTop",
    homeOrder: 2,
    homeVisible: true
  },
  {
    id: "p7",
    slug: "proyecto-7",
    title: { es: "Proyecto 7", en: "Project 7" },
    description: { es: "Descripción breve", en: "Short description" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "gridTop",
    homeOrder: 3,
    homeVisible: true
  },

  // FEATURES
  {
    id: "p8",
    slug: "proyecto-8",
    title: { es: "Proyecto 8", en: "Project 8" },
    description: { es: "Proyecto destacado", en: "Featured project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "features",
    homeOrder: 1,
    homeVisible: true
  },
  {
    id: "p9",
    slug: "proyecto-9",
    title: { es: "Proyecto 9", en: "Project 9" },
    description: { es: "Proyecto destacado", en: "Featured project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "features",
    homeOrder: 2,
    homeVisible: true
  },

  // LIST BLOCK
  {
    id: "p10",
    slug: "proyecto-10",
    title: { es: "Proyecto 10", en: "Project 10" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo",
    homeZone: "listBlock",
    homeOrder: 1,
    homeVisible: true
  },
  {
    id: "p11",
    slug: "proyecto-11",
    title: { es: "Proyecto 11", en: "Project 11" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo",
    homeZone: "listBlock",
    homeOrder: 2,
    homeVisible: true
  },
  {
    id: "p12",
    slug: "proyecto-12",
    title: { es: "Proyecto 12", en: "Project 12" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo",
    homeZone: "listBlock",
    homeOrder: 3,
    homeVisible: true
  },

  // BOTTOM / FINAL
  {
    id: "p13",
    slug: "proyecto-13",
    title: { es: "Proyecto 13", en: "Project 13" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "heroBottom",
    homeOrder: 1,
    homeVisible: true
  },
  {
    id: "p14",
    slug: "proyecto-14",
    title: { es: "Proyecto 14", en: "Project 14" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "finalGrid",
    homeOrder: 1,
    homeVisible: true
  },
  {
    id: "p15",
    slug: "proyecto-15",
    title: { es: "Proyecto 15", en: "Project 15" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "finalGrid",
    homeOrder: 2,
    homeVisible: true
  },
  {
    id: "p16",
    slug: "proyecto-16",
    title: { es: "Proyecto 16", en: "Project 16" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeZone: "finalGrid",
    homeOrder: 3,
    homeVisible: true
  },
];

export default projects;