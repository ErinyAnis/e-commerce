import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: "https", hostname: "cdn.sanity.io"}, 
      // render image from google
      {protocol: "https", hostname: "lh3.googleusercontent.com"}]
  }
};

export default nextConfig;
