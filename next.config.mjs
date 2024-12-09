/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Cambiado de https a http
        hostname: process.env.WORDPRESS_HOSTNAME || "l0060181.ferozo.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
