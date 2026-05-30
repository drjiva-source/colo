// data/news.ts

import { slugify } from "@/lib/slugify";
import type { NewsArticle } from "@/types";

const rawNews = [
  {
    title: "Fracaso de Boca en la Libertadores: perdió ante Universidad Católica",
    category: "Deportes",
    description: "Apático, el Xeneize perdió 1-0 con un golazo de Montes y, así, quedó tercero en su grupo y bajará al segundo certamen continental. No continuará Ubeda..",
    content: "Sin claridad y con más empuje que ideas, Boca fracasó en la Copa Libertadores tras una derrota por 1-0 ante Universidad Católica que lo condenó a quedar eliminado del certamen continental. Así, después de la quinta eliminación consecutiva en La Bombonera, el Xeneize ahora pasará a jugar la Copa Sudamericana ante O'Higgins y tendrá que buscar un nuevo entrenador porque a Claudio Ubeda no le renovarán el contrato que vence en junio.",
    image: "https://picsum.photos/seed/argentina/800/600",
    createdAt: "2026-05-28",
    score: 95,
    views: 1200,
  },
  {
    title: "Avances en inteligencia artificial",
    category: "Tecnología",
    description: "Nuevos modelos de IA prometen revolucionar la industria tecnológica global.",
    content: "Las últimas innovaciones en inteligencia artificial están transformando la manera en que interactuamos con la tecnología. Expertos debaten sobre las implicancias éticas de estos avances.",
    image: "https://picsum.photos/seed/ai/800/600",
    createdAt: "2026-05-27",
    score: 80,
    views: 900,
  },
  {
    title: "Economía global en cambio",
    category: "Economía",
    description: "Análisis económico de los mercados internacionales y sus proyecciones.",
    content: "Los analistas económicos prevén cambios significativos en los mercados globales para el próximo trimestre. La inflación y las tasas de interés son los principales factores a monitorear.",
    image: "https://picsum.photos/seed/economy/800/600",
    createdAt: "2026-05-26",
    score: 70,
    views: 600,
  },
  {
    title: "Descubrimiento científico en la Antártida",
    category: "Ciencia",
    description: "Investigadores encuentran nuevas especies marinas en aguas antárticas.",
    content: "Un equipo internacional de científicos ha descubierto varias especies marinas nunca antes vistas en las profundidades del océano Antártico. Este hallazgo podría ayudar a comprender mejor el cambio climático.",
    image: "https://picsum.photos/seed/antarctica/800/600",
    createdAt: "2026-05-25",
    score: 85,
    views: 750,
  },
  {
    title: "Nueva política ambiental anunciada",
    category: "Política",
    description: "El gobierno presenta un plan integral para reducir emisiones de carbono.",
    content: "El ejecutivo ha presentado un ambicioso plan de reducción de emisiones que incluye incentivos para energías renovables y restricciones a vehículos contaminantes. La oposición ha expresado sus reservas.",
    image: "https://picsum.photos/seed/policy/800/600",
    createdAt: "2026-05-24",
    score: 75,
    views: 680,
  },
  {
    title: "Festival de cine independiente bate récords",
    category: "Cultura",
    description: "El evento cultural más importante del año supera expectativas de asistencia.",
    content: "El festival de cine independiente ha cerrado sus puertas con cifras récord de asistencia y críticas positivas. Las proyecciones al aire libre fueron el éxito de esta edición.",
    image: "https://picsum.photos/seed/festival/800/600",
    createdAt: "2026-05-23",
    score: 88,
    views: 820,
  },
];

export const news: NewsArticle[] = rawNews.map((item) => ({
  ...item,
  slug: slugify(item.title),
}));