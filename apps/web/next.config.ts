import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images : {
    remotePatterns :[{
      hostname : "u7m50ivb7t.ufs.sh"
    }]
  }
};

export default nextConfig;
