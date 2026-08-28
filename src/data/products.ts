import type { Product } from "../types";

export const GRINDS = [
  "En grano",
  "Molido · espresso",
  "Molido · filtro / V60",
  "Molido · prensa francesa",
] as const;

export const CATEGORY_LABELS: Record<Product["category"], string> = {
  origen: "Origen único",
  blend: "Blend de la casa",
  descafeinado: "Descafeinado",
};

export const FREE_SHIPPING_FROM = 40;
export const SHIPPING_COST = 4.9;

export const products: Product[] = [
  {
    id: "etiopia-yirgacheffe",
    name: "Etiopía Yirgacheffe",
    origin: "Gedeo, Etiopía",
    category: "origen",
    roast: 2,
    price: 18.9,
    notes: ["Bergamota", "Jazmín", "Durazno blanco"],
    description:
      "Un lote lavado de las tierras altas de Gedeo, cuna del café. Tueste claro para conservar su carácter floral: la taza abre con bergamota y jazmín, y cierra con un dulzor limpio de durazno blanco. Delicado, brillante y largo.",
    process: "Lavado · fermentación 36 h",
    altitude: "1 900 – 2 100 m s. n. m.",
    variety: "Heirloom etíope",
    image: "https://image.qwenlm.ai/generated-images/85ee985c-a958-48c3-b0c7-386d419f8205/_result.png",
    accent: "#e9c87e",
  },
  {
    id: "colombia-huila",
    name: "Colombia Huila",
    origin: "San Agustín, Huila",
    category: "origen",
    roast: 3,
    price: 16.5,
    notes: ["Panela", "Frutos rojos", "Caramelo"],
    description:
      "Cultivado por la familia Trujillo en laderas volcánicas del macizo colombiano. Tueste medio que equilibra acidez y cuerpo: panela al inicio, frutos rojos en el centro y un final largo a caramelo. Nuestro caballo de batalla.",
    process: "Lavado doble",
    altitude: "1 650 m s. n. m.",
    variety: "Caturra · Castillo",
    image: "https://image.qwenlm.ai/generated-images/457a9048-1439-4e51-bf52-244a37ff1e7b/_result.png",
    accent: "#e0875a",
  },
  {
    id: "brasil-cerrado",
    name: "Brasil Cerrado",
    origin: "Alta Mogiana, Brasil",
    category: "origen",
    roast: 4,
    price: 14.2,
    notes: ["Avellana", "Chocolate amargo", "Azúcar crudo"],
    description:
      "Un natural del cerrado brasileño, secado al sol en camas africanas. Tueste medio-oscuro, cuerpo redondo y baja acidez: avellana tostada, chocolate amargo y un dulzor de azúcar crudo. Impecable con leche.",
    process: "Natural · secado lento",
    altitude: "1 100 m s. n. m.",
    variety: "Mundo Novo",
    image: "https://image.qwenlm.ai/generated-images/568c6fad-1bb9-4944-8c6e-df9f7bb0ca8b/_result.png",
    accent: "#c9973f",
  },
  {
    id: "blend-aurora",
    name: "Blend Aurora",
    origin: "Colombia + Brasil",
    category: "blend",
    roast: 3,
    price: 13.8,
    notes: ["Chocolate con leche", "Avellana", "Naranja"],
    description:
      "Nuestra mezcla para despertar: dos tercios de Huila lavado sobre un tercio de Cerrado natural. Dulzor de chocolate con leche, textura de avellana y un chispeo cítrico de naranja. Pensado para espresso y moka.",
    process: "Mezcla post-tueste",
    altitude: "1 100 – 1 650 m s. n. m.",
    variety: "Caturra · Mundo Novo",
    image: "https://image.qwenlm.ai/generated-images/7c99ac30-79ed-48b4-befe-8d838cf13f21/_result.png",
    accent: "#e8a05e",
  },
  {
    id: "blend-nocturno",
    name: "Blend Nocturno",
    origin: "Brasil + Colombia + Etiopía",
    category: "blend",
    roast: 5,
    price: 12.9,
    notes: ["Cacao", "Azúcar quemada", "Nuez"],
    description:
      "El espresso de la casa al caer la noche: un tueste oscuro y valiente que no se vuelve ceniza. Cacao intenso, azúcar quemada y nuez, con un cuerpo denso que corta la leche sin perderse. Para los que el café lo quieren serio.",
    process: "Mezcla post-tueste",
    altitude: "1 100 – 1 900 m s. n. m.",
    variety: "Blend de estación",
    image: "https://image.qwenlm.ai/generated-images/ad0d6e78-d5bf-40a6-8e63-2787fb4077ec/_result.png",
    accent: "#e8a857",
  },
  {
    id: "chiapas-descafeinado",
    name: "Chiapas Descafeinado",
    origin: "Sierra Madre, Chiapas",
    category: "descafeinado",
    roast: 3,
    price: 15.6,
    notes: ["Cacao", "Miel", "Almendra"],
    description:
      "Descafeinado de caña de azúcar: el mismo cariño, sin la cafeína. El proceso natural con etanol de caña respeta el perfil de la taza — cacao, miel y almendra — para que la última taza del día no le quite el sueño a nadie.",
    process: "Descafeinado EA · caña",
    altitude: "1 400 m s. n. m.",
    variety: "Bourbon",
    image: "https://image.qwenlm.ai/generated-images/3569a49c-5a5b-4acb-99ac-e7db3604e41f/_result.png",
    accent: "#a3b18a",
  },
];
