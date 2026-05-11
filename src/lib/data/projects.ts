export interface ProjectTitle {
  es: string;
  en: string;
}

export type ProjectCategory = "infografia" | "estilo_de_vida";

export type ProjectVariant = "hero" | "grid" | "list" | "feature";

export interface HomeProject {
  id: string;

  title: ProjectTitle;
  description?: ProjectTitle;

  image?: string;

  mediumStyle?: string;

  category: ProjectCategory;

  variant?: ProjectVariant;

  colStart?: number;
  colSpan?: number;

  rowStart?: number;
  rowSpan?: number;

  homeVisible?: boolean;

  slug?: string;
  externalUrl?: string;
}

const projects = [
  // HERO MAIN
  {
    id: "p1",

    slug: "roland-garros-sin-nadal",

    title: {
      es: "Roland Garros sin Nadal",
      en: "Roland Garros without Nadal",
    },

    description: {
      es: "Primer campeonato sin el español",
      en: "First tournament without Nadal",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "hero",

    colStart: 1,
    colSpan: 9,

    rowStart: 1,
    rowSpan: 3,

    homeVisible: true,
  },

  // HERO SIDE
  {
    id: "p2",

    externalUrl: "proyecto-2",

    mediumStyle: "El País",

    title: {
      es: "Proyecto 2",
      en: "Project 2",
    },

    description: {
      es: "Descripción corta",
      en: "Short description",
    },

    category: "estilo_de_vida",

    variant: "list",

    colStart: 10,
    colSpan: 3,

    rowStart: 1,

    homeVisible: true,
  },

  {
    id: "p3",

    externalUrl: "proyecto-3",

    title: {
      es: "Proyecto 3",
      en: "Project 3",
    },

    description: {
      es: "Descripción corta",
      en: "Short description",
    },

    category: "estilo_de_vida",

    variant: "list",

    colStart: 10,
    colSpan: 3,

    rowStart: 2,

    homeVisible: true,
  },

  {
    id: "p4",

    externalUrl: "proyecto-4",

    title: {
      es: "Proyecto 4",
      en: "Project 4",
    },

    description: {
      es: "Descripción corta",
      en: "Short description",
    },

    category: "estilo_de_vida",

    variant: "list",

    colStart: 10,
    colSpan: 3,

    rowStart: 3,

    homeVisible: true,
  },

  // GRID TOP
  {
    id: "p5",

    slug: "adios-xavi",

    title: {
      es: "El adiós de Xavi",
      en: "The Goodbye of Xavi",
    },

    description: {
      es: "Xavi anuncia que se va",
      en: "Xavi announces he leaves",
    },

    image: "/images/projects/adios-xavi-ip.jpg",

    category: "infografia",

    variant: "grid",

    colStart: 1,
    colSpan: 4,

    rowStart: 5,

    homeVisible: true,
  },

  {
    id: "p6",

    slug: "incendio-tenerife",

    title: {
      es: "El incendio de Tenerife",
      en: "The fire in Tenerife",
    },

    description: {
      es: "La isla de Tenerife está en peligro",
      en: "Tenerife island is in danger",
    },

    image: "/images/projects/incendio-tenerife-ip.jpg",

    category: "infografia",

    variant: "grid",

    colStart: 5,
    colSpan: 4,

    rowStart: 5,

    homeVisible: true,
  },

  {
    id: "p7",

    slug: "proyecto-7",

    title: {
      es: "Proyecto 7",
      en: "Project 7",
    },

    description: {
      es: "Descripción breve",
      en: "Short description",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "grid",

    colStart: 9,
    colSpan: 4,

    rowStart: 5,

    homeVisible: true,
  },

  // FEATURES
  {
    id: "p8",

    slug: "proyecto-8",

    title: {
      es: "Proyecto 8",
      en: "Project 8",
    },

    description: {
      es: "Proyecto destacado",
      en: "Featured project",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "feature",

    colStart: 1,
    colSpan: 12,

    rowStart: 7,

    homeVisible: true,
  },

  {
    id: "p9",

    slug: "proyecto-9",

    title: {
      es: "Proyecto 9",
      en: "Project 9",
    },

    description: {
      es: "Proyecto destacado",
      en: "Featured project",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "feature",

    colStart: 1,
    colSpan: 12,

    rowStart: 8,

    homeVisible: true,
  },

  // LIST BLOCK
  {
    id: "p10",

    externalUrl: "proyecto-10",

    title: {
      es: "Proyecto 10",
      en: "Project 10",
    },

    description: {
      es: "Texto corto",
      en: "Short text",
    },

    category: "estilo_de_vida",

    variant: "list",

    colStart: 1,
    colSpan: 3,

    rowStart: 12,

    homeVisible: true,
  },

  {
    id: "p11",

    externalUrl: "proyecto-11",

    title: {
      es: "Proyecto 11",
      en: "Project 11",
    },

    description: {
      es: "Texto corto",
      en: "Short text",
    },

    category: "estilo_de_vida",

    variant: "list",

    colStart: 1,
    colSpan: 3,

    rowStart: 13,

    homeVisible: true,
  },

  {
    id: "p12",

    externalUrl: "proyecto-12",

    title: {
      es: "Proyecto 12",
      en: "Project 12",
    },

    description: {
      es: "Texto corto",
      en: "Short text",
    },

    category: "estilo_de_vida",

    variant: "list",

    colStart: 1,
    colSpan: 3,

    rowStart: 14,

    homeVisible: true,
  },

  // HERO BOTTOM
  {
    id: "p13",

    slug: "proyecto-13",

    title: {
      es: "Proyecto 13",
      en: "Project 13",
    },

    description: {
      es: "Proyecto final",
      en: "Final project",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "hero",

    colStart: 4,
    colSpan: 9,

    rowStart: 12,
    rowSpan: 3,

    homeVisible: true,
  },

  // FINAL GRID
  {
    id: "p14",

    slug: "proyecto-14",

    title: {
      es: "Proyecto 14",
      en: "Project 14",
    },

    description: {
      es: "Proyecto final",
      en: "Final project",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "grid",

    colStart: 1,
    colSpan: 4,

    rowStart: 10,

    homeVisible: true,
  },

  {
    id: "p15",

    slug: "proyecto-15",

    title: {
      es: "Proyecto 15",
      en: "Project 15",
    },

    description: {
      es: "Proyecto final",
      en: "Final project",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "grid",

    colStart: 5,
    colSpan: 4,

    rowStart: 10,

    homeVisible: true,
  },

  {
    id: "p16",

    slug: "proyecto-16",

    title: {
      es: "Proyecto 16",
      en: "Project 16",
    },

    description: {
      es: "Proyecto final",
      en: "Final project",
    },

    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",

    category: "infografia",

    variant: "grid",

    colStart: 9,
    colSpan: 4,

    rowStart: 10,

    homeVisible: true,
  },

  // no HOME
  // infografia
  {
    id: "p17",
    slug: "proyecto-17",
    title: { es: "Proyecto 17", en: "Project 17" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p18",
    slug: "proyecto-18",
    title: { es: "Proyecto 18", en: "Project 18" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p19",
    slug: "proyecto-19",
    title: { es: "Proyecto 19", en: "Project 19" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p20",
    slug: "proyecto-20",
    title: { es: "Proyecto 20", en: "Project 20" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p21",
    slug: "proyecto-21",
    title: { es: "Proyecto 21", en: "Project 21" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p22",
    slug: "proyecto-22",
    title: { es: "Proyecto 22", en: "Project 22" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p23",
    slug: "proyecto-23",
    title: { es: "Proyecto 23", en: "Project 23" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p24",
    slug: "proyecto-24",
    title: { es: "Proyecto 24", en: "Project 24" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p25",
    slug: "proyecto-25",
    title: { es: "Proyecto 25", en: "Project 25" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p26",
    slug: "proyecto-26",
    title: { es: "Proyecto 26", en: "Project 26" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p27",
    slug: "proyecto-27",
    title: { es: "Proyecto 27", en: "Project 27" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p28",
    slug: "proyecto-28",
    title: { es: "Proyecto 28", en: "Project 28" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p29",
    slug: "proyecto-29",
    title: { es: "Proyecto 29", en: "Project 29" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p30",
    slug: "proyecto-30",
    title: { es: "Proyecto 30", en: "Project 30" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p31",
    slug: "proyecto-31",
    title: { es: "Proyecto 31", en: "Project 31" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p32",
    slug: "proyecto-32",
    title: { es: "Proyecto 32", en: "Project 32" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p33",
    slug: "proyecto-33",
    title: { es: "Proyecto 33", en: "Project 33" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p34",
    slug: "proyecto-34",
    title: { es: "Proyecto 34", en: "Project 34" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p35",
    slug: "proyecto-35",
    title: { es: "Proyecto 35", en: "Project 35" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p36",
    slug: "proyecto-36",
    title: { es: "Proyecto 36", en: "Project 36" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p37",
    slug: "proyecto-37",
    title: { es: "Proyecto 37", en: "Project 37" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p38",
    slug: "proyecto-38",
    title: { es: "Proyecto 38", en: "Project 38" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p39",
    slug: "proyecto-39",
    title: { es: "Proyecto 39", en: "Project 39" },
    description: {
      es: "Proyecto de infografía fuera de home",
      en: "Infographic project not in home",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.jpg",
    category: "infografia",
    homeVisible: false,
  },

  //estilo
  {
    id: "p40",
    externalUrl: "proyecto-40",
    title: { es: "Proyecto 40", en: "Project 40" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p41",
    externalUrl: "proyecto-41",
    title: { es: "Proyecto 41", en: "Project 41" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p42",
    externalUrl: "proyecto-42",
    title: { es: "Proyecto 42", en: "Project 42" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p43",
    externalUrl: "proyecto-43",
    title: { es: "Proyecto 43", en: "Project 43" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p44",
    externalUrl: "proyecto-44",
    title: { es: "Proyecto 44", en: "Project 44" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p45",
    externalUrl: "proyecto-45",
    title: { es: "Proyecto 45", en: "Project 45" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p46",
    externalUrl: "proyecto-46",
    title: { es: "Proyecto 46", en: "Project 46" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p47",
    externalUrl: "proyecto-47",
    title: { es: "Proyecto 47", en: "Project 47" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p48",
    externalUrl: "proyecto-48",
    title: { es: "Proyecto 48", en: "Project 48" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p49",
    externalUrl: "proyecto-49",
    title: { es: "Proyecto 49", en: "Project 49" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
  {
    id: "p50",
    externalUrl: "proyecto-50",
    title: { es: "Proyecto 50", en: "Project 50" },
    description: { es: "Texto corto", en: "Short text" },
    category: "estilo_de_vida",
    homeVisible: false,
  },
] satisfies HomeProject[];

export default projects;
