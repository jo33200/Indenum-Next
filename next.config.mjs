/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  // Ajoutez le chemin de base si nécessaire
  basePath: '/Indenum-Next',
  assetPrefix: 'Indenum-Next/',
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.leboncoin.fr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gedvcdylaaygslrbfupf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/rates-images/**", // Chemin pour les images Supabase
      },
      {
        protocol: "https",
        hostname: "gedvcdylaaygslrbfupf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/home-images/**", // Ajusté pour "home-images"
      },
    ],
  },
};

export default nextConfig;
