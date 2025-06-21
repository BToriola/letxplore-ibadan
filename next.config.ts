import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['via.placeholder.com'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline';",
  },
};

export default nextConfig;
