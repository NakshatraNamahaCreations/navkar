import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_SERVER === "1" ? undefined : "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
