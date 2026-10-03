/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactCompiler: true, // Disabled — conflicts with manual useCallback/useEffect dep patterns
  turbopack: {
    root: import.meta.dirname,
  },
  // Tree-shake lucide-react: only bundle the icons actually used
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

