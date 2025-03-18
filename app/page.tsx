import fs from "fs";
import path from "path";
import ArticulosSinWP from "@/components/ArticulosSinWP";
import LatestVideos from "@/components/LatestVideos";
import SocialNav from "@/components/SocialNav";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4 space-y-8">
      {/* Feed de Twitter */}
      <div>
        <h3 className="text-lg font-bold mb-4">Últimos Tweets</h3>
        <div className="overflow-hidden">
          <a
            className="twitter-timeline"
            href="https://twitter.com/GustavoYarroch?ref_src=twsrc%5Etfw"
            data-height="1700"
          >
            Tweets by GustavoYarroch
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </div>
      </div>

      {/* Banner debajo del feed de Twitter */}
      <div className="mt-8">
        <a
          href="https://www.legislatura.gob.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src="/banner.jpeg"
            alt="Legislatura de Buenos Aires"
            width={300}
            height={250}
            className="mx-auto"
          />
        </a>
      </div>
    </aside>
  );
};

export default async function Home() {
  // Leer el archivo videos.json desde la carpeta public
  const videosFilePath = path.join(process.cwd(), "public", "videos.json");
  const videosJson = fs.readFileSync(videosFilePath, "utf-8");
  let videos = JSON.parse(videosJson);

  // Asigna un ID secuencial en caso de que no venga en el JSON
  videos = videos.map((video: any, index: number) => ({
    id: video.id || index + 1,
    ...video,
  }));

  // Leer el archivo articles_with_ids.json desde la carpeta public
  const articlesFilePath = path.join(process.cwd(), "public", "articles_with_ids.json");
  const articlesJson = fs.readFileSync(articlesFilePath, "utf-8");
  const articles = JSON.parse(articlesJson);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <Image
              src="/yarroch.jpg"
              alt="Foto de Gustavo Yarroch"
              width={300}
              height={300}
              className="rounded-full shadow-md mx-auto md:mx-0"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-2">Gustavo Yarroch</h1>
            <p className="text-gray-700 leading-relaxed">
              Soy periodista con más de 20 años de experiencia cubriendo los eventos deportivos más importantes, 
              desde los mundiales hasta los partidos que hacen historia.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 py-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          <ArticulosSinWP articles={articles} />
          <LatestVideos videos={videos} />
        </div>
        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* SocialNav */}
      <SocialNav />
    </>
  );
}
