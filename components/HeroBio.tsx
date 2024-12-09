// components/HeroBio.tsx
import Image from "next/image";

interface HeroBioProps {
  imageUrl: string;
  name: string;
  title: string;
  bio: string;
}

export default function HeroBio({ imageUrl, name, title, bio }: HeroBioProps) {
  return (
    <section className="relative bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <Image
            src={imageUrl}
            alt={`Foto de ${name}`}
            width={300}
            height={300}
            className="rounded-full shadow-md mx-auto md:mx-0"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{title}</h2>
          <p className="text-gray-700 leading-relaxed">{bio}</p>
        </div>
      </div>
    </section>
  );
}
