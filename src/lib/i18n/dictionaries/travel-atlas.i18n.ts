type TravelAtlasDict = {
  title: string;
  coverage: string;
  filter: {
    all: string;
    substantial: string;
  };
  world: string;
  countries: string;
  allDestinations: string;
  back: string;
  recenter: string;
  mapData: string;
  destination: string;
  selectPrompt: string;
  search: {
    label: string;
    placeholder: string;
    noResults: string;
    listLabel: string;
    showList: string;
    hideList: string;
  };
  articleScope: {
    direct: string;
    descendant: string;
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
    rotateWest: string;
    rotateEast: string;
    zoomOut: string;
    zoomIn: string;
    destinationCard: string;
    newTab: string;
    globeEurope: string;
    globeCenteredPrefix: string;
  };
  mobileTicket: {
    viewReports: string;
    collapse: string;
    close: string;
    reopen: string;
  };
  ticketList: {
    moreArticles: string;
    lessArticles: string;
    morePlaces: string;
    lessPlaces: string;
  };
  groupedPlaces: string;
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
    countries: "Países",
    allDestinations: "Todos los destinos",
    back: "Volver",
    recenter: "Centrar",
    mapData: "Cartografía:",
    destination: "Destino",
    selectPrompt: "Selecciona un lugar para consultar los reportajes.",
    search: {
      label: "Buscar destino",
      placeholder: "Buscar un lugar...",
      noResults: "No se han encontrado destinos.",
      listLabel: "Destinos",
      showList: "Ver lista",
      hideList: "Ocultar lista",
    },
    articleScope: {
      direct: "Sobre este destino",
      descendant: "En sus destinos",
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
      rotateWest: "Girar hacia el oeste",
      rotateEast: "Girar hacia el este",
      zoomOut: "Alejar",
      zoomIn: "Acercar",
      destinationCard: "Tarjeta de destino",
      newTab: "(abre en otra pestaña)",
      globeEurope: "Globo terráqueo orientado hacia Europa",
      globeCenteredPrefix: "Globo centrado en",
    },
    mobileTicket: {
      viewReports: "Ver reportajes",
      collapse: "Contraer",
      close: "Cerrar",
      reopen: "Mostrar billete",
    },
    ticketList: {
      moreArticles: "Ver más reportajes ({count})",
      lessArticles: "Ver menos reportajes",
      morePlaces: "Ver más lugares ({count})",
      lessPlaces: "Ver menos lugares",
    },
    groupedPlaces: "Lugares agrupados",
  },
  en: {
    title: "Travel atlas",
    coverage: "Coverage",
    filter: {
      all: "All",
      substantial: "Main or detailed",
    },
    world: "The world",
    countries: "Countries",
    allDestinations: "All destinations",
    back: "Back",
    recenter: "Recenter",
    mapData: "Map data:",
    destination: "Destination",
    selectPrompt: "Select a place to explore its articles.",
    search: {
      label: "Search destinations",
      placeholder: "Search for a place...",
      noResults: "No destinations found.",
      listLabel: "Destinations",
      showList: "Show list",
      hideList: "Hide list",
    },
    articleScope: {
      direct: "About this destination",
      descendant: "Within this area",
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
      rotateWest: "Rotate west",
      rotateEast: "Rotate east",
      zoomOut: "Zoom out",
      zoomIn: "Zoom in",
      destinationCard: "Destination card",
      newTab: "(opens in a new tab)",
      globeEurope: "Globe facing Europe",
      globeCenteredPrefix: "Globe centered on",
    },
    mobileTicket: {
      viewReports: "View stories",
      collapse: "Collapse",
      close: "Close",
      reopen: "Show ticket",
    },
    ticketList: {
      moreArticles: "More stories ({count})",
      lessArticles: "Show fewer stories",
      morePlaces: "More places ({count})",
      lessPlaces: "Show fewer places",
    },
    groupedPlaces: "Grouped places",
  },
};
