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
  slug?: string;
  externalUrl?: string;
  featured?: boolean;
}

const projects = [
  {
    id: "p1",
    slug: "vivienda-construnews",
    variant: "hero",
    category: "infografia",
    homeVisible: true,
    featured: true,
    title: {
      es: "Vivienda industrializada: ¿solución para la crisis inmobiliaria en España?",
      en: "Industrializing Housing: A Potential Solution to Spain's Real Estate Crisis",
    },
    description: {
      es: "Análisis sobre la situación de la vivienda española desde el punto de vista de la construcción modular",
      en: "An analysis of the Spanish housing market through the lens of modular construction.",
    },

    image: "/images/projects/vivienda-construnews-ip.webp",
    colStart: 1,
    colSpan: 9,
    rowStart: 1,
    rowSpan: 3,
  },
  {
    id: "p2",
    externalUrl: "proyecto-2",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: true,
    mediumStyle: "El País",
    title: { es: "Proyecto 2", en: "Project 2" },
    description: { es: "Descripción corta", en: "Short description" },
    colStart: 10,
    colSpan: 3,
    rowStart: 1,
  },
  {
    id: "p3",
    externalUrl: "proyecto-3",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: true,
    mediumStyle: "El País",
    title: { es: "Proyecto 3", en: "Project 3" },
    description: { es: "Descripción corta", en: "Short description" },
    colStart: 10,
    colSpan: 3,
    rowStart: 2,
  },
  {
    id: "p4",
    externalUrl: "proyecto-4",
    variant: "list",
    category: "maternidad",
    homeVisible: true,
    mediumStyle: "El País",
    title: { es: "Proyecto 4", en: "Project 4" },
    description: { es: "Descripción corta", en: "Short description" },
    colStart: 10,
    colSpan: 3,
    rowStart: 3,
  },
  {
    id: "p5",
    slug: "tren-contrastes",
    variant: "grid",
    category: "infografia",
    homeVisible: true,
    featured: true,
    title: {
      es: "La España a dos velocidades: el mapa de la desigualdad en el acceso al tren",
      en: "A Two-Speed Spain: Mapping Inequities in the National Rail Network",
    },
    description: {
      es: "Un recorrido visual por el vacío ferroviario de la Península que contrasta la España aislada con la hiperconectada a través de datos, mapas e infografías",
      en: "A visual exploration of Spain's railway gaps, contrasting isolated regions with hyper-connected hubs through data, maps and infographics.",
    },

    image: "/images/projects/tren-contrastes-ip.webp",
    colStart: 1,
    colSpan: 4,
    rowStart: 5,
  },
  {
    id: "p6",
    slug: "mudanzas-estres",
    variant: "grid",
    category: "infografia",
    homeVisible: true,
    title: {
      es: "Radiografía del éxodo interno: cómo nos movemos entre los municipios españoles",
      en: "Mapping Internal Migration: How People Move Across Spanish Municipalities",
    },
    description: {
      es: "Datos y mapas sobre el movimiento de la población que retrata el flujo poblacional y el crecimiento de la España vaciada",
      en: "A data-driven portrait of population shifts, tracking the population flow and the widening gap of the empty Spain.",
    },

    image: "/images/projects/mudanzas-estres-ip.webp",
    colStart: 5,
    colSpan: 4,
    rowStart: 5,
  },
  {
    id: "p7",
    slug: "fugas-participacion-femenina",
    variant: "grid",
    category: "infografia",
    homeVisible: true,
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
    colStart: 9,
    colSpan: 4,
    rowStart: 5,
  },
  {
    id: "p8",
    slug: "este-porfolio",
    variant: "feature",
    category: "infografia",
    homeVisible: true,
    featured: true,
    title: {
      es: "Planteamiento y desarrollo de este porfolio desde cero",
      en: "Behind the Code and Design of This Portfolio Website",
    },
    description: {
      es: "El proceso de desarrollo, retos de rendimiento y decisiones de diseño detrás de la pantalla",
      en: "The development process, performance challenges, and design decisions behind the screen.",
    },

    image: "/images/projects/vivienda-construnews-ip.webp",
    colStart: 1,
    colSpan: 12,
    rowStart: 7,
  },
  {
    id: "p9",
    slug: "radiografia-musica-vivo",
    variant: "feature",
    category: "infografia",
    homeVisible: true,
    featured: true,
    title: {
      es: "Música en vivo: por qué las entradas son más caras que nunca",
      en: "Live Music: Why Tickets Are More Expensive Than Ever",
    },
    description: {
      es: "Datos e infografías para entender la compleja situación actual de los conciertos en directo",
      en: "Data and infographics to understand the complex realities of today's live concert industry.",
    },

    image: "/images/projects/radiografia-musica-vivo-ip.webp",
    colStart: 1,
    colSpan: 12,
    rowStart: 8,
  },
  {
    id: "p10",
    externalUrl: "proyecto-10",
    variant: "list",
    category: "maternidad",
    homeVisible: true,
    mediumStyle: "El País",
    title: { es: "Proyecto 10", en: "Project 10" },
    description: { es: "Texto corto", en: "Short text" },
    colStart: 1,
    colSpan: 3,
    rowStart: 12,
  },
  {
    id: "p11",
    externalUrl: "proyecto-11",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: true,
    mediumStyle: "El País",
    title: { es: "Proyecto 11", en: "Project 11" },
    description: { es: "Texto corto", en: "Short text" },
    colStart: 1,
    colSpan: 3,
    rowStart: 13,
  },
  {
    id: "p12",
    externalUrl: "proyecto-12",
    variant: "list",
    category: "estilo_de_vida",
    homeVisible: true,
    mediumStyle: "El País",
    title: { es: "Proyecto 12", en: "Project 12" },
    description: { es: "Texto corto", en: "Short text" },
    colStart: 1,
    colSpan: 3,
    rowStart: 14,
  },
  {
    id: "p13",
    slug: "premios-oscar",
    variant: "hero",
    category: "infografia",
    homeVisible: true,
    featured: true,
    title: {
      es: "Estadísticas de los Óscar: los secretos detrás de los grandes premios del cine",
      en: "Oscars Analytics: The Hidden Patterns Behind Cinema's Biggest Night",
    },
    description: {
      es: "Desarrollo web y visualización de datos históricos para entender las tendencias de la Academia",
      en: "Web development and data visualization of historical trends to understand Academy patterns.",
    },

    image: "/images/projects/premios-oscar-ip.webp",
    colStart: 4,
    colSpan: 9,
    rowStart: 12,
    rowSpan: 3,
  },
  {
    id: "p14",
    slug: "roland-garros-sin-nadal",
    variant: "grid",
    category: "infografia",
    homeVisible: true,
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
    colStart: 1,
    colSpan: 4,
    rowStart: 10,
  },
  {
    id: "p15",
    slug: "radiografia-abstencionismo",
    variant: "grid",
    category: "infografia",
    homeVisible: true,
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
    colStart: 5,
    colSpan: 4,
    rowStart: 10,
  },
  {
    id: "p16",
    slug: "inter-atleti",
    variant: "grid",
    category: "infografia",
    homeVisible: true,
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
    colStart: 9,
    colSpan: 4,
    rowStart: 10,
  },
  //NOHOME
  {
    id: "p17",
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
    id: "p18",
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
    id: "p19",
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
    id: "p20",
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
    id: "p21",
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
    id: "p22",
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
    id: "p23",
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
    id: "p24",
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
    id: "p25",
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
    id: "p26",
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
    id: "p27",
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
    id: "p28",
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
    id: "p29",
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
    id: "p30",
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
    id: "p31",
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
    id: "p32",
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
    id: "p33",
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
    id: "p34",
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
    id: "p35",
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
    id: "p36",
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
    id: "p37",
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
    id: "p38",
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
    id: "p39",
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
    id: "p40",
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
    id: "p41",
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
    id: "p42",
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
    id: "p43",
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
    id: "p44",
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

  //edv
  {
    id: "p46",
    externalUrl: "proyecto-46",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 47", en: "Project 47" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p47",
    externalUrl: "proyecto-47",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 47", en: "Project 47" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p48",
    externalUrl: "proyecto-48",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 48", en: "Project 48" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p49",
    externalUrl: "proyecto-49",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 49", en: "Project 49" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p50",
    externalUrl: "proyecto-50",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 50", en: "Project 50" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p51",
    externalUrl: "proyecto-51",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 51", en: "Project 51" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p52",
    externalUrl: "proyecto-52",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 52", en: "Project 52" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p53",
    externalUrl: "proyecto-53",
    category: "estilo_de_vida",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 53", en: "Project 53" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p54",
    externalUrl: "proyecto-54",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 54", en: "Project 54" },
    description: { es: "Texto corto", en: "Short text" },
  },
  {
    id: "p55",
    externalUrl: "proyecto-55",
    category: "maternidad",
    mediumStyle: "El País",
    homeVisible: false,
    title: { es: "Proyecto 55", en: "Project 55" },
    description: { es: "Texto corto", en: "Short text" },
  },
] satisfies HomeProject[];

export default projects;
