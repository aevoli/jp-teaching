import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isDev ? "" : "/jp-teaching",
  assetPrefix: isDev ? "" : "/jp-teaching/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
