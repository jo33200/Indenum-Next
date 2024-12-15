/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.leboncoin.fr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
