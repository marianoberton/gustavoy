// components/Hero.tsx
import Image from "next/image";

interface HeroProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

export default function Hero({ imageUrl, title, subtitle }: HeroProps) {
  return (
    <section className="relative w-full h-[400px] bg-gray-800">
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
