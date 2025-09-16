"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getRecentItems } from "@/lib/dateUtils";
import config from "../../config.json";

type Video = {
  id: number;
  title: string;
  url: string;
  thumbnail?: string | null;
  upload_date_formatted?: string;
};

// Helper para extraer el ID del video de la URL de YouTube
function getYouTubeID(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
  const match = url.match(regex);
  return match?.[1] || match?.[2] || "";
}

// Componente que muestra la miniatura y, al hacer clic, carga el iframe
const VideoCard = ({ video }: { video: Video }) => {
  const [play, setPlay] = useState(false);
  const videoId = getYouTubeID(video.url);
  // Usa la miniatura proporcionada o la URL estándar de YouTube
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
            <Image
              src={thumbnailUrl}
              alt={video.title}
              width={640}
              height={360}
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

export default function VideosList({ videos }: { videos: Video[] }) {
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [visibleCount, setVisibleCount] = useState(config.content.videos.pageMaxItems);

  useEffect(() => {
    // Filtrar videos recientes según configuración
    const recentVideos = getRecentItems(videos);
    setDisplayedVideos(recentVideos);
  }, [videos]);
  const visibleVideos = displayedVideos.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      {visibleCount < displayedVideos.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Ver más
          </button>
        </div>
      )}
    </>
  );
}
