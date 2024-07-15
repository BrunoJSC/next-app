/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/m/:id",
        destination: "/motos/:id",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "http://localhost:3000/dashboard/%22https://firebasestorage.googleapis.com/v0/b/auto-negocie.appspot.com/o/images%2Fbanner.png?alt=media&token=1407fa4e-ca04-41b3-967f-240e1f554419%22",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
