// components/AboutMe.tsx
import Image from "next/image";

interface AboutMeProps {
  imageUrl: string;
  name: string;
  description: string;
}

export default function AboutMe({ imageUrl, name, description }: AboutMeProps) {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="w-full md:w-1/3">
          <Image
            src={imageUrl}
            alt={`Foto de ${name}`}
            width={300}
            height={300}
            className="rounded-full shadow-md mx-auto"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">{name}</h2>
          <p className="text-gray-700 text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
