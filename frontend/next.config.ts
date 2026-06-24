import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  typescript: { ignoreBuildErrors: true },
  // Proxy /api/* → backend NestJS em localhost:3001
  // Isso permite que todos os computadores da intranet usem o mesmo frontend
  // sem precisar saber o IP do servidor — o Next.js faz o proxy server-side.
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
