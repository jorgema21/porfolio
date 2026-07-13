import type { SkillId } from "$lib/data/about/skills.data";

export type SkillLocale = Record<
  SkillId,
  {
    name: string;
    description: string;
    details: string[];
  }
>;

export type SkillsI18n = {
  es: SkillLocale;
  en: SkillLocale;
};

export const skills = {
  es: {
    datawrapper: {
      name: "Datawrapper",
      description:
        "Mi mayor fuerte en visualización interactiva y la primera herramienta que dominé.",
      details: [
        "De gráficos simples a integración con la API de R.",
        "Importación de JSON en mapas localizadores e imágenes en tablas.",
        "Personalización de títulos, descripciones y tooltips con HTML, CSS y Javascript.",
        "Gráficos de dispersión y de calor con ideas avanzadas.",
        "Próximo objetivo: automatizar datos, hacer gráficos avanzados desde R y crear mapas coropléticos con JSON.",
      ],
    },
    flourish: {
      name: "Flourish",
      description:
        "Herramienta aprendida de manera autodidacta para narrativas visuales fáciles y complejas.",
      details: [
        "Creación desde gráficos simples a diagramas de Sankey, treemaps y gráficos animados.",
        "Mapas coropléticos interactivos con archivos JSON propios.",
        "Próximo objetivo: Dominar proyectos de scrollytelling avanzado y conexiones a bases de datos en vivo.",
      ],
    },
    illustrator: {
      name: "Illustrator",
      description:
        "Herramienta clave para diseño vectorial, infografía estática y tratamiento de visualizaciones de datos.",
      details: [
        "Flujo de trabajo con ai2html para exportar vectores web adaptativos.",
        "Manejo de transparencias, degradados, múltiples artboards e importación de SVG/PDF.",
        "Uso de la herramienta nativa de gráficos.",
        "Scrollytelling estático controlando la visibilidad de capas.",
        "Próximo objetivo: Mejorar en dibujo complejo, perspectivas creativas y automatización con scripts.",
      ],
    },
    googlesheets: {
      name: "Google Sheets",
      description:
        "Entorno principal para la limpieza y análisis sencillo de datos.",
      details: [
        "Filtrado condicional, orden y uso de fórmulas de búsqueda como VLOOKUP.",
        "Conexión directa de hojas de cálculo con Datawrapper y RStudio a través de GoogleSheets4 con API.",
        "Uso de tablas dinámicas.",
        "Pruebas en la automatización con fórmulas personalizadas en Apps Script.",
        "Próximo objetivo: Ampliar el catálogo de funciones avanzadas para optimizar el procesamiento numérico.",
      ],
    },
    photoshop: {
      name: "Photoshop",
      description:
        "Herramienta de aprendizaje autodidacta para montajes y edición fotográfica digital.",
      details: [
        "Recorte de imágenes, ajustes de contraste, niveles y virado a blanco y negro.",
        "Gestión funcional de archivos mediante capas de ajuste y uso de pinceles.",
        "Próximo objetivo: Aprender más a fondo nuevas funciones, agilizar flujo de trabajo y estudiar características de composición, paleta cromática y jerarquía.",
      ],
    },
    rstudio: {
      name: "RStudio",
      description:
        "Entorno inicial de programación para el análisis de datos masivos y complejos.",
      details: [
        "Limpieza y transformación de datasets mediante Tidyverse.",
        "Generación y modelado de gráficos con el paquete ggplot2.",
        "Desarrollo y aprendizaje ágil asistido por IA enfocado en la resolución de problemas y consumo de APIs.",
        "Herramienta prioritaria en mi plan de crecimiento y especialización profesional.",
        "Próximo objetivo: Profundizar en estadística avanzada, cartografía y desarrollo y conocimiento de paquetes.",
      ],
    },
    qgis: {
      name: "QGIS",
      description:
        "Uso cartográfico para la exploración y análisis de datos geográficos complejos.",
      details: [
        "Carga y visualización de capas vectoriales (GeoJSON, Shapefiles) y proyecciones.",
        "Datos e información geográfica básica mediante la API de OpenStreetMap.",
        "Cruces de datos espaciales y de atributos asistidos con IA.",
        "Próximo objetivo: Dominar de forma autónoma grandes historias cartográficas y modelado de mapas físicos.",
      ],
    },
    premiere: {
      name: "Premiere Pro",
      description:
        "Herramientas de edición para montaje de video y piezas multimedia.",
      details: [
        "Composición de clips de video y audio mediante efectos y transiciones sencillas.",
        "Animación básica de textos, grafismos y cartelas utilizando fotogramas clave (keyframes).",
        "Próximo objetivo: Dominar y conocer más a fondo flujos profesionales. ",
      ],
    },
    code: {
      name: "HTML5 / CSS3 / JS (Nativo)",
      description:
        "Salto al desarrollo web en para superar los límites de las plantillas de gráficos sin código.",
      details: [
        "Maquetación de documentos estáticos e interactivos con HTML5 y CSS3.",
        "Despliegue y control de versiones en proyectos alojados en GitHub y GitLab propios y colaborativos mediante git.",
        "Uso de la IA como copiloto para optimizar y aprender código dinámico.",
        "Enfoque en crear narrativas web estáticas con una personalización única.",
        "Próximo objetivo: Ganar autonomía completa en JavaScript para depender menos de la IA como aprendizaje.",
      ],
    },
    svelte: {
      name: "Svelte 5 & D3.js",
      description:
        "Ecosistema para crear experiencias de visualización a medida para gráficos, mapas y narrativas visuales.",
      details: [
        "Desarrollo de interfaces reactivas con la sintaxis de Runes en Svelte 5 y en SvelteKit.",
        "Integración guiada de D3.js para trabajar con cálculos matemáticos y escalas.",
        "Práctica intensiva asistida por IA orientada a proyectos personales y soporte profesional.",
        "Objetivo prioritario de aprendizaje para crear historias visuales complejas interactivas",
        "Próximo objetivo: Aprender más a fondo Svelte 5, SvelteKit y modos de optimización de trabajo",
      ],
    },
    blender: {
      name: "Blender",
      description:
        "Herramienta autodidacta de experimentación en 3D sin uso profesional.",
      details: [
        "Modelado básico enfocado en la exportación de siluetas hacia Illustrator.",
        "Composición sencilla de escenas mediante personajes, escenarios estáticos e iluminación.",
        "Animación guiada de elementos de la escena y desplazamientos de cámara mediante keyframes.",
        "Próximo objetivo: Dominar el flujo técnico de importaciones de mapas, texturas complejas y optimización de renderizado.",
      ],
    },
    aftereffects: {
      name: "After Effects",
      description:
        "Herramienta enfocada en la introducción al movimiento gráfico.",
      details: [
        "Creación de composiciones y grafismos elementales mediante capas independientes.",
        "Uso inicial de fotogramas clave (keyframes) para animar transformaciones lineales sencillas.",
        "Próximo objetivo: Aprender más a fondo la herramienta enfocado en la visualización de datos.",
      ],
    },
  },

  en: {
    datawrapper: {
      name: "Datawrapper",
      description:
        "My core strength for interactive visualization and the very first tool I mastered.",
      details: [
        "From simple charts to R API integration.",
        "Importing JSON into locator maps and embedding images in tables.",
        "Customizing titles, descriptions, and tooltips using HTML, CSS, and JavaScript.",
        "Scatter plots and heatmaps with advanced insights.",
        "Next up: Data automation, advanced R-driven charting, and JSON choropleth maps.",
      ],
    },
    flourish: {
      name: "Flourish",
      description:
        "A self-taught tool used to create both simple and complex visual narratives.",
      details: [
        "Building everything from simple plots to Sankey diagrams, treemaps, and animated charts.",
        "Developing interactive choropleth maps using custom JSON files.",
        "Next up: Mastering advanced scrollytelling projects and live data feed connections.",
      ],
    },
    illustrator: {
      name: "Illustrator",
      description:
        "My primary tool for vector design, static graphics, and data visualization processing.",
      details: [
        "Streamlined workflow with ai2html to deploy responsive, web-ready vector graphics.",
        "Handling clipping masks, gradients, multi-artboard systems, and SVG/PDF imports.",
        "Utilizing native charting tools.",
        "Structuring static scrollytelling by controlling layer visibility parameters.",
        "Next up: Improving complex drawing, creative perspective layouts, and script automation.",
      ],
    },
    googlesheets: {
      name: "Google Sheets",
      description:
        "My primary environment for data cleaning and straightforward analysis.",
      details: [
        "Conditional filtering, advanced sorting, and implementing lookup functions like VLOOKUP.",
        "Directly connecting spreadsheets to Datawrapper and RStudio using the googlesheets4 API package.",
        "Utilizing pivot tables.",
        "Experimenting with custom workflow automation via Apps Script formulas.",
        "Next up: Expanding my core function catalog to optimize numerical data processing.",
      ],
    },
    photoshop: {
      name: "Photoshop",
      description:
        "A self-taught tool used for compositing and digital image editing.",
      details: [
        "Image cropping, contrast adjustments, levels tuning, and black-and-white conversion.",
        "Functional asset management utilizing adjustment layers and brushes.",
        "Next up: Deep-diving into new features, streamlining workflows, and studying compositing characteristics, color palettes, and hierarchy frameworks.",
      ],
    },
    rstudio: {
      name: "RStudio",
      description:
        "My initial programming environment for high-volume, complex data analysis.",
      details: [
        "Data cleaning and transformation workflows utilizing Tidyverse.",
        "Generating and modeling statistical graphics via the ggplot2 package.",
        "AI-assisted agile development and learning focused on problem-solving and visual API consumption.",
        "A high-priority tool in my roadmap for professional growth and specialization.",
        "Next up: Deep-diving into advanced statistics, script-driven mapping, and custom package development and mechanics.",
      ],
    },
    qgis: {
      name: "QGIS",
      description:
        "Cartographic framework used for exploring and analyzing complex geographic datasets.",
      details: [
        "Loading and visualizing vector layers (GeoJSON, Shapefiles) and handling coordinate projections.",
        "Basic ingestion of geographic data and features utilizing the OpenStreetMap API.",
        "AI-assisted spatial data associations and attribute table joins.",
        "Next up: Gaining autonomy in large-scale cartographic storytelling and physical map modeling.",
      ],
    },
    premiere: {
      name: "Premiere Pro",
      description:
        "Editing toolsets used for video assembly and multimedia pieces.",
      details: [
        "Editing video and audio clips using straightforward effects and transitions.",
        "Basic animation of titles, graphic assets, and text lower-thirds using keyframes.",
        "Next up: Mastering and deep-diving into professional post-production workflows.",
      ],
    },
    code: {
      name: "HTML5 / CSS3 / JS (Native)",
      description:
        "Stepping into web development to bypass no-code data visualization template restrictions.",
      details: [
        "Structuring static and interactive document layouts using HTML5 and CSS3.",
        "Deploying and managing version control for personal and collaborative projects hosted on GitHub and GitLab via git.",
        "Leveraging AI as a co-pilot to optimize workflows and learn dynamic scripting.",
        "Focused on building static web narratives with unique, custom styling.",
        "Next up: Gaining complete syntactic autonomy in JavaScript to reduce AI dependency throughout the learning process.",
      ],
    },
    svelte: {
      name: "Svelte 5 & D3.js",
      description:
        "Tech stack built to power custom visualization layouts, maps, and tailored visual narratives.",
      details: [
        "Developing reactive interfaces implementing modern Runes syntax in Svelte 5 and SvelteKit architectures.",
        "Guided D3.js integration to process mathematical calculations and scales.",
        "Intensive AI-assisted practice focused on personal development projects and professional support.",
        "A high-priority learning objective aimed at creating complex, interactive visual stories.",
        "Next up: Deep-diving into Svelte 5, SvelteKit, and workflow optimization methods.",
      ],
    },
    blender: {
      name: "Blender",
      description:
        "A self-taught sandbox for 3D exploration and experimentation outside of professional scope.",
      details: [
        "Basic modeling focused on exporting mesh silhouettes into Illustrator pipelines.",
        "Simple scene composition including character layout, static environments, and lighting setups.",
        "Guided animation of scene elements and camera sweeps utilizing keyframe parameters.",
        "Next up: Mastering autonomous workflows for map imports, custom textures, and render optimization.",
      ],
    },
    aftereffects: {
      name: "After Effects",
      description:
        "An entry-level toolset focused on introducing motion graphics core concepts.",
      details: [
        "Creating simple compositions and elemental motion assets using separate layers.",
        "Early-stage use of keyframes to drive simple, linear transform property transitions.",
        "Next up: Deep-diving into the tool with a specialized focus on data visualization integration.",
      ],
    },
  },
} satisfies SkillsI18n;
