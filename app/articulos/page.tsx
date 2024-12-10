import type { Metadata } from "next";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  articleUrl: string;
};

export const metadata: Metadata = {
  title: "Artículos - Gustavo Yarroch",
  description: "Una selección de los mejores artículos deportivos.",
};

export default function ArticulosPage() {
  const mockArticles: Article[] = [
    {
      id: 1,
      title:
        "Marcelo Gallardo ya piensa en 2025: los jugadores que buscará sumar a River Plate y los que se irán",
      excerpt:
        "El equipo “millonario” tiene ahora como único objetivo la clasificación a la próxima Copa Libertadores. Para la próxima temporada se espera una depuración y la llegada de incorporaciones de renombre.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/R4QQLQWQRNAIBLRENG3CGS3SXY?auth=43558fcfa73e0dcf3301104917b1994044dafbc021c7d8bc6362af2e670db635&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/11/28/marcelo-gallardo-ya-piensa-en-2025-los-jugadores-que-buscara-sumar-a-river-plate-y-los-que-se-iran/",
    },
    {
      id: 2,
      title:
        "El rompecabezas de Lionel Scaloni para enfrentar a Perú: la posible formación de Argentina",
      excerpt:
        "El combinado nacional albiceleste sufre diversas bajas de peso, como las de Cuti Romero y Nahuel Medina.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/DJYFI5745BE2LCXZVZRESBGN2E?auth=9249cafd01266804a622324faf32d0d7eddbea248af62b757b360a0b0938fc82&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/11/17/el-rompecabezas-de-lionel-scaloni-para-enfrentar-a-peru-la-posible-formacion-de-argentina/",
    },
    {
      id: 3,
      title:
        "La lista de jugadores de River que rendirán examen en la última parte del año para definir su continuidad",
      excerpt:
        "Al conjunto de Núñez le quedan siete partidos, que podrían ser ocho si la AFA decide jugar la Supercopa Internacional ante Talleres. Gran parte del plantel será evaluado por Gallardo.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/TVCSKGK4NJAQDDHEFAH4QFPXIU.jpg?auth=9050854c6bd94f0b0b809f99972e63f61a48a6ba0b36673c40f348408b20db75&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/11/05/la-lista-de-jugadores-de-river-que-rendiran-examen-en-la-ultima-parte-del-ano-para-definir-su-continuidad/",
    },
    {
      id: 4,
      title:
        "Otamendi es uno de los grandes sueños de River Plate para el Mundial de Clubes: las chances de lograrlo",
      excerpt:
        "El marcador central campeón del mundo tiene la cuenta pendiente de ponerse la camiseta del club del que es hincha confeso. Cuáles son las posibilidades de que se cumpla.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/HZEMPUWWOZGZDI5DY6S6GREUYI.jpg?auth=e91e3b64327484516b9c75fde6abc6fc365114a120285c2d465d24afaf75421c&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/10/22/otamendi-es-uno-de-los-grandes-suenos-de-river-plate-para-el-mundial-de-clubes-las-chances-de-lograrlo/",
    },
    {
      id: 5,
      title:
        "Un cambio por línea: la formación de Argentina que se perfila para enfrentar a Bolivia por las Eliminatorias",
      excerpt:
        "Scaloni analiza tres modificaciones para el choque de este martes: apostaría por un esquema más ofensivo, con tres delanteros.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/E3DFHYXA5X2SZUKVREEOJCIAZE.jpg?auth=e9d531e5477bd8acf0f0a27c19a96e92ce2befb0733715a08cbe6136175166f9&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/10/14/un-cambio-por-linea-la-formacion-de-argentina-que-se-perfila-para-enfrentar-a-bolivia-por-las-eliminatorias/",
    },
    {
      id: 6,
      title:
        "Los cambios que podría realizar Lionel Scaloni en la selección argentina para el duelo ante Bolivia del próximo martes",
      excerpt:
        "El entrenador de la Albiceleste evalúa las posibles variantes de cara al siguiente compromiso por Eliminatorias.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/EHVUVN7BFNE6HE6BON4DBVSZS4?auth=18283d3e1aeb8b0fb855318ad14823606f6ff9f54608436bcb2fe584ecf58cf9&smart=true&width=992&height=558&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/10/11/los-cambios-que-podria-realizar-lionel-scaloni-en-la-seleccion-argentina-para-el-duelo-ante-bolivia-del-proximo-martes/",
    },
    {
      id: 7,
      title:
        "Nicolás Paz, otro de los “europibes” que seducen a Scaloni: su historia y la influencia del alemán Kroos",
      excerpt:
        "El mediocampista ofensivo es uno de los juveniles citados por el técnico campeón del mundo para los partidos frente a Venezuela y Bolivia. Hoy irá al banco de suplentes en Maturín.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/X72QY7H77VA6DE75DD2RTND64Q.jpg?auth=ae840fb2f61a5cceba0a2bfb9a93c9f1fcb0b962fff7c946f6db0be8e6b14031&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/10/10/nicolas-paz-otro-de-los-europibes-que-seducen-a-scaloni-su-historia-y-la-influencia-del-aleman-kroos/",
    },
    {
      id: 8,
      title:
        "Por qué recuperar la mejor versión de Borja es otro de los nuevos objetivos de Gallardo en River Plate",
      excerpt:
        "El colombiano rendía mejor con Martín Demichelis que ahora con el “Muñeco”, quien fue el que pidió insistentemente por su llegada al conjunto “millonario”.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/J54YPANWVNHUHPEJY6RGYV4EEM.jpg?auth=0761b81beaaa01985574ec13954c05c586e41f16bb651980b7f67d929983cff0&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/09/29/por-que-recuperar-la-mejor-version-de-borja-es-otro-de-los-nuevos-objetivos-de-gallardo-en-river-plate/",
    },
    {
      id: 9,
      title:
        "Los cuatro grandes ganadores de River tras el triunfo contra Boca y el “premio” frente a Colo Colo",
      excerpt:
        "El clásico frente al Xeneize dejó un semblante positivo en varios protagonistas, que quieren estar en la revancha de los cuartos de final de la Copa Libertadores.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/Q33UKND2NNEXNIOLGESRDNYRJM.jpg?auth=4264d1e9677ae99dcc6e4bd00ea9aeebf57c85c9ed639cae53c807db210ed1b2&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/09/24/los-cuatro-grandes-ganadores-de-river-tras-el-triunfo-contra-boca-y-el-premio-frente-a-colo-colo/",
    },
    {
      id: 10,
      title:
        "Convicción, triunfos resonantes y sorpresas tácticas: los Superclásicos de Marcelo Gallardo y cómo los vive",
      excerpt:
        "El técnico de River Plate modificó la historia moderna del club con las cinco victorias consecutivas en partidos de eliminación directa o finales, entre 2014 y 2019.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/PRFAANS2RFDXDI7A3Y5TCMPWW4.JPG?auth=e281237f057675b9ec35ae156d0992ca4a5577c0c54f90d7f5b3a3e68381890b&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/09/21/conviccion-triunfos-resonantes-y-sorpresas-tacticas-los-superclasicos-de-marcelo-gallardo-y-como-los-vive/",
    },
    {
      id: 11,
      title:
        "Del hito de Scaloni a la solidez defensiva: las cinco claves de la Selección de cara al duro partido frente a Colombia",
      excerpt:
        "El equipo campeón del mundo y bicampeón de América afrontará esta tarde un exigente partido en Barranquilla frente al conjunto dirigido por Néstor Lorenzo.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/EHVUVN7BFNE6HE6BON4DBVSZS4?auth=18283d3e1aeb8b0fb855318ad14823606f6ff9f54608436bcb2fe584ecf58cf9&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/09/10/del-hito-de-scaloni-a-la-solidez-defensiva-las-cinco-claves-de-la-seleccion-de-cara-al-duro-partido-frente-a-colombia/",
    },
    {
      id: 12,
      title:
        "Todos los detalles de la despedida a Ángel Di María durante el partido de la selección argentina en el Monumental",
      excerpt:
        "Fideo estará presente en el duelo ante Chile por las Eliminatorias, pero ya no como jugador. Se espera una noche especial para uno de los héroes de La Scaloneta.",
      imageUrl:
        "https://www.infobae.com/resizer/v2/WTPNKMS3MZADLCN6H2YQUWZACE?auth=bb8f7bc13c453939a33c347102bd2c58a42e03284347fce1e8ca3b1d4b8c6ea4&smart=true&width=400&height=225&quality=85",
      articleUrl:
        "https://www.infobae.com/deportes/2024/09/10/del-hito-de-scaloni-a-la-solidez-defensiva-las-cinco-claves-de-la-seleccion-de-cara-al-duro-partido-frente-a-colombia/",
    },
  ];

  return (
    <section>
      <header className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Todos los Artículos de Infobae</h1>
          <p className="text-lg mt-2">
            Una selección de los mejores artículos deportivos analizados y recomendados.
          </p>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <a
                  href={article.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Leer más
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
