import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/admin.html", destination: "/admin", permanent: true },
      { source: "/general.html", destination: "/general", permanent: true },
      { source: "/riskguard.html", destination: "/riskguard", permanent: true },
      { source: "/dashboard", destination: "/dashboard.html", permanent: false },
    ];
  },
};

export default nextConfig;
