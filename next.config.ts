import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // `/about` is exported as `about/index.html`, so any static host serves it.
  trailingSlash: true,
  images: {
    // Static export has no image optimisation server.
    unoptimized: true,
  },
};

export default nextConfig;
