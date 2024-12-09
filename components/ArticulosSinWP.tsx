type Article = {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    articleUrl: string;
  };
  
  export default function ArticulosSinWP({ articles }: { articles: Article[] }) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Artículos Infobae</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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
        ) : (
          <p className="text-gray-700">No hay artículos disponibles.</p>
        )}
      </section>
    );
  }
  
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
  ];
  
  export function ArticulosSinWPPage() {
    return <ArticulosSinWP articles={mockArticles} />;
  }
  