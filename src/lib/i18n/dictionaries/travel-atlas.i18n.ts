type TravelAtlasDict = {
  title: string;
  coverage: string;
  filter: {
    all: string;
    substantial: string;
  };
  world: string;
  allDestinations: string;
  back: string;
  recenter: string;
  mapData: string;
  selectPrompt: string;
  search: {
    label: string;
    placeholder: string;
    noResults: string;
    listLabel: string;
    showList: string;
    hideList: string;
  };
  emptyArticles: string;
  emptyPlaces: string;
  articleCountLabelOne: string;
  articleCountLabel: string;
  places: {
    one: string;
    other: string;
  };
  nonGeographic: {
    title: string;
    description: string;
  };
  articles: {
    one: string;
    other: string;
  };
  countriesCountLabelOne: string;
  countriesCountLabel: string;
  destinationsIn: string;
  relevance: {
    protagonist: string;
    detailed: string;
    mention: string;
  };
  aria: {
    atlas: string;
    geographicPath: string;
    exploreDestinations: string;
    distribution: string;
    globeControls: string;
    destinationCard: string;
    newTab: string;
    globe: string;
    globeSelectedPrefix: string;
  };
  ticketList: {
    moreArticles: string;
    lessArticles: string;
  };
  groupedPlaces: string;
  stopRotation: string;
  retry: string;
  mapLoadError: string;
};

export const travelAtlas: Record<"es" | "en", TravelAtlasDict> = {
  es: {
    title: "Atlas de viajes",
    coverage: "Cobertura",
    filter: {
      all: "Todos",
      substantial: "Principal o detallado",
    },
    world: "El mundo",
    allDestinations: "Todos los destinos",
    back: "Volver",
    recenter: "Centrar",
    mapData: "Cartografía:",
    selectPrompt: "Selecciona un lugar para consultar los reportajes.",
    search: {
      label: "Buscar destino",
      placeholder: "Buscar un lugar...",
      noResults: "No se han encontrado destinos.",
      listLabel: "Destinos",
      showList: "Ver lista",
      hideList: "Ocultar lista",
    },
    emptyArticles:
      "Este destino no tiene reportajes que cumplan el filtro activo.",
    emptyPlaces: "No hay lugares que cumplan este filtro.",
    articleCountLabelOne: "artículo con destino",
    articleCountLabel: "artículos con destino",
    places: {
      one: "lugar",
      other: "lugares",
    },
    nonGeographic: {
      title: "Viajes sin destino geográfico",
      description:
        "Otros reportajes sobre experiencias, consejos y temas relacionados con viajar.",
    },
    articles: {
      one: "reportaje",
      other: "reportajes",
    },
    countriesCountLabelOne: "país",
    countriesCountLabel: "países",
    destinationsIn: "Destinos en",
    relevance: {
      protagonist: "Destino principal",
      detailed: "Tratado en detalle",
      mention: "Mención breve",
    },
    aria: {
      atlas: "Atlas de viajes",
      geographicPath: "Ruta geográfica",
      exploreDestinations: "Explorar destinos",
      distribution: "Distribución de lugares por territorio",
      globeControls: "Controles del globo",
      destinationCard: "Tarjeta de destino",
      newTab: "(abre en otra pestaña)",
      globe: "Globo terráqueo interactivo",
      globeSelectedPrefix: "Globo terráqueo. Destino seleccionado:",
    },
    ticketList: {
      moreArticles: "Ver más reportajes ({count})",
      lessArticles: "Ver menos reportajes",
    },
    groupedPlaces: "Lugares agrupados",
    stopRotation: "Detener giro",
    retry: "Reintentar",
    mapLoadError: "No se ha podido cargar toda la cartografía.",
  },
  en: {
    title: "Travel atlas",
    coverage: "Coverage",
    filter: {
      all: "All",
      substantial: "Main or detailed",
    },
    world: "The world",
    allDestinations: "All destinations",
    back: "Back",
    recenter: "Recenter",
    mapData: "Map data:",
    selectPrompt: "Select a place to explore its articles.",
    search: {
      label: "Search destinations",
      placeholder: "Search for a place...",
      noResults: "No destinations found.",
      listLabel: "Destinations",
      showList: "Show list",
      hideList: "Hide list",
    },
    emptyArticles:
      "This destination has no articles matching the current filter.",
    emptyPlaces: "No places match this filter.",
    articleCountLabelOne: "article with destinations",
    articleCountLabel: "articles with destinations",
    places: {
      one: "place",
      other: "places",
    },
    nonGeographic: {
      title: "Travel beyond destinations",
      description:
        "More stories about travel experiences, practical advice, and related topics.",
    },
    articles: {
      one: "article",
      other: "articles",
    },
    countriesCountLabelOne: "country",
    countriesCountLabel: "countries",
    destinationsIn: "Destinations in",
    relevance: {
      protagonist: "Main destination",
      detailed: "Covered in detail",
      mention: "Brief mention",
    },
    aria: {
      atlas: "Travel atlas",
      geographicPath: "Geographic path",
      exploreDestinations: "Explore destinations",
      distribution: "Distribution of places by area",
      globeControls: "Globe controls",
      destinationCard: "Destination card",
      newTab: "(opens in a new tab)",
      globe: "Interactive globe",
      globeSelectedPrefix: "Globe. Selected destination:",
    },
    ticketList: {
      moreArticles: "More stories ({count})",
      lessArticles: "Show fewer stories",
    },
    groupedPlaces: "Grouped places",
    stopRotation: "Stop rotation",
    retry: "Retry",
    mapLoadError: "Some map data could not be loaded.",
  },
};
