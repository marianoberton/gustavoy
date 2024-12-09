// /components/SocialNav.tsx
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa"; // Iconos de las redes sociales

const SocialNav = () => {
  return (
    <nav className="flex justify-center space-x-6 py-4 bg-gray-900">
      <a
        href="https://www.youtube.com/@gustavoyarroch"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-500 hover:text-red-700 transition-colors"
        aria-label="YouTube"
      >
        <FaYoutube size={30} />
      </a>
      <a
        href="https://www.instagram.com/gustavoryarroch/?hl=es"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-700 transition-colors"
        aria-label="Instagram"
      >
        <FaInstagram size={30} />
      </a>
      <a
        href="https://x.com/GustavoYarroch"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 transition-colors"
        aria-label="X"
      >
        <FaTwitter size={30} />
      </a>
    </nav>
  );
};

export default SocialNav;
