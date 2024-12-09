export default function AboutPage() {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            <img
              src="/yarroch.jpg"
              alt="Gustavo Yarroch"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Sobre mí</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Soy Gustavo Yarroch, periodista con una amplia trayectoria en medios gráficos, radiales y televisivos. 
              Actualmente, trabajo en{" "}
              <a
                href="https://www.espn.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                ESPN
              </a>
              ,{" "}
              <a
                href="https://radiolared.multimediosamerica.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Radio La Red
              </a>
              , y{" "}
              <a
                href="https://www.infobae.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Infobae
              </a>
              , con un enfoque especial en la cobertura diaria de River Plate y la Selección Argentina.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Durante mi carrera, he trabajado en prestigiosos medios como los diarios{" "}
              <span className="font-semibold">Clarín</span> y <span className="font-semibold">La Nación</span>, 
              así como en revistas especializadas como <span className="font-semibold">Mística</span> y{" "}
              <span className="font-semibold">Tele Clic</span>. También formé parte de A24 y FM Uno.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Mi experiencia incluye la cobertura de eventos deportivos de gran magnitud, como los Mundiales de fútbol 
              en Alemania 2006, Rusia 2018 y Qatar 2022. Estas experiencias me han permitido aportar una mirada única 
              y detallada sobre el mundo del deporte.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Además, soy autor de dos libros:{" "}
              <em>“Jueguen por abajo”</em> (Ediciones Al Arco), una colección de cuentos de fútbol, y{" "}
              <em>“Fútbol XXI”</em> (Libro Fútbol), un análisis profundo sobre el deporte que tanto nos apasiona.
            </p>
          </div>
        </div>
        
      </section>
    );
  }
  