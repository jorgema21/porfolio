import type { HomeProject } from "../projects.js";

export const travelProjects: HomeProject[] = [
  {
    id: "viaj2",
    category: "viajes",
    homeVisible: true,
    homeSlot: "A3",
    publishedAt: "2026-08-19",
    externalUrl:
      "https://elpais.com/elviajero/escapadas/espana/2026-08-19/adios-lavanda-hola-girasoles-un-viaje-por-burgos-cuando-en-agosto-cambia-de-color.html",
    mediumStyle: "El País",
    title: {
      es: "Ruta por pueblos de Burgos que en agosto cambian de color",
      en: "A Summer Road Trip Through Burgos' Colorful Countryside",
    },
    description: {
      es: "Un viaje por los campos burgaleses que en verano pasan del morado de la lavanda al amarillo de los girasoles",
      en: "Discover the villages and fields of Burgos, where summer landscapes shift from the purple of lavender to the golden yellow of sunflowers.",
    },
  },
  {
    id: "viaj1",
    category: "viajes",
    homeVisible: true,
    homeSlot: "E1",
    publishedAt: "2026-07-15",
    externalUrl:
      "https://elpais.com/elviajero/2026-07-15/cinco-consejos-para-evitar-el-sindrome-de-la-clase-turista-en-vuelos-largos.html",
    mediumStyle: "El País",
    title: {
      es: "Consejos para evitar el síndrome de la clase turista",
      en: "How to Avoid Deep Vein Thrombosis on Long Flights",
    },
    description: {
      es: "A la hora de tomar vuelos largos, moverse o hidratarse pueden ayudar mucho a evitar arruinarse las vacaciones antes de llegar",
      en: "When taking long flights, staying active and hydrated can go a long way toward keeping your vacation from being ruined before it even begins.",
    },
  },
];
