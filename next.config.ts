import type { NextConfig } from "next";
import path from "path";

const root = process.cwd();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Webpack can't follow the ESM `exports` of framer-motion's internal packages; point it at their CJS builds.
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "motion-utils": path.join(root, "node_modules/motion-utils/dist/cjs/index.js"),
      "motion-dom": path.join(root, "node_modules/motion-dom/dist/cjs/index.js"),
    };
    return config;
  },
};

export default nextConfig;
