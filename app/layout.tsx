import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar"; // Importar la nueva Navbar

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Gustavo Yarroch - Blog Deportivo",
  description: "Análisis, noticias y reflexiones del mundo deportivo.",
  metadataBase: new URL("https://gustavo-yarroch.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={fontSans.variable}>
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <Navbar /> {/* Usamos el nuevo componente Navbar */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Gustavo Yarroch. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
