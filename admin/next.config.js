/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flowerbox.s3.ca-central-1.amazonaws.com","api.dicebear.com"],
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
