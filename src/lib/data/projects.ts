// =========================
// TYPES (CLEAN & CONTENT-ONLY)
// =========================

export type Category = "infografia" | "estilo";

export interface ProjectTitle {
  es: string;
  en: string;
}

export interface Project {
  id: string;
  slug: string;

  title: ProjectTitle;
  description?: ProjectTitle;

  category?: Category;
  image?: string;

  tags?: string[];
  date?: string;
}

// =========================
// DATA (FIXED STRUCTURE SOURCE)
// =========================

export const projects: Project[] = [
  // =========================
  // HERO MAIN (1)
  // =========================
  {
    id: "p1",
    slug: "proyecto-1",
    title: {
      es: "Proyecto 1",
      en: "Project 1",
    },
    description: {
      es: "Descripción del proyecto 1",
      en: "Project 1 description",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
  },

  // =========================
  // HERO SIDE (3)
  // =========================
  {
    id: "p2",
    slug: "proyecto-2",
    title: { es: "Proyecto 2", en: "Project 2" },
    description: { es: "Descripción corta", en: "Short description" },
    category: "estilo",
  },

  {
    id: "p3",
    slug: "proyecto-3",
    title: { es: "Proyecto 3", en: "Project 3" },
    description: { es: "Descripción corta", en: "Short description" },
    category: "estilo",
  },

  {
    id: "p4",
    slug: "proyecto-4",
    title: { es: "Proyecto 4", en: "Project 4" },
    description: { es: "Descripción corta", en: "Short description" },
    category: "infografia",
  },

  // =========================
  // GRID ROW (3)
  // =========================
  {
    id: "p5",
    slug: "proyecto-5",
    title: { es: "Proyecto 5", en: "Project 5" },
    description: { es: "Descripción breve", en: "Short description" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
  },

  {
    id: "p6",
    slug: "proyecto-6",
    title: { es: "Proyecto 6", en: "Project 6" },
    description: { es: "Descripción breve", en: "Short description" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "estilo",
  },

  {
    id: "p7",
    slug: "proyecto-7",
    title: { es: "Proyecto 7", en: "Project 7" },
    description: { es: "Descripción breve", en: "Short description" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
  },

  // =========================
  // FEATURE BLOCKS (2)
  // =========================
  {
    id: "p8",
    slug: "proyecto-8",
    title: { es: "Proyecto 8", en: "Project 8" },
    description: { es: "Proyecto destacado", en: "Featured project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
  },

  {
    id: "p9",
    slug: "proyecto-9",
    title: { es: "Proyecto 9", en: "Project 9" },
    description: { es: "Proyecto destacado", en: "Featured project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "estilo",
  },

  // =========================
  // LIST BLOCK (3 sin imagen)
  // =========================

  {
    id: "p10",
    slug: "proyecto-10",
    title: { es: "Proyecto 10", en: "Project 10" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo",
  },

  {
    id: "p11",
    slug: "proyecto-11",
    title: { es: "Proyecto 11", en: "Project 11" },
    description: { es: "Texto corto", en: "Short text" },
    category: "infografia",
  },

  {
    id: "p12",
    slug: "proyecto-12",
    title: { es: "Proyecto 12", en: "Project 12" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo",
  },

  // =========================
  // FINAL GRID (4 con imagen) ← actualizado
  // =========================

  {
    id: "p13",
    slug: "proyecto-13",
    title: { es: "Proyecto 13", en: "Project 13" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
  },

  {
    id: "p14",
    slug: "proyecto-14",
    title: { es: "Proyecto 14", en: "Project 14" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "estilo",
  },

  {
    id: "p15",
    slug: "proyecto-15",
    title: { es: "Proyecto 15", en: "Project 15" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
  },

  {
    id: "p16",
    slug: "proyecto-16",
    title: { es: "Proyecto 16", en: "Project 16" },
    description: { es: "Proyecto final", en: "Final project" },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "estilo",
  },
];
