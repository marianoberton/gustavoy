import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Banner from "@/components/Banner";
import VideosList from "./VideosList";

export const metadata: Metadata = {
  title: "Videos - Gustavo Yarroch",
  description: "Explora una selección de los mejores videos deportivos.",
};

export type Video = {
  id: number;
  title: string;
  url: string;
  thumbnail?: string | null;
};

export default async function VideosPage() {
  // Lee el archivo JSON desde la carpeta public
  const filePath = path.join(process.cwd(), "public", "videos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  let videos: Video[] = JSON.parse(jsonData);

  // Si el JSON no incluye IDs, se asignan de forma secuencial
  videos = videos.map((video, index) => ({
    id: index + 1,
    ...video,
  }));

  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 py-8">
      <div className="flex-1">
        <header className="bg-gray-900 text-white py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Videos Destacados</h1>
            <p className="text-lg mt-2">
              Una selección de los mejores videos deportivos analizados y recomendados.
            </p>
          </div>
        </header>
        <VideosList videos={videos} />
      </div>

      <aside className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4">
        <Banner />
      </aside>
    </div>
  );
}
