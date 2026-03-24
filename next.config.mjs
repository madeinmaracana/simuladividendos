/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "icons.brapi.dev", pathname: "/icons/**" },
    ],
  },
};

export default nextConfig;
