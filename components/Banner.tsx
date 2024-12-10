import Image from "next/image";

const Banner = () => {
  return (
    <div className="mt-8 space-y-8">
      {/* Feed de Twitter */}
      <div>
        <h3 className="text-lg font-bold mb-4">Últimos Tweets</h3>
        <div className="overflow-hidden">
          <a
            className="twitter-timeline"
            href="https://twitter.com/GustavoYarroch?ref_src=twsrc%5Etfw"
            data-height="1800"
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
      <div>
        <a
          href="https://www.legislatura.gob.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src="/banner.jpeg" // Asegúrate de que la imagen esté en la carpeta `public/`
            alt="Legislatura de Buenos Aires"
            width={300}
            height={250}
            className="mx-auto"
          />
        </a>
      </div>
    </div>
  );
};

export default Banner;
