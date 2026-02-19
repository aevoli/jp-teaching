import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/jp-teaching",
  assetPrefix: "/jp-teaching/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
