import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/design-thinking",
        destination: "/work/pm-ux-study",
        permanent: true,
      },
      {
        source: "/work/john-deere",
        destination: "/work/john-deere-sus",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
};

export default nextConfig;
