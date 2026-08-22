import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // "standalone" gera um server.js autocontido — necessário para o Docker da
  // intranet (frontend/Dockerfile copia .next/standalone). Na Vercel esse
  // formato de output conflita com o próprio pipeline de deploy deles (causa
  // 404 na rota raiz), então só é aplicado fora da Vercel — a plataforma
  // define a variável VERCEL automaticamente em todo build/runtime deles.
  ...(process.env.VERCEL ? {} : { output: 'standalone' as const }),
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
