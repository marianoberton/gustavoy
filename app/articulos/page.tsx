"use client";

import { useState, useEffect } from "react";
import Banner from "@/components/Banner";
import { getRecentItems } from "@/lib/dateUtils";
import config from "../../config.json";

type Article = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: {
    src: string;
    alt: string;
  };
  fecha?: string; // Campo opcional para la fecha
};

export default function ArticulosPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [visibleArticles, setVisibleArticles] = useState(config.content.articles.pageMaxItems);

  useEffect(() => {
    fetch("/articles_with_ids.json")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
        // Filtrar artículos recientes según configuración
        const recentArticles = getRecentItems(data);
        setDisplayedArticles(recentArticles);
      })
      .catch((error) => console.error("Error cargando los artículos:", error));
  }, []);

  const handleLoadMore = () => {
    setVisibleArticles((prev) => prev + 6);
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 py-8">
      <div className="flex-1">
        <header className="bg-gray-900 text-white py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Todos los Artículos de Infobae</h1>
            <p className="text-lg mt-2">
              Una selección de los mejores artículos deportivos analizados y recomendados.
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.slice(0, visibleArticles).map((article) => (
            <div
              key={article.id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={article.image.src}
                alt={article.image.alt}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Leer más
                  </a>
                  {article.fecha && (
                    <span className="text-sm text-gray-600">
                      {article.fecha}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Cargar más" */}
        {visibleArticles < displayedArticles.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Cargar más
            </button>
          </div>
        )}
      </div>

      <aside className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4">
        <Banner />
      </aside>
    </div>
  );
}
