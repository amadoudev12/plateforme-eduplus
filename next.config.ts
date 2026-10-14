import type { NextConfig } from "next";

// Adresse du backend. En ligne, elle est donnée par la variable BACKEND_URL (réglages Vercel)
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  // Le navigateur appelle toujours « /api/... » sur l'adresse du site, et Next transmet la demande au backend.
  // Le cookie de session appartient ainsi au site lui-même : il n'est pas bloqué par Safari
  // comme le serait un cookie posé par un autre domaine.
  async rewrites() {
    return [{ source: "/api/:chemin*", destination: `${BACKEND_URL}/api/:chemin*` }];
  },
};

export default nextConfig;
