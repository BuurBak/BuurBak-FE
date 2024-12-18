/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/buurbak_public/**",
      },
      {
        protocol: "https",
        hostname: "api.buurbak.nl",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "api.buurbak.nl",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
