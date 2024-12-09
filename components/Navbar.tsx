"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          Gustavo Yarroch
        </Link>

        {/* Icono de Hamburguesa */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menú en Desktop */}
        <nav className="hidden lg:flex space-x-4">
          <Link href="/sobre-mi" className="hover:underline">
            Sobre mí
          </Link>
          <Link href="/articulos" className="hover:underline">
            Artículos
          </Link>
          <Link href="/videos" className="hover:underline">
            Videos
          </Link>
        </nav>
      </div>

      {/* Menú desplegable en Mobile */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden bg-gray-800 text-white space-y-2 p-4`}
      >
        <Link
          href="/sobre-mi"
          className="block hover:underline"
          onClick={() => setIsMenuOpen(false)}
        >
          Sobre mí
        </Link>
        <Link
          href="/articulos"
          className="block hover:underline"
          onClick={() => setIsMenuOpen(false)}
        >
          Artículos
        </Link>
        <Link
          href="/videos"
          className="block hover:underline"
          onClick={() => setIsMenuOpen(false)}
        >
          Videos
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
