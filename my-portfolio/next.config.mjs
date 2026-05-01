/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Ensure resume.pdf is served with the correct headers
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: "inline; filename=\"Yogendra_Bisht_Resume.pdf\"",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
