import type { SkillId } from "#lib/data/about/skills.data.js";

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
        "Mi principal fortaleza en visualización interactiva y la primera herramienta que dominé.",
      details: [
        "Desde gráficos sencillos hasta su integración con R mediante API.",
        "Importación de JSON en mapas localizadores e imágenes en tablas.",
        "Personalización de títulos, descripciones y tooltips con HTML, CSS y Javascript.",
        "Gráficos de dispersión y de calor con ideas avanzadas.",
        "Próximo objetivo: automatizar datos, hacer gráficos avanzados desde R y crear mapas coropléticos con JSON.",
      ],
    },
    flourish: {
      name: "Flourish",
      description:
        "Herramienta que aprendí de forma autodidacta para crear narrativas visuales sencillas y complejas.",
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
        "Flujo de trabajo con ai2html para exportar gráficos vectoriales adaptables a la web.",
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
        "Filtros, ordenación de datos y fórmulas de búsqueda como VLOOKUP.",
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
        "Próximo objetivo: Agilizar mi flujo de trabajo y mejorar mis conocimientos de composición, color y jerarquía visual.",
      ],
    },
    rstudio: {
      name: "RStudio",
      description:
        "Entorno inicial de programación para el análisis de datos masivos y complejos.",
      details: [
        "Limpieza y transformación de datasets mediante Tidyverse.",
        "Generación y modelado de gráficos con el paquete ggplot2.",
        "Aprendizaje y desarrollo asistidos por IA, centrados en resolver problemas y trabajar con APIs.",
        "Herramienta prioritaria en mi plan de crecimiento y especialización profesional.",
        "Próximo objetivo: Profundizar en estadística avanzada, cartografía y desarrollo y funcionamiento de paquetes de R.",
      ],
    },
    qgis: {
      name: "QGIS",
      description:
        "Herramienta cartográfica para explorar y analizar datos geográficos complejos.",
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
        "Próximo objetivo: Profundizar en los flujos de trabajo profesionales de edición de vídeo.",
      ],
    },
    code: {
      name: "HTML5 / CSS3 / JS (Nativo)",
      description:
        "Primeros pasos en desarrollo web para superar las limitaciones de las plantillas de visualización sin código.",
      details: [
        "Maquetación de documentos estáticos e interactivos con HTML5 y CSS3.",
        "Despliegue y control de versiones en proyectos alojados en GitHub y GitLab propios y colaborativos mediante git.",
        "Uso de la IA como copiloto para optimizar y aprender código dinámico.",
        "Enfoque en crear narrativas web estáticas con una personalización única.",
        "Próximo objetivo: Ganar autonomía en JavaScript y depender menos de la IA durante el aprendizaje.",
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
        "Objetivo prioritario de aprendizaje para crear historias visuales complejas e interactivas.",
        "Próximo objetivo: Profundizar en Svelte 5 y SvelteKit y mejorar mis flujos de trabajo.",
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
        "Próximo objetivo: Aprender a importar mapas, trabajar con texturas complejas y optimizar el renderizado.",
      ],
    },
    aftereffects: {
      name: "After Effects",
      description:
        "Herramienta enfocada en la introducción al movimiento gráfico.",
      details: [
        "Creación de composiciones y grafismos elementales mediante capas independientes.",
        "Uso inicial de fotogramas clave (keyframes) para animar transformaciones lineales sencillas.",
        "Próximo objetivo: Profundizar en la herramienta y aplicarla a la visualización de datos.",
      ],
    },
  },

  en: {
    datawrapper: {
      name: "Datawrapper",
      description:
        "My core strength for interactive visualization and the very first tool I mastered.",
      details: [
        "From simple charts to integration with R through APIs.",
        "Importing JSON into locator maps and embedding images in tables.",
        "Customizing titles, descriptions, and tooltips using HTML, CSS, and JavaScript.",
        "Scatter plots and heatmaps with advanced customization.",
        "Next up: Data automation, advanced R-driven charting, and JSON choropleth maps.",
      ],
    },
    flourish: {
      name: "Flourish",
      description:
        "A tool I taught myself to use for creating both simple and complex visual stories.",
      details: [
        "Building everything from simple plots to Sankey diagrams, treemaps, and animated charts.",
        "Developing interactive choropleth maps using custom JSON files.",
        "Next up: Learning advanced scrollytelling techniques and connecting projects to live data sources.",
      ],
    },
    illustrator: {
      name: "Illustrator",
      description:
        "My primary tool for vector design, static graphics, and data visualization processing.",
      details: [
        "Using ai2html to export responsive graphics for the web.",
        "Working with transparency, gradients, multiple artboards, and SVG/PDF imports.",
        "Utilizing native charting tools.",
        "Creating static scrollytelling experiences by controlling layer visibility.",
        "Next up: Improving complex drawing, creative perspective layouts, and script automation.",
      ],
    },
    googlesheets: {
      name: "Google Sheets",
      description:
        "My primary environment for data cleaning and straightforward analysis.",
      details: [
        "Filtering and sorting data, and using lookup functions such as VLOOKUP.",
        "Directly connecting spreadsheets to Datawrapper and RStudio using the googlesheets4 API package.",
        "Utilizing pivot tables.",
        "Experimenting with automation using custom functions in Apps Script.",
        "Next up: Expanding my core function catalog to optimize numerical data processing.",
      ],
    },
    photoshop: {
      name: "Photoshop",
      description:
        "A self-taught tool used for compositing and digital image editing.",
      details: [
        "Image cropping, contrast adjustments, levels tuning, and black-and-white conversion.",
        "Working with adjustment layers and brushes to edit images.",
        "Next up: Exploring more features, improving my workflow, and developing my understanding of composition, color, and visual hierarchy.",
      ],
    },
    rstudio: {
      name: "RStudio",
      description:
        "My initial programming environment for high-volume, complex data analysis.",
      details: [
        "Data cleaning and transformation workflows utilizing Tidyverse.",
        "Generating and modeling statistical graphics via the ggplot2 package.",
        "AI-assisted learning and development focused on problem-solving and working with APIs.",
        "A high-priority tool in my roadmap for professional growth and specialization.",
        "Next up: Developing my skills in advanced statistics, mapping, and understanding and developing R packages.",
      ],
    },
    qgis: {
      name: "QGIS",
      description:
        "A mapping tool for exploring and analyzing complex geographic data.",
      details: [
        "Loading and visualizing vector layers (GeoJSON, Shapefiles) and handling coordinate projections.",
        "Basic ingestion of geographic data and features utilizing the OpenStreetMap API.",
        "AI-assisted spatial and attribute data joins.",
        "Next up: Gaining autonomy in large-scale cartographic storytelling and physical map modeling.",
      ],
    },
    premiere: {
      name: "Premiere Pro",
      description: "A tool for video editing and multimedia production.",
      details: [
        "Editing video and audio clips using straightforward effects and transitions.",
        "Basic animation of titles, graphic assets, and text lower-thirds using keyframes.",
        "Next up: Learning more about professional video editing workflows.",
      ],
    },
    code: {
      name: "HTML5 / CSS3 / JS (Vanilla)",
      description:
        "Stepping into web development to bypass no-code data visualization template restrictions.",
      details: [
        "Structuring static and interactive document layouts using HTML5 and CSS3.",
        "Deploying and managing version control for personal and collaborative projects hosted on GitHub and GitLab via git.",
        "Leveraging AI as a co-pilot to optimize workflows and learn dynamic scripting.",
        "Focused on building static web narratives with unique, custom styling.",
        "Next up: Becoming more independent in JavaScript and relying less on AI while learning.",
      ],
    },
    svelte: {
      name: "Svelte 5 & D3.js",
      description:
        "Tools for building custom data visualizations, maps, and interactive visual stories.",
      details: [
        "Building reactive interfaces using runes in Svelte 5 and SvelteKit.",
        "Guided D3.js integration to process mathematical calculations and scales.",
        "Intensive AI-assisted practice focused on personal development projects and professional support.",
        "A high-priority learning objective aimed at creating complex, interactive visual stories.",
        "Next up: Developing a deeper understanding of Svelte 5 and SvelteKit, and improving my workflow.",
      ],
    },
    blender: {
      name: "Blender",
      description:
        "A self-taught tool for experimenting with 3D, without professional experience.",
      details: [
        "Basic 3D modeling focused on exporting silhouettes to Illustrator.",
        "Simple scene composition including character layout, static environments, and lighting setups.",
        "Guided animation of scene elements and camera sweeps utilizing keyframe parameters.",
        "Next up: Learning to import maps, work with complex textures, and optimize rendering.",
      ],
    },
    aftereffects: {
      name: "After Effects",
      description: "A tool I'm learning to use for motion graphics.",
      details: [
        "Creating simple compositions and elemental motion assets using separate layers.",
        "Using keyframes for simple, linear animations.",
        "Next up: Learning more about After Effects, with a focus on data visualization.",
      ],
    },
  },
} satisfies SkillsI18n;
