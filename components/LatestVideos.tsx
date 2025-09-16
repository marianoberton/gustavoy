"use client";

import { useState, useEffect } from "react";
import { getRecentItems } from "@/lib/dateUtils";
import config from "../config.json";

type Video = {
  title: string;
  url: string;
  thumbnail: string;
  upload_date_formatted?: string;
};

// Helper function para extraer el ID del video de la URL de YouTube
function getYouTubeID(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
  const match = url.match(regex);
  return match?.[1] || match?.[2] || "";
}

const VideoCard = ({ video }: { video: Video }) => {
  const [play, setPlay] = useState(false);
  const videoId = getYouTubeID(video.url);
  const thumbnailUrl =
    video.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-56 bg-gray-200">
        {play ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="cursor-pointer" onClick={() => setPlay(true)}>
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white opacity-75"
                fill="currentColor"
                viewBox="0 0 84 84"
              >
                <circle cx="42" cy="42" r="42" fill="currentColor" opacity="0.5" />
                <polygon points="33,26 33,58 59,42" fill="white" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {video.title}
        </h3>
        {video.upload_date_formatted && (
          <p className="text-sm text-gray-500 mb-2">
            {video.upload_date_formatted}
          </p>
        )}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Ver en YouTube
        </a>
      </div>
    </div>
  );
};

export default function LatestVideos({ videos }: { videos: Video[] }) {
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Filtrar y mostrar videos recientes según configuración
    const recentVideos = getRecentItems(videos, config.content.videos.homeMaxItems);
    console.log('Videos filtrados por fecha:', recentVideos.length);
    console.log('Primeros 3 videos:', recentVideos.slice(0, 3).map(v => ({ fecha: v.upload_date_formatted, titulo: v.title.substring(0, 30) })));
    setDisplayedVideos(recentVideos);
  }, [videos]);

  // Se toman solo los videos filtrados (ya limitados por getRecentItems)
  const latestVideos = displayedVideos;

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Últimos Videos</h2>
      {latestVideos.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.map((video) => (
            <li key={video.id}>
              <VideoCard video={video} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No hay videos disponibles.</p>
      )}
    </section>
  );
}
