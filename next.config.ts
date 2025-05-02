const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allow all paths from Cloudinary
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
