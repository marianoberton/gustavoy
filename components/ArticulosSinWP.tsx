"use client";

import { useState, useEffect } from "react";
import { getRecentItems } from "@/lib/dateUtils";
import config from "../config.json";

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

// Helper para construir la URL absoluta
function getAbsoluteUrl(url: string): string {
  if (url.startsWith("http")) {
    return url;
  }
  // Ajusta el dominio si es necesario
  return `https://www.infobae.com${url}`;
}

export default function ArticulosSinWP({ articles }: { articles: Article[] }) {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Filtrar artículos recientes según configuración
    const recentArticles = getRecentItems(articles, config.content.articles.homeMaxItems);
    setDisplayedArticles(recentArticles);
  }, [articles]);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Últimos Artículos</h2>
      {displayedArticles.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article) => {
            const absoluteImg = getAbsoluteUrl(article.image.src);
            const absoluteLink = getAbsoluteUrl(article.url);

            return (
              <li
                key={article.id}
                className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={absoluteImg}
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
                      href={absoluteLink}
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
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-700">No hay artículos disponibles.</p>
      )}
    </section>
  );
}
