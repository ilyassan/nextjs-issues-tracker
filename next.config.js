/** @type {import('next').NextConfig} */
const nextConfig = {
  // For aviod referrer-policy problems
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },
};

module.exports = nextConfig;
