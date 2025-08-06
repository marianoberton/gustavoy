"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Actualizar el reloj cada segundo con la fecha actual
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
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

  // Componente del reloj estilizado (solo digital)
  const ClockDisplay = () => (
    <div className="bg-gray-800 rounded-lg p-2 shadow-inner">
      {/* Información digital */}
      <div className="flex flex-col">
        <div className="flex items-center text-emerald-400 font-mono text-base font-medium">
          <FiClock className="mr-1" />
          <span>{formattedTime}</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs mt-1">
          <FiCalendar className="mr-1 text-gray-500" />
          <span className="tracking-tight">{capitalizedDate}</span>
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - Izquierda */}
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl">
            Gustavo Yarroch
          </Link>
        </div>

        {/* Menú en Desktop - Centro */}
        <nav className="hidden lg:flex items-center space-x-8">
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

        {/* Sección derecha (reloj en desktop o hamburguesa en mobile) */}
        <div className="flex items-center">
          {/* Reloj solo en Desktop */}
          <div className="hidden lg:block">
            <ClockDisplay />
          </div>

          {/* Icono de Hamburguesa en Mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none"
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
      </div>
    </header>
  );
};

export default Navbar;
