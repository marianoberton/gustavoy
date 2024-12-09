type Video = {
    id: number;
    title: string;
    url: string;
  };
  
  export default function LatestVideos({ videos }: { videos: Video[] }) {
    return (
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Últimos Videos</h2>
        {videos.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <li
                key={video.id}
                className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-56 bg-gray-200">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeID(video.url)}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {video.title}
                  </h3>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Ver en YouTube
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No hay videos disponibles.</p>
        )}
      </section>
    );
  }
  
  // Helper function to extract the YouTube video ID from the URL
  function getYouTubeID(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
    const match = url.match(regex);
    return match?.[1] || match?.[2] || "";
  }
  
  // Example usage with mock data
  const mockVideos: Video[] = [
    { id: 1, title: "River Plate vs Boca Juniors - Highlights", url: "https://www.youtube.com/watch?v=udqh11_OSvo" },
    { id: 2, title: "Selección Argentina - Camino al Mundial", url: "https://www.youtube.com/watch?v=fwgfxPlZtEU" },
    { id: 3, title: "Entrevista con Lionel Messi", url: "https://www.youtube.com/watch?v=h-4Tq27lGlA" },
    { id: 4, title: "Análisis táctico: River Plate", url: "https://www.youtube.com/watch?v=0qvFJgv1x5k" },
    { id: 5, title: "El fútbol en el siglo XXI", url: "https://www.youtube.com/watch?v=zq1xJyEml_A" },
    { id: 6, title: "Copa del Mundo Qatar 2022 - Resumen", url: "https://www.youtube.com/watch?v=88JK1yjlPnU" },
  ];
  
  export function LatestVideosPage() {
    return <LatestVideos videos={mockVideos} />;
  }
  