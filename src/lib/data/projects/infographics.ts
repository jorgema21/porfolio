import type { HomeProject } from "../projects.js";

export const infographicProjects = [
  {
    id: "info41",
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
    id: "info38",
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
    id: "info44",
    slug: "implantacion-teletrabajo",
    category: "infografia",
    homeVisible: true,
    homeSlot: "A1",
    title: {
      es: "El teletrabajo: una nueva opción de producción laboral en España",
      en: "Remote Work in Spain: A New Way of Working",
    },
    description: {
      es: "Desde la pandemia, trabajar sin estar en la oficina gana más adeptos gracias a su flexibilidad, pero también detractores",
      en: "Since the pandemic, remote work has gained supporters thanks to its flexibility, but it has also attracted critics",
    },
    image: "/images/projects/implantacion-teletrabajo-ip.webp",
  },
  {
    id: "info42",
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
    id: "info43",
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
    id: "info40",
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
    id: "info36",
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
    id: "info34",
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
    id: "info37",
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
    id: "info35",
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
    id: "info39",
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
    id: "info29",
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
    id: "info26",
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
    id: "info30",
    slug: "roland-garros-sin-nadal",
    category: "infografia",
    homeVisible: true,
    homeSlot: "D2",
    featured: true,
    title: {
      es: "Los secretos de la tierra batida: ¿Por qué Nadal impuso su dominio?",
      en: "The Secrets of Clay: How Nadal Dominated the Surface",
    },
    description: {
      es: "Análisis del legado de Rafa Nadal en Roland Garros y su carrera",
      en: "An analytical breakdown of Rafa Nadal's statistical legacy at Roland Garros and clay.",
    },
    image: "/images/projects/roland-garros-sin-nadal-ip.webp",
  },
  {
    id: "info12",
    slug: "radiografia-abstencionismo",
    variant: "grid",
    category: "infografia",
    homeVisible: false,
    featured: true,
    title: {
      es: "Cómo la brecha socioeconómica impulsa el abstencionismo en España",
      en: "How Socioeconomic Gaps Drive Voter Abstention in Spain",
    },
    description: {
      es: "Análisis de datos y mapeo interactivo que visualiza los factores económicos detrás de la decisión de no votar",
      en: "Data analysis and interactive mapping visualizing the economic factors behind the choice not to vote.",
    },

    image: "/images/projects/radiografia-abstencionismo-ip.webp",
  },
  {
    id: "info19",
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
    id: "info33",
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
    id: "info31",
    slug: "rearme-ue",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/rearme-ue-ip.webp",
    title: {
      es: "La Unión Europea se rearma frente a los nuevos desafíos globales",
      en: "Europe's Military Transformation: How the EU Rearms in a Changing World",
    },
    description: {
      es: "Diseño editorial a doble página que desglosa el gasto militar y la estrategia de defensa comunitaria",
      en: "A double-page print layout breaking down military spending and the collaborative European defense strategy.",
    },
  },
  {
    id: "info28",
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
    id: "info27",
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
    id: "info8",
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
    id: "info32",
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
    id: "info24",
    slug: "aceite-espanol",
    category: "infografia",
    homeVisible: false,
    image: "/images/projects/aceite-espanol-ip.webp",
    title: {
      es: "Cómo los aranceles de Trump en 2024 sacudieron a las olivareras andaluzas",
      en: "How Trump's 2024 Tariffs Affected Andalusian Olive Producers",
    },
    description: {
      es: "Mapas y gráficos de exportación para explicar el impacto del conflicto arancelario con Estados Unidos",
      en: "Trade maps and export charts explaining the impact of the tariff dispute with the United States.",
    },
  },
  {
    id: "info20",
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
    id: "info7",
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
    id: "info15",
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
    id: "info4",
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
    id: "info22",
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
    id: "info25",
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
    id: "info23",
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
    id: "info11",
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
    id: "info13",
    slug: "final-femenina-mundial",
    title: {
      es: "Una cita con la historia: las claves tácticas de la final femenina entre España e Inglaterra",
      en: "A Date With History: Tactical Keys to the World Cup Final Between Spain and England Women",
    },
    description: {
      es: "Doble página con infografías de rendimiento sobre cómo la selección española e inglesa llegaron a la final",
      en: "A double-page print layout featuring performance graphics showing how Spain and England reached the final.",
    },
    image: "/images/projects/final-femenina-mundial-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "info2",
    slug: "final-qatar-22",
    title: {
      es: "¿La final de Qatar 2022 fue la mejor de la historia?",
      en: "Was the Qatar 2022 Final the Greatest in World Cup History?",
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
    id: "info10",
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
    id: "info5",
    slug: "golf-aumento-velocidad-distancia",
    title: {
      es: "El 'boom' de los pegadores y la evolución de la distancia en el golf moderno",
      en: "The Boom in Long Hitters and Driving Distance in Modern Golf",
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
    id: "info14",
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
    id: "info6",
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
    id: "info1",
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
    id: "info17",
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
    id: "info18",
    slug: "madrid-girona",
    title: {
      es: "Real Madrid y Girona frente a frente por el trono de LaLiga",
      en: "Real Madrid and Girona Face Off for the LaLiga Crown",
    },
    description: {
      es: "Estadísticas de los dos equipos punteros antes del duelo directo de la competición",
      en: "A statistical comparison of the two leading teams ahead of their head-to-head league match.",
    },
    image: "/images/projects/madrid-girona-ip.webp",
    category: "infografia",
    homeVisible: false,
  },
  {
    id: "info21",
    slug: "nba-maximos-puntos",
    title: {
      es: "¿Por qué la NBA alcanza las puntuaciones más altas de su historia?",
      en: "Why Is NBA Scoring Reaching Record Highs?",
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
    id: "info3",
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
    id: "info9",
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
    id: "info16",
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
] satisfies HomeProject[];
