import type { HomeSlotKey } from "./home-slots.js";

export interface ProjectTitle {
  es: string;
  en: string;
}
export type ProjectCategory = "infografia" | "estilo_de_vida" | "maternidad";
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
  homeSlot?: HomeSlotKey;
  slug?: string;
  externalUrl?: string;
  featured?: boolean;
}

const projects = [
  {
    id: "p107",
    category: "infografia",
    homeVisible: true,
    homeSlot: "D1",
    slug: "vehiculos-autonomos",
    image: "/images/projects/vehiculos-autonomos-ip.webp",
    title: {
      es: "Hacia el volante invisible: radiografía del vehículo autónomo",
      en: "Toward a Driverless Future: Inside the World of Autonomous Vehicles",
    },
    description: {
      es: "El contexto de la conducción sin piloto aborda una serie de ventajas en evolución, pero también ciertos problemas",
      en: "Self-driving technology offers growing benefits, but significant challenges remain.",
    },
  },
  {
    id: "p106",
    category: "infografia",
    homeVisible: true,
    homeSlot: "B3",
    featured: true,
    slug: "vivienda-cara-europa",
    image: "/images/projects/vivienda-cara-europa-ip.webp",
    title: {
      es: "El coste de vivienda inunda una Europa con precios excesivos",
      en: "Soaring Housing Costs Sweep Across Europe",
    },
    description: {
      es: "La crisis de habitabilidad se extiende por todo el continente europeo con distintos rangos de poder de adquisición",
      en: "Europe's housing affordability crisis spreads across the continent, exposing stark differences in purchasing power.",
    },
  },
  {
    id: "p1",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-10-07/lo-guardo-para-una-ocasion-especial-por-que-nos-cuesta-tanto-estrenar-algunos-objetos.html",
    category: "estilo_de_vida",
    homeVisible: true,
    homeSlot: "A2",
    mediumStyle: "El País",
    title: {
      es: "¿Por qué nos cuesta tanto estrenar algunos objetos?",
      en: "Why Is It So Hard to Use Some Things for the First Time?",
    },
    description: {
      es: "La necesidad de usar algo importante choca con la pena por perderlo",
      en: "The need to use something special clashes with the sadness of using it up.",
    },
  },
  {
    id: "p2",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-09-29/hasta-que-punto-mis-padres-pueden-convertirse-en-mis-amigos.html",
    category: "estilo_de_vida",
    homeVisible: true,
    homeSlot: "A3",
    mediumStyle: "El País",
    title: {
      es: "La posible relación de amistad vertical intrafamiliar",
      en: "When Parent-Child Relationships Evolve Into Friendship",
    },
    description: {
      es: "Llegada la edad adulta, una relación entre padres e hijos puede derivar hacia la horizontalidad",
      en: "As children reach adulthood, their relationships with their parents can become more equal.",
    },
  },
  {
    id: "p3",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-09-22/cuando-un-amigo-de-la-infancia-despierta-las-versiones-de-nuestra-personalidad-que-creiamos-olvidadas.html",
    category: "estilo_de_vida",
    homeVisible: true,
    homeSlot: "E2",
    mediumStyle: "El País",
    title: {
      es: "Las versiones ocultas de nuestra personalidad",
      en: "The Hidden Sides of Our Personalities",
    },
    description: {
      es: "Cuando volvemos a encontrarnos con viejos amigos, pueden surgir otros 'yo' que hacía tiempo que no surgían",
      en: "Reuniting with old friends can bring out versions of ourselves we haven't seen in years.",
    },
  },
  {
    id: "p4",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-08-29/de-conocerse-en-vacaciones-a-una-relacion-duradera-asi-arraigan-las-amistades-de-verano.html",
    category: "estilo_de_vida",
    homeVisible: true,
    homeSlot: "E3",
    mediumStyle: "El País",
    title: {
      es: "De desconocidos a amigos por unas vacaciones",
      en: "From Strangers to Friends on Vacation",
    },
    description: {
      es: "Un vínculo de amistad puede surgir en los periodos excepcionales de verano que pueden estar idealizados",
      en: "Friendships can form during the extraordinary, sometimes idealized days of summer.",
    },
  },
  {
    id: "p5",
    slug: "implantacion-teletrabajo",
    category: "infografia",
    homeVisible: true,
    homeSlot: "A1",
    title: {
      es: "El teletrabajo: una nueva opción de producción laboral en España",
      en: "The Distribution of Agricultural Land",
    },
    description: {
      es: "Desde la pandemia, trabajar sin estar en la oficina gana más adeptos gracias a su flexibilidad, pero también detractores",
      en: "A visual and cartographic analysis of agricultural land distribution and different land uses.",
    },
    image: "/images/projects/implantacion-teletrabajo-ip.webp",
  },
  {
    id: "p6",
    slug: "industria-videojuegos",
    category: "infografia",
    homeVisible: false,
    title: {
      es: "Videojuegos: datos y tendencias de una industria global",
      en: "Video Games: Data and Trends in a Global Industry",
    },
    description: {
      es: "Visualización de datos sobre la evolución, el consumo y el impacto de la industria de los videojuegos",
      en: "Data visualizations exploring the evolution, consumption, and impact of the video game industry.",
    },
    image: "/images/projects/industria-videojuegos-ip.webp",
  },
  {
    id: "p7",
    slug: "graficos-voronoi",
    category: "infografia",
    homeVisible: true,
    homeSlot: "E4",
    featured: true,
    title: {
      es: "Conjunto de infografías publicadas en Voronoi",
      en: "A Collection of Infographics Published on Voronoi",
    },
    description: {
      es: "Agrupación de trabajos realizados para la web Voronoi, de Visual Capitalist",
      en: "A selection of infographics created for Voronoi, Visual Capitalist's data visualization platform.",
    },
    image: "/images/projects/graficos-voronoi-ip.webp",
  },
  {
    id: "p8",
    slug: "digital-news-report-2026",
    category: "infografia",
    homeVisible: true,
    homeSlot: "B1",
    featured: true,
    title: {
      es: "Digital News Report 2026: La situación de los medios de comunicación en el mundo y su consumo",
      en: "Digital News Report 2026: The Global State of News Media and Media Consumption",
    },
    description: {
      es: "Apoyo gráfico extenso a través de decenas de visualizaciones de datos al principal informe anual mundial de los medios de comunicación",
      en: "Extensive visual support through dozens of data visualizations for the leading annual global report on news media and audience consumption trends.",
    },

    image: "/images/projects/digital-news-report-2026-ip.webp",
  },
  {
    id: "p9",
    slug: "vivienda-construnews",
    category: "infografia",
    homeVisible: true,
    homeSlot: "C2",
    featured: true,
    title: {
      es: "Vivienda industrializada: ¿solución para la crisis habitacional que sacude España?",
      en: "Industrialized Housing: A Viable Solution to the Deep Residential Crisis Gripping Spain?",
    },
    description: {
      es: "Un análisis de datos sobre la falta de mano de obra en el sector de la construcción y la viabilidad técnica de los modelos modulares",
      en: "A data-driven analysis of construction labor shortages and the technical viability of modular building models.",
    },

    image: "/images/projects/vivienda-construnews-ip.webp",
  },
  {
    id: "p10",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-07-25/el-viaje-emocional-de-irse-de-vacaciones-con-los-padres-siendo-adulto-es-volver-a-conectar-con-mi-parte-nina-divertida-natural-y-positiva.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "Irse de vacaciones con los padres como adulto",
      en: "Traveling with Your Parents as an Adult",
    },
    description: {
      es: "Una rutina estival y refuerzo de lazos familiares que no se pierde con independencia personal",
      en: "A summer routine and stronger family bonds don't have to disappear with personal independence.",
    },
  },
  {
    id: "p11",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-07-17/el-doble-desafio-de-mudarse-de-ciudad-por-amor-de-la-dependencia-excesiva-de-unos-al-sentimiento-de-culpa-de-otros.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "El desafío de mudarse de ciudad por amor",
      en: "The Challenge of Moving to a New City for Love",
    },
    description: {
      es: "La expectativa de vivir una nueva vida choca con la dependencia de la pareja",
      en: "The expectation of starting fresh often clashes with a sudden dependence on your partner.",
    },
  },
  {
    id: "p12",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-06-27/es-normal-que-los-novios-se-queden-sin-bateria-social-en-su-boda-es-un-dia-emocionante-pero-tambien-un-evento-con-una-carga-social-enorme.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "El cansancio social de los novios en sus bodas",
      en: "The Social Exhaustion Couples Face on Their Wedding Day",
    },
    description: {
      es: "El enlace y su carga emocional deben ser acordes con la personalidad de la pareja",
      en: "The celebration and its emotional demands should reflect each couple's personality.",
    },
  },
  {
    id: "p13",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-06-18/humor-rutina-y-cercania-cuando-la-vida-de-oficina-se-convierte-en-contenido-para-redes-sociales.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "La relación entre marketing y cercanía con las empresas en redes sociales",
      en: "The Intersection of Marketing and Corporate Relatability on Social Media",
    },
    description: {
      es: "A través de humor y rutina, la publicidad empresarial busca una nueva forma de venderse",
      en: "Leveraging humor and everyday routines, corporate advertising charts a new path to consumer engagement.",
    },
  },
  {
    id: "p14",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-05-21/falsos-recuerdos-por-que-la-memoria-reconstruye-nuestro-pasado.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "Los falsos recuerdos que crea la memoria",
      en: "The False Memories Created by Memory",
    },
    description: {
      es: "Fenómeno por el que nuestro cerebro reconstruye eventos que no son del todo reales",
      en: "A phenomenon in which our brain reconstructs events that are not entirely real.",
    },
  },
  {
    id: "p15",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-04-25/por-que-llenamos-la-agenda-de-vacaciones-con-meses-de-antelacion-el-verano-ya-esta-decidido-en-abril.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "La antelación al organizarse las vacaciones",
      en: "Planning Vacations Well in Advance",
    },
    description: {
      es: "Factores como el control, la incertidumbre y el contexto pueden cerrar el calendario estival pronto",
      en: "Factors such as control, uncertainty, and context can lock in summer schedules early.",
    },
  },

  {
    id: "p16",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2026-10-27/tienes-el-mismo-caracter-que-tu-abuelo-como-afectan-a-los-ninos-las-comparaciones-familiares.html",
    category: "maternidad",
    homeVisible: true,
    mediumStyle: "El País",
    homeSlot: "A4",
    title: {
      es: "¿Cómo pueden afectar a los niños las comparaciones familiares?",
      en: "How Family Comparisons Can Affect Children",
    },
    description: {
      es: "Los padres pueden descubrir en sus hijos la personalidad de adultos cuyas reacciones no les parecen correctas",
      en: "Parents may recognize personality traits in their children that remind them of adults whose behavior they disapprove of.",
    },
  },
  {
    id: "p18",
    externalUrl:
      "https://elpais.com/mamas-papas/2026-09-27/de-ya-lo-hago-yo-a-intentalo-tu-por-que-hay-que-dejar-de-resolver-la-vida-cotidiana-de-los-hijos.html",
    category: "maternidad",
    homeVisible: true,
    mediumStyle: "El País",
    homeSlot: "E1",
    title: {
      es: "La intervención paterna constante puede derivar en falta de independencia infantojuvenil",
      en: "How Constant Parental Intervention Can Undermine Children's Independence",
    },
    description: {
      es: "Resolver los problemas de los hijos no debería suponer que se ralentice su autonomía y su capacidad de resolución",
      en: "Helping children solve problems shouldn't come at the expense of their independence and problem-solving skills.",
    },
  },
  {
    id: "p19",
    variant: "list",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2026-09-18/vuelta-a-la-rutina-vuelta-a-renegociar-los-limites-con-los-hijos.html",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "Vuelta al cole: cuando la flexibilidad del verano se termina",
      en: "Back to School: When Summer's Flexibility Comes to an End",
    },
    description: {
      es: "La libertad del periodo estival se termina cuando llega la época escolar y hay que actuar en consecuencia con los límites",
      en: "As summer gives way to the school year, families must readjust expectations and reestablish boundaries.",
    },
  },
  {
    id: "p20",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2026-08-28/en-temas-academicos-no-daria-la-paga-como-una-recompensa-cuando-empezar-a-hablar-de-dinero-con-los-hijos-con-naturalidad.html",
    variant: "list",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "¿Cómo hablarles de dinero a los niños?",
      en: "How to Talk to Kids About Money",
    },
    description: {
      es: "La economía familiar y general es un campo sobre el que hablar con naturalidad a partir de cierta edad",
      en: "As children grow older, conversations about family finances and the broader economy can become a natural part of everyday life.",
    },
  },
  {
    id: "p21",
    externalUrl:
      "https://elpais.com/mamas-papas/expertos/2026-08-18/cuando-el-colecho-con-los-hijos-se-alarga-beneficios-limites-y-mitos.html",
    variant: "list",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "¿Qué puede haber detrás del colecho con los hijos?",
      en: "Why Some Parents Choose to Share a Bed With Their Children",
    },
    description: {
      es: "Rutina familiar, ventajas nocturnas o factores relacionales y de desarrollo pueden estar detrás de dormir juntos",
      en: "Family routines, nighttime convenience, and emotional or developmental factors can all play a role in bed-sharing.",
    },
  },
  {
    id: "p22",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2026-08-08/como-aprovechar-el-verano-para-fomentar-la-autonomia-infantil-cuando-todo-esta-estipulado-y-regulado-no-hay-libertad.html",
    variant: "list",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "La oportunidad de aprovechar la autonomía infantil en verano",
      en: "Why Summer Is an Opportunity to Foster Children's Independence",
    },
    description: {
      es: "La época estival puede ser un buen momento para que los niños aprendan a ser más independientes",
      en: "Summer can be an ideal time for children to develop greater independence.",
    },
  },
  {
    id: "p23",
    externalUrl:
      "https://elpais.com/mamas-papas/expertos/2026-07-23/la-primera-noche-fuera-de-casa-como-ayudar-a-los-ninos-a-vivirla-con-confianza.html",
    variant: "list",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "La primera noche fuera de casa de los niños",
      en: "Kids' First Night Away From Home",
    },
    description: {
      es: "Una experiencia que puede traer ilusión, pero también posibles temores",
      en: "An exciting milestone that brings both anticipation and unexpected fears.",
    },
  },
  {
    id: "p24",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2026-06-16/regalos-de-fin-de-curso-a-los-profesores-por-que-una-carta-significa-mas-que-un-obsequio-caro.html",
    variant: "list",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "La metáfora detrás del regalo de final de curso a los profesores",
      en: "The Metaphor Behind Year-End Teacher Gifts",
    },
    description: {
      es: "Para los tutores, una carta de los alumnos puede significar más que un obsequio caro de los padres",
      en: "For educators, a letter from students can mean far more than an expensive present from parents.",
    },
  },
  {
    id: "p25",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2026-06-05/ayudar-o-no-a-los-hijos-con-los-deberes.html",
    variant: "list",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "¿Es bueno estar encima de los hijos con los deberes?",
      en: "Should Parents Micro-Manage Their Children's Homework?",
    },
    description: {
      es: "La manera de ayudar con las tareas escolares es más importante que la cantidad de apoyo",
      en: "The way parents help with schoolwork matters more than the amount of support they provide.",
    },
  },
  {
    id: "p26",
    slug: "tren-contrastes",
    category: "infografia",
    homeVisible: true,
    homeSlot: "B2",
    featured: true,
    title: {
      es: "La España a dos velocidades: el mapa de la desigualdad en el acceso al tren",
      en: "A Two-Speed Spain: Mapping Inequities in the National Rail Network",
    },
    description: {
      es: "Un recorrido visual por el vacío ferroviario de la Península que contrasta la España aislada con la hiperconectada a través de datos, mapas e infografías",
      en: "A visual exploration of Spain's railway gaps, contrasting isolated regions with hyper-connected hubs through data, maps and graphics.",
    },

    image: "/images/projects/tren-contrastes-ip.webp",
  },
  {
    id: "p27",
    slug: "mudanzas-estres",
    category: "infografia",
    homeVisible: false,
    title: {
      es: "Radiografía del éxodo interno: cómo nos movemos entre los municipios españoles",
      en: "Mapping Internal Migration: How People Move Across Spanish Municipalities",
    },
    description: {
      es: "Datos y mapas sobre el movimiento de la población que retrata el flujo poblacional y el crecimiento de la España vaciada",
      en: "A data-driven portrait of population shifts, tracking the population flow and the widening gap of the empty Spain.",
    },

    image: "/images/projects/mudanzas-estres-ip.webp",
  },
  {
    id: "p28",
    slug: "fugas-participacion-femenina",
    variant: "grid",
    category: "infografia",
    homeVisible: false,
    featured: true,
    title: {
      es: "El complejo camino de las mujeres hacia la representación política real en Argentina",
      en: "How Women Fought for Political Representation in Argentina and Where the Gaps Remain",
    },
    description: {
      es: "Un recorrido visual e interactivo que analiza los hitos históricos y las barreras que todavía dificultan el acceso a la política",
      en: "An interactive visual journey analyzing historical milestones and the barriers that still make it tough to get into politics.",
    },

    image: "/images/projects/fugas-participacion-femenina-ip.webp",
  },
  {
    id: "p29",
    slug: "este-porfolio",
    category: "infografia",
    homeVisible: true,
    homeSlot: "C1",
    featured: true,
    title: {
      es: "Planteamiento y desarrollo de este porfolio desde cero",
      en: "Behind the Code and Design of This Portfolio Website",
    },
    description: {
      es: "El proceso de desarrollo, retos de rendimiento y decisiones de diseño detrás de la pantalla",
      en: "The development process, performance challenges, and design decisions behind the screen.",
    },

    image: "/images/projects/este-porfolio-ip.webp",
  },
  {
    id: "p30",
    slug: "radiografia-musica-vivo",
    variant: "grid",
    category: "infografia",
    homeVisible: false,
    featured: true,
    title: {
      es: "Música en vivo: por qué las entradas son más caras que nunca",
      en: "Live Music: Why Tickets Are More Expensive Than Ever",
    },
    description: {
      es: "Datos e infografías para entender la compleja situación actual de los conciertos en directo",
      en: "Data and graphics to understand the complex realities of today's live concert industry.",
    },

    image: "/images/projects/radiografia-musica-vivo-ip.webp",
  },
  {
    id: "p31",
    externalUrl:
      "https://elpais.com/mamas-papas/expertos/2026-05-23/jose-maria-carmona-pediatra-que-los-ninos-necesitan-padres-perfectos-es-el-mito-mas-importante-a-desmontar.html",
    category: "maternidad",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "Entrevista al pediatra José María Carmona",
      en: "Interview with the pediatrician José María Carmona",
    },
  },
  {
    id: "p32",
    slug: "premios-oscar",
    category: "infografia",
    homeVisible: true,
    homeSlot: "D3",
    featured: true,
    title: {
      es: "Estadísticas de los Óscar: los secretos y patrones ocultos detrás de los grandes premios del cine mundial",
      en: "Oscars Analytics: Decoding the Hidden Data Patterns Behind Cinema's Biggest Night of the Year",
    },
    description: {
      es: "Desarrollo web y visualización de datos históricos para entender las tendencias de la Academia",
      en: "Web development and data visualization of historical trends to understand Academy patterns.",
    },

    image: "/images/projects/premios-oscar-ip.webp",
  },
  {
    id: "p33",
    slug: "roland-garros-sin-nadal",
    category: "infografia",
    homeVisible: true,
    homeSlot: "D2",
    featured: true,
    title: {
      es: "Los secretos de la tierra batida: ¿Por qué Nadal impuso su dominio?",
      en: "The Biomechanics of Dominance: How Nadal Conquered Clay",
    },
    description: {
      es: "Análisis del legado de Rafa Nadal en Roland Garros y su carrera",
      en: "An analytical breakdown of Rafa Nadal's statistical legacy at Roland Garros and clay.",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.webp",
  },
  {
    id: "p34",
    slug: "radiografia-abstencionismo",
    variant: "grid",
    category: "infografia",
    homeVisible: false,
    featured: true,
    title: {
      es: "Cómo la brecha socioeconómica impulsa el abstencionismo en España",
      en: "How Socioeconomics Gaps Drive Spanish Voter Abstention",
    },
    description: {
      es: "Análisis de datos y mapeo interactivo que visualiza los factores económicos detrás de la decisión de no votar",
      en: "Data analysis and interactive mapping visualizing the economic factors behind the choice not to vote.",
    },

    image: "/images/projects/radiografia-abstencionismo-ip.webp",
  },
  {
    id: "p35",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-04-15/desconocidos-pero-no-tanto-la-importancia-de-los-extranos-familiares-que-nos-cruzamos-a-diario.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "¿Quiénes son los desconocidos que siempre vemos a diario?",
      en: "Who Are the Strangers We See Every Day?",
    },
    description: {
      es: "En el ascensor, metro o el barrio nos cruzamos con los mismos desconocidos familiares",
      en: "In elevators, on the subway, or around the neighborhood, we cross paths with the same familiar strangers.",
    },
  },
  {
    id: "p36",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-04-07/por-que-algunas-personas-llegan-con-extrema-antelacion-a-las-citas-o-eventos-explicaciones-y-algunos-consejos.html",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: false,
    mediumStyle: "El País",
    title: {
      es: "Las posibles razones detrás de una puntualidad excesiva",
      en: "The Psychology Behind Extreme Punctuality",
    },
    description: {
      es: "Ansiedad anticipatoria o autoexigencia pueden impulsarnos a llegar demasiado pronto",
      en: "Anticipatory anxiety or high self-expectations can drive people to arrive far too early.",
    },
  },
  {
    id: "p37",
    slug: "inter-atleti",
    category: "infografia",
    homeVisible: false,
    featured: true,
    title: {
      es: "El Atlético de Madrid busca romper la muralla del Inter",
      en: "Breaking the Italian Wall: Atletico de Madrid's Tactical Clash Against Inter",
    },
    description: {
      es: "Previa del partido de Champions con visualización de datos sobre el sistema defensivo italiano",
      en: "Pre-game preview of the Champions League match with data visualization focusing on the Italian defensive system.",
    },

    image: "/images/projects/inter-atleti-ip.webp",
  },
  {
    id: "p38",
    slug: "masculinizacion-facial",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/masculinizacion-facial-ip.webp",
    title: {
      es: "¿En qué consiste el proceso de masculinización facial?",
      en: "Science and Aesthetics: Understanding the Facial Masculinization Process",
    },
    description: {
      es: "Explicación visual mediante infografías y datos sobre las claves de este procedimiento",
      en: "A detailed visual breakdown combining data and infographics to explain the key aspects of this procedure.",
    },
  },
  {
    id: "p39",
    slug: "rearme-ue",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/rearme-ue-ip.webp",
    title: {
      es: "La Unión Europea se rearma frente a los nuevos desafíos globales",
      en: "Europe's Military Reshaping: How the EU Reharms in a New Global Era",
    },
    description: {
      es: "Diseño editorial a doble página que desglosa el gasto militar y la estrategia de defensa comunitaria",
      en: "A double-page print layout breaking down military spending and the collaborative European defense strategy.",
    },
  },
  {
    id: "p40",
    slug: "30daychartchallenge",
    category: "infografia",
    homeVisible: false,
    featured: true,
    image: "/images/projects/30daychartchallenge-ip.webp",
    title: {
      es: "#30DayChartChallenge 2025",
      en: "#30DayChartChallenge 2025",
    },
    description: {
      es: "Un reto enfocado en crear un gráfico diario explorando diferentes visualizaciones de datos",
      en: "A digital challenge focused on creating a daily chart to explore diverse visualization techniques.",
    },
  },
  {
    id: "p41",
    slug: "cableado-submarino",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/cableado-submarino-ip.webp",
    title: {
      es: "La geopolítica del cableado submarino",
      en: "Undersea Cables: The Hidden Geopolitics of Global Internet Infrastructure",
    },
    description: {
      es: "Doble página que mapea las conexiones estratégicas de comunicaciones",
      en: "A double-page print layout mapping the strategic connections that sustain the global internet.",
    },
  },
  {
    id: "p42",
    slug: "record-banquillos",
    category: "infografia",
    homeVisible: false,
    featured: true,
    image: "/images/projects/record-banquillos-ip.webp",
    title: {
      es: "Banquillos calientes: el año con más despidos de entrenadores en el fútbol europeo",
      en: "Sacking Season: Breaking Down the Record-Breaking Year for Football Managers",
    },
    description: {
      es: "Desglose de las destituciones en las cinco grandes ligas y los factores detrás de la inestabilidad",
      en: "Breaking down manager dismissals across the big five leagues and the factors driving this instability.",
    },
  },
  {
    id: "p43",
    slug: "mercado-porcino",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/mercado-porcino-ip.webp",
    title: {
      es: "Radiografía del mercado porcino: las rutas comerciales de una industria global",
      en: "The Global Pork Market: Mapping the Trade Routes of a Massive Industry",
    },
    description: {
      es: "Doble página impresa enfocada en la visualización de flujos de compraventa e impacto económico del sector",
      en: "A double-page print feature focused on visualizing trade flows and the economic impact of the sector.",
    },
  },
  {
    id: "p44",
    slug: "aceite-espanol",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/aceite-espanol-ip.webp",
    title: {
      es: "Cómo los aranceles de Trump en 2024 sacudieron a las olivareras andaluzas",
      en: "How Trump's 2024 Tariffs Hit Spanish Olive Oil Exports",
    },
    description: {
      es: "Mapas y gráficos de exportación para explicar el impacto del conflicto arancelario con Estados Unidos",
      en: "Trade maps and export charts explaining the impact of the tariff dispute with the United States.",
    },
  },
  {
    id: "p45",
    slug: "adios-xavi",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/adios-xavi-ip.webp",
    title: {
      es: "El efecto Xavi: un adiós que salva la temporada",
      en: "The Pressure Valve: How Xavi's Resignation Saved Barcelona's Season",
    },
    description: {
      es: "Análisis de datos sobre el vuelco en el rendimiento y la racha de victorias del Barça tras el anuncio de salida de su entrenador",
      en: "A data-driven analysis of Barcelona's sudden winning streak and tactical resurgence following the manager's exit plan.",
    },
  },
  {
    id: "p46",
    slug: "analisis-tuits-ayuso-sanchez",
    title: {
      es: "La estrategia digital de Ayuso frente a Sánchez antes del 28M",
      en: "Ayuso's Digital Strategy Against Sanchez Ahead of the 28M Election",
    },
    description: {
      es: "Análisis de datos y gráficos de frecuencia de los ataques en redes durante la campaña de 2023",
      en: "Data analysis and frequency charts about the social media narrative and political attacks during the 2023 campaign.",
    },
    image: "/images/projects/analisis-tuits-ayuso-sanchez-ip.webp",
    category: "infografia",
    homeVisible: false,
    featured: true,
  },
  {
    id: "p47",
    slug: "bibliotecas-madrid-radiografia",
    title: {
      es: "El mapa de las bibliotecas municipales en Madrid",
      en: "Mapping Local Culture: A Deep Dive Into Madrid's Municipal Libraries",
    },
    description: {
      es: "Limpieza y visualización de datos para mostrar la distribución de las dotaciones culturales",
      en: "Data cleaning and visualization to show the neighborhood distribution of cultural facilities.",
    },
    image: "/images/projects/bibliotecas-madrid-radiografia-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p48",
    slug: "carnaval-brasil-escuela-samba",
    title: {
      es: "Los secretos del Sambódromo: cómo se organiza por dentro una escuela de samba",
      en: "Inside the Sambadrome: How a Brazilian Samba School Is Organized",
    },
    description: {
      es: "Infografía que desglosa la composición de los grandes desfiles del Carnaval",
      en: "An infographic breaking down the composition behind the massive Carnival parades.",
    },
    image: "/images/projects/carnaval-brasil-escuela-samba-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p49",
    slug: "dana-valencia",
    title: {
      es: "Cicatrices en la carretera: el impacto de la DANA en la movilidad de Valencia",
      en: "Scars on the Road: Mapping the Impact of the Valencia DANA Flood Disaster",
    },
    description: {
      es: "Mapas de localización en tiempo real y procesamiento de incidencias de tráfico para mostrar los cortes de vías",
      en: "Location maps and traffic incident processing to show road closures caused by the flash floods.",
    },
    image: "/images/projects/dana-valencia-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p50",
    slug: "dia-25n-mujer",
    title: {
      es: "Radiografía de la violencia contra las mujeres en España por el 25N",
      en: "Violence Against Women in Spain: An In-Depth Look for 25N",
    },

    description: {
      es: "Grupo de gráficos y desarrollo web sencillo con motivo del Día Internacional de la Eliminación de la Violencia contra la Mujer",
      en: "A group of graphics and simple web development to mark the International Day for Elimination of Violence Against Women.",
    },
    image: "/images/projects/dia-25n-mujer-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p51",
    slug: "elecciones-eeuu",
    title: {
      es: "Carrera hacia la Casa Blanca: el rastreo de encuestas y el desenlace entre Trump y Harris",
      en: "Race to the White House: Polling Trends and the Final Outcome Between Trump and Harris",
    },
    description: {
      es: "Limpieza y visualización de datos electorales para contrastar las proyecciones de los sondeos con el escrutinio real",
      en: "Data cleaning and visualization of electoral data to contrast polling projections with the real vote count.",
    },
    image: "/images/projects/elecciones-eeuu-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p52",
    slug: "estres-termico",
    title: {
      es: "Ciudades al límite por el aumento del estrés térmico en la geografía española",
      en: "Cities at the Limit as Thermal Stress Rises Across Spain",
    },
    description: {
      es: "Análisis y visualización de datos para dimensionar el impacto de las olas de calor en entornos locales",
      en: "Data processing and visualization to measure the impact of heatwaves across local environments.",
    },
    image: "/images/projects/estres-termico-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p53",
    slug: "final-femenina-mundial",
    title: {
      es: "Una cita con la historia: las claves tácticas de la final femenina entre España e Inglaterra",
      en: "A Date With History: Tactical Keys to the World Cup Final Between Spain and England Women",
    },
    description: {
      es: "Doble página con infografías de rendimiento sobre cómo la selección española e inglesa llegaron a la final",
      en: "A double-page print layout featuring performance infographics on the match between the Spanish and English national teams.",
    },
    image: "/images/projects/final-femenina-mundial-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p54",
    slug: "final-qatar-22",
    title: {
      es: "¿La final de Qatar 2022 fue la mejor de la historia?",
      en: "Qatar 2022 Final Was the Greatest World Cup History?",
    },
    description: {
      es: "Grupos de gráficos para evaluar si el duelo de Lusail fue el mejor de todos los tiempos",
      en: "Group of graphics to evaluate whether the Lusail showdown was the greatest of all time.",
    },
    image: "/images/projects/final-qatar-22-ip.webp",
    category: "infografia",
    homeVisible: false,
    featured: true,
  },
  {
    id: "p55",
    slug: "gabinete-petro",
    title: {
      es: "La evolución del gabinete de Gustavo Petro hasta 2023",
      en: "Colombia's Revolving Door: The Shifts and Reshuffles in Gustavo Petro's Cabinet",
    },
    description: {
      es: "Infografía que muestra los relevos ministeriales durante el mandato",
      en: "Infographic tracking ministerial changes and departures throughout the administration.",
    },
    image: "/images/projects/gabinete-petro-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p56",
    slug: "golf-aumento-velocidad-distancia",
    title: {
      es: "El 'boom' de los pegadores y la evolución de la distancia en el golf moderno",
      en: "The Long-Drive Boom and the Evolution of Swing Speed in Modern Golf",
    },
    description: {
      es: "Infografía sobre cómo el desarrollo físico y el material han transformado el golpeo",
      en: "Infographic exploring how physical development and gear have transformed the swing.",
    },
    image: "/images/projects/golf-aumento-velocidad-distancia-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p57",
    slug: "incendio-tenerife",
    title: {
      es: "¿Por qué ardió tanto Tenerife en 2023?",
      en: "Climate Shock: Why Tenerife Burned out of Control in 2023",
    },
    description: {
      es: "Análisis de datos sobre la magnitud del incendio forestal",
      en: "A data analysis measuring the true scale of the Tenerife wildfire.",
    },
    image: "/images/projects/incendio-tenerife-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p58",
    slug: "india-china-poblacion",
    title: {
      es: "El gran vuelco demográfico: la India supera a China en población",
      en: "The Great Demographic Shift: India Overtakes China in Population",
    },
    description: {
      es: "Pirámide de población para ilustrar cómo el territorio indio es ahora el más poblado del mundo",
      en: "A population pyramid illustrating how India became the world's most populous nation.",
    },
    image: "/images/projects/india-china-poblacion-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p59",
    slug: "juventud-jugadores-qatar22",
    title: {
      es: "La irrupción de los jóvenes en Qatar 2022",
      en: "The Rise of Youth Talents in Qatar 2022",
    },
    description: {
      es: "Visualización de datos sobre las plantillas que marcaron la media de edad más baja del torneo",
      en: "Data visualization of the squads that marked the tournament's lowest average age.",
    },
    image: "/images/projects/juventud-jugadores-qatar22-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p60",
    slug: "lesiones-nadal",
    title: {
      es: "El mapa médico del rey de la tierra: el historial de lesiones de Rafa Nadal",
      en: "The King of Clay's Medical Map: Tracking Rafa Nadal's Career Injuries",
    },
    description: {
      es: "Narrativa interactiva con un modelo 3D móvil que muestra las lesiones del tenista a lo largo de su trayectoria",
      en: "An interactive scrollytelling feature with a mobile 3D model showing the tennis player's injuries throughout his career.",
    },
    image: "/images/projects/lesiones-nadal-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p61",
    slug: "madrid-girona",
    title: {
      es: "Real Madrid y Girona frente a frente por el trono de LaLiga",
      en: "Real Madrid and Girona Face Off for the LaLiga Crown",
    },
    description: {
      es: "Estadísticas de los dos equipos punteros antes del duelo directo de la competición",
      en: "Statistics and team performance ahead of the definitive championship head-to-head match.",
    },
    image: "/images/projects/madrid-girona-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p62",
    slug: "nba-maximos-puntos",
    title: {
      es: "¿Por qué la NBA alcanza las puntuaciones más altas de su historia?",
      en: "Why the NBA Is Reaching Its Highest Scores Ever?",
    },
    description: {
      es: "Métricas de juego para identificar las causas del aumento de anotación en las canchas",
      en: "Game metrics to identify the causes behind the scoring boom across the league.",
    },
    image: "/images/projects/nba-maximos-puntos-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p63",
    slug: "nieve-pirineos",
    title: {
      es: "El invierno se derrite: el impacto de la falta de nieve en los Pirineos",
      en: "Winter Is Melting: The Impact of Snow Scarcity in the Pyrenees",
    },
    description: {
      es: "Visualización del aumento de temperaturas y sus consecuencias directas en la temporada de esquí",
      en: "Data visualization on rising temperatures and their direct impact on the skiing season.",
    },
    image: "/images/projects/nieve-pirineos-ip.webp",
    category: "infografia",
    homeVisible: false,
    featured: true,
  },
  {
    id: "p64",
    slug: "pediatria-madrid",
    title: {
      es: "Pediatría en Madrid: el mapa de la cobertura médica por niño",
      en: "Pediatrics in Madrid: Mapping Medical Coverage Ratios per Child",
    },
    description: {
      es: "Mapeo territorial y visualización de ratios sanitarios para evaluar las diferencias de atención en la comunidad",
      en: "Territorial mapping and visualization of healthcare ratios to evaluate coverage gaps across the region.",
    },
    image: "/images/projects/pediatria-madrid-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "p65",
    slug: "scrolly-congreso",
    title: {
      es: "Cómo ha cambiado el equilibrio de poder en el Congreso a través de las investiduras",
      en: "How the Balance of Power Shifted in Congress Across Prime Minister Votes",
    },
    description: {
      es: "Narrativa interactiva sobre los apoyos parlamentarios en la democracia española",
      en: "An interactive scrollytelling feature tracking parliamentary support in Spanish democracy.",
    },
    image: "/images/projects/scrolly-congreso-ip.webp",
    category: "infografia",
    homeVisible: false,
    featured: true,
  },
  {
    id: "p66",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-03-18/la-edad-como-frontera-social-por-que-la-mayoria-de-los-amigos-son-de-nuestra-generacion.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Las nuevas perspectivas que dan las amistades intergeneracionales",
      en: "The Fresh Perspectives Offered by Intergenerational Friendships",
    },
  },
  {
    id: "p67",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-02-13/de-la-euforia-de-enero-al-abandono-en-febrero-por-que-fracasan-la-mayoria-de-nuestros-propositos-de-ano-nuevo.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El agujero negro de los propósitos de Año Nuevo",
      en: "The Black Hole of New Year's Resolutions",
    },
  },
  {
    id: "p68",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-01-08/cuando-un-pequeno-malentendido-se-carga-una-gran-amistad-como-identificar-y-evitar-las-rupturas-por-deterioro.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Las amistades destruidas por pequeños malentendidos",
      en: "The Friendships Destroyed by Minor Misunderstandings",
    },
  },
  {
    id: "p69",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2026-01-02/de-reuniones-constantes-a-encuentros-obligados-cuando-la-navidad-se-convierte-en-una-excesiva-maraton-social.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Cuando la Navidad supone una maratón social",
      en: "When Christmas Becomes a Social Marathon",
    },
  },
  {
    id: "p70",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-11-07/cuando-la-competicion-destruye-una-amistad-me-dolio-tener-que-ocultar-mi-felicidad-pero-fue-una-leccion-sobre-las-relaciones-y-los-celos.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La competición que provoca rupturas de amistad",
      en: "The Competition That Shatters Lifelong Friendships",
    },
  },
  {
    id: "p71",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-10-23/el-poder-de-las-tareas-pendientes-por-que-la-mente-no-puede-evitar-darle-demasiadas-vueltas-a-lo-que-esta-sin-terminar.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El efecto Zeigarnik o la tensión mental por lo inconcluso",
      en: "The Zeigarnik Effect: The Mental Strain of Unfinished Business",
    },
  },
  {
    id: "p72",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-10-01/como-superar-el-miedo-a-defraudar-y-dejar-de-vivir-segun-lo-que-esperan-de-ti.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "¿Cómo superar el miedo a defraudar?",
      en: "How to Overcome the Fear of Letting People Down",
    },
  },
  {
    id: "p73",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-09-13/una-infancia-sin-grupo-de-amigos-significa-tener-una-edad-adulta-sin-raices-sociales.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Las posibles consecuencias adultas de una infancia sin amigos",
      en: "The Adult Consequences of a Friendless Childhood",
    },
  },
  {
    id: "p74",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-09-06/decir-adios-dos-veces-los-danos-colaterales-de-una-ruptura-sentimental-y-como-afecta-esta-al-circulo-de-amigos-y-familia.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El doble duelo de una ruptura sentimental y su círculo social",
      en: "The Double Grief: Losing Both Your Partner and Their Social Circle",
    },
  },
  {
    id: "p75",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-08-19/vacaciones-sin-compania-cuando-el-verano-idilico-de-otros-se-convierte-en-un-recordatorio-constante-de-lo-que-nos-falta.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Las sensaciones negativas de pasar un verano sin compañías",
      en: "The Negative Experiencse of Spending a Summer Alone",
    },
  },
  {
    id: "p76",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-07-29/por-que-algunas-personas-necesitan-silenciar-en-redes-sociales-tras-una-ruptura-emocional-no-hacerlo-es-como-clavarte-un-cuchillo-a-ti-mismo.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La necesidad de silenciar en redes tras una ruptura emocional",
      en: "The Need for a Social Media Blackout After a Breakup",
    },
  },
  {
    id: "p77",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-07-10/cuando-decir-adios-se-vuelve-tarea-imposible-por-que-nos-cuesta-rechazar-un-no-te-vayas-es-pronto.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Cuando decir adiós se vuelve tarea imposible",
      en: "When Saying Goodbye Becomes an Impossible Task",
    },
  },
  {
    id: "p78",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-06-26/cuando-la-convivencia-mata-la-relacion-por-que-unas-vacaciones-pueden-ser-el-detonante-del-fin-de-una-amistad.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La ruptura emocional de no superar la convivencia en vacaciones",
      en: "Failing the Vacation Test: The Breakups Triggered by Summer Travel",
    },
  },
  {
    id: "p79",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-06-19/cuando-actuar-rapido-sale-caro-el-coste-emocional-de-la-impulsividad.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El coste emocional de la impulsividad",
      en: "The Emotional Toll of Impulsivity",
    },
  },
  {
    id: "p80",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-06-03/por-que-es-mas-facil-dar-consejos-que-aplicarselos-no-tenemos-la-misma-carga-emocional-si-el-problema-es-nuestro-o-ajeno.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La diferencia entre dar consejos, pero no saber aplicarlos",
      en: "Why We Give Great Advice but Fail to Follow It",
    },
  },
  {
    id: "p81",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-05-20/la-vida-en-diferido-el-debate-entre-grabar-eventos-para-tener-un-recuerdo-o-vivirlos.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El debate entre grabar eventos para recordarlos o vivirlos",
      en: "The Lens Dilemma: Capturing Memories vs. Living in the Moment",
    },
  },
  {
    id: "p82",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-08-19/vacaciones-sin-compania-cuando-el-verano-idilico-de-otros-se-convierte-en-un-recordatorio-constante-de-lo-que-nos-falta.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La asimetría de las emociones",
      en: "The Asymmetry of Human Emotions",
    },
  },
  {
    id: "p83",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-03-20/el-duelo-por-las-vidas-no-vividas-por-que-nos-pesa-la-nostalgia-del-que-hubiera-pasado-si.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El duelo por las vidas no vividas",
      en: "Mourning the Lives We Never Lived",
    },
  },
  {
    id: "p84",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-02-20/no-quiero-ir-solo-cuando-el-miedo-al-que-diran-nos-impide-hacer-lo-que-nos-gusta.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La dificultad emocional de acudir solo a sitios por el qué dirán",
      en: "Going Solo: The Emotional Toll of Public Judgment",
    },
  },
  {
    id: "p85",
    externalUrl:
      "https://elpais.com/estilo-de-vida/2025-02-06/el-fenomeno-tsundoku-o-como-hemos-normalizado-acumular-libros-que-no-leeremos.html",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "¿Qué es el 'tsundoku'?",
      en: "What Is 'Tsundoku'?",
    },
  },
  {
    id: "p86",
    externalUrl:
      "https://elpais.com/mamas-papas/expertos/2026-05-04/los-ninos-de-hoy-imaginan-menos-o-tienen-menos-aptitudes-para-hacerlo.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "¿Cómo es la imaginación actual de los niños?",
      en: "How is the Actual Imagination of the Children?",
    },
  },
  {
    id: "p87",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2026-04-02/altas-capacidades-y-autismo-un-diagnostico-que-sacude-pero-no-transforma.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Entrevista sobre el diagnóstico de altas capacidades y autismo",
      en: "Inside the Dual Diagnosis: An Interview on Giftedness and Autism",
    },
  },
  {
    id: "p88",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2026-03-09/asi-pueden-influir-los-videojuegos-en-el-desarrollo-creativo-de-los-ninos.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La influencia de los videojuegos en el desarrollo creativo infantil",
      en: "The Impact of Video Games on Children's Creative Development",
    },
  },
  {
    id: "p89",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2026-02-22/la-paradoja-de-los-recuerdos-en-la-primera-infancia-para-que-voy-a-viajar-con-mi-bebe-si-no-se-va-a-acordar-de-nada.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La paradoja de los recuerdos infantiles abstractos",
      en: "The Paradox of Abstract Childhood Memories",
    },
  },
  {
    id: "p90",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2025-12-17/por-que-todos-los-padres-y-madres-dudan-de-si-toman-las-decisiones-correctas-no-hay-perfeccion-en-la-educacion.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Las dudas eternas de los padres en la crianza",
      en: "The Endless Doubts of Modern Parenting",
    },
  },
  {
    id: "p91",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2025-11-30/desidealizacion-parental-del-padre-ideal-al-real.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La desidealización parental como proceso de desarrollo infantil",
      en: "De-Idealizing Parents as a Milestone in Child Development",
    },
  },
  {
    id: "p92",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2025-11-23/deberia-preocuparme-si-mi-hijo-tiene-un-amigo-imaginario.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La incertidumbre de los amigos imaginarios",
      en: "The Uncertainty of Imaginary Friends",
    },
  },
  {
    id: "p93",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2025-10-22/esta-afectando-el-uso-de-pantallas-al-desarrollo-del-lenguaje-en-los-ninos.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El posible perjuicio de las pantallas en el lenguaje infantil",
      en: "The Potential Toll of Screen Time on Toddlers' Language Skills",
    },
  },
  {
    id: "p94",
    externalUrl:
      "https://elpais.com/mamas-papas/2025-10-04/es-positivo-recompensar-a-los-hijos-por-sacar-buenas-notas.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La recompensa infantil por sacar buenas notas",
      en: "Rewarding Kids for Good Grades: Does It Actually Work?",
    },
  },
  {
    id: "p95",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2025-09-26/olga-sese-experta-en-sueno-si-un-nino-recibe-mucha-ayuda-de-los-padres-para-dormir-no-sabra-gestionar-los-despertares.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Entrevista a Pepe Pérez, experto en sueño",
      en: "Interview With Olga Sesé, Sleep Expert",
    },
  },
  {
    id: "p96",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2025-09-10/confianza-si-pero-con-limites-el-problema-de-la-fina-linea-entre-ser-padre-o-amigo.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La fina línea entre la confianza de ser padre o volverse amigo",
      en: "The Fine Line: Striking a Balance Between Parent and Friend",
    },
  },
  {
    id: "p97",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2025-08-30/como-gestionar-la-culpa-por-perderse-momentos-clave-de-la-vida-de-tu-hijo.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Cómo gestionar la culpa paternal por la ausencia en momentos infantiles",
      en: "How to Manage Parental Guilt Over Missing Childhood Milestones",
    },
  },
  {
    id: "p98",
    externalUrl:
      "https://elpais.com/mamas-papas/expertos/2025-08-22/que-hace-que-un-nino-quiera-leer-por-si-mismo.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Cómo fomentar la lectura infantil",
      en: "How to Foster a Love of Reading in Children",
    },
  },
  {
    id: "p99",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2025-07-27/no-no-estoy-llorando-por-que-algunos-padres-esconden-su-tristeza-y-como-afecta-a-los-hijos.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Ocultar las emociones negativas propias a los hijos",
      en: "Hiding Negative Emotions From Your Children: Good or Bad?",
    },
  },
  {
    id: "p100",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2025-07-15/como-lidiar-con-el-sindrome-del-principe-destronado-el-momento-que-muchos-padres-temen-tras-tener-el-segundo-hijo.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "El síndrome del príncipe destronado y cómo gestionarlo",
      en: "Dethroned Prince Syndrome: How to Manage It",
    },
  },
  {
    id: "p101",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2025-06-20/ser-solo-el-padre-de-o-la-madre-de-cuando-la-identidad-propia-se-desdibuja-detras-de-un-hijo.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Perder la identidad propia tras la paternal",
      en: "Lost in Parenthood: Maintaining Your Identity After Having Kids",
    },
  },
  {
    id: "p102",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2025-06-07/por-que-es-importante-encontrar-tiempo-para-jugar-con-los-hijos-a-pesar-del-cansancio.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La importancia de jugar con los hijos pese al cansancio",
      en: "The Power of Playtime: Why Bonding With Your Kids Matters Even When Exhausted",
    },
  },
  {
    id: "p103",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2025-05-29/y-si-no-se-lo-pasa-bien-como-gestionar-la-angustia-paternal-en-las-fiestas-infantiles.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "La angustia paternal en las fiestas infantiles",
      en: "Parental Anxiety at Childern's Parties",
    },
  },
  {
    id: "p104",
    externalUrl:
      "https://elpais.com/mamas-papas/familia/2025-05-09/julia-menu-tiktoker-la-infertilidad-no-solo-es-no-quedarte-embarazada-son-las-hormonas-los-pinchazos-y-encima-a-mi-me-trataron-como-una-mierda.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Entrevista a la TikToker de maternidad Julia Menú",
      en: "Interview With Julia Menú, TikToker parenting",
    },
  },
  {
    id: "p105",
    externalUrl:
      "https://elpais.com/mamas-papas/actualidad/2025-04-25/paola-roig-psicologa-perinatal-y-escritora-se-trata-de-ir-abrazando-entendiendo-y-cuidando-la-madre-que-eres-no-la-de-las-redes-o-la-que-te-has-imaginado.html",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: {
      es: "Entrevista a la psicóloga perinatal Paola Roig",
      en: "Interview With Paola Roig, Perinatal Psychologist",
    },
  },
] satisfies HomeProject[];

export default projects;
