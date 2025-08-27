import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['via.placeholder.com', 'firebasestorage.googleapis.com', 'letsxploredev-6277c.firebasestorage.app'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline';",
  },
};

export default nextConfig;
