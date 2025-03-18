"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import Link from "next/link";
import { AnalogClock } from "@hoseinh/react-analog-clock";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Actualizar la hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);

  // Formatear la hora en formato de 24 horas (Argentina)
  const formattedTime = currentTime.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires'
  });

  // Formatear la fecha (Argentina)
  const formattedDate = currentTime.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires'
  });

  // Capitalizar primera letra de la fecha
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  // Componente del reloj estilizado
  const ClockDisplay = () => (
    <div className="flex items-center bg-gray-800 rounded-lg p-2 shadow-inner gap-3">
      {/* Reloj analógico */}
      <div className="relative">
        <AnalogClock 
          size="60px"
          showSecondHand={true}
          showBorder={true}
          showHandBase={true}
          smooth={true}
          backgroundColor="#111827"
          borderColor="#4B5563"
          handColor={{ hour: "#94A3B8", minute: "#38BDF8", second: "#f43f5e" }}
          handLength={{ hour: "20px", minute: "26px", second: "26px" }}
          handThickness={{ hour: "2.5px", minute: "2px", second: "1px" }}
          numbersType="dots"
          whiteNumbers={true}
        />
      </div>
      
      {/* Información digital */}
      <div className="flex flex-col">
        <div className="text-emerald-400 font-mono text-base font-medium">
          {formattedTime}
        </div>
        <div className="flex items-center text-gray-400 text-xs mt-1">
          <FiCalendar className="mr-1 text-gray-500" />
          <span className="tracking-tight">{capitalizedDate}</span>
        </div>
      </div>
    </div>
  );

  // Versión compacta del reloj para móviles
  const CompactClockDisplay = () => (
    <div className="flex flex-col items-center bg-gray-800 rounded-lg p-2 shadow-inner">
      <div className="mb-2">
        <AnalogClock 
          size="70px"
          showSecondHand={true}
          showBorder={true}
          showHandBase={true}
          smooth={true}
          backgroundColor="#111827"
          borderColor="#4B5563"
          handColor={{ hour: "#94A3B8", minute: "#38BDF8", second: "#f43f5e" }}
          handLength={{ hour: "25px", minute: "32px", second: "32px" }}
          handThickness={{ hour: "2.5px", minute: "2px", second: "1px" }}
          numbersType="dots"
          whiteNumbers={true}
        />
      </div>
      <div className="text-emerald-400 font-mono text-base font-medium mt-1">
        {formattedTime}
      </div>
      <div className="flex items-center text-gray-400 text-xs mt-1">
        <FiCalendar className="mr-1 text-gray-500" />
        <span className="tracking-tight">{capitalizedDate.split(',')[0]}</span>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 grid grid-cols-3 items-center">
        {/* Logo - Izquierda */}
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl">
            Gustavo Yarroch
          </Link>
        </div>

        {/* Menú en Desktop - Centro */}
        <nav className="hidden lg:flex justify-center items-center space-x-8">
          <Link href="/sobre-mi" className="text-base hover:text-emerald-300 transition-colors">
            Sobre mí
          </Link>
          <Link href="/articulos" className="text-base hover:text-emerald-300 transition-colors">
            Artículos
          </Link>
          <Link href="/videos" className="text-base hover:text-emerald-300 transition-colors">
            Videos
          </Link>
        </nav>

        {/* Contenedor derecho (reloj en desktop y icono hamburguesa en mobile) */}
        <div className="flex justify-end items-center">
          {/* Reloj en Desktop y Tablet */}
          <div className="hidden md:block">
            <ClockDisplay />
          </div>
          
          {/* Reloj compacto en móvil (sm) */}
          <div className="hidden sm:block md:hidden">
            <CompactClockDisplay />
          </div>

          {/* Icono de Hamburguesa en Mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none ml-4"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en Mobile */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden bg-gray-800 text-white space-y-4 p-4`}
      >
        <Link
          href="/sobre-mi"
          className="block text-center text-base hover:text-emerald-300 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Sobre mí
        </Link>
        <Link
          href="/articulos"
          className="block text-center text-base hover:text-emerald-300 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Artículos
        </Link>
        <Link
          href="/videos"
          className="block text-center text-base hover:text-emerald-300 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Videos
        </Link>
        <div className="flex justify-center pt-3 pb-1">
          <CompactClockDisplay />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
