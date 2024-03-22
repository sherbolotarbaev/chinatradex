/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'zwolzmcodtrfbcofztei.supabase.co',
      'lh3.googleusercontent.com',
      'cdn-icons-png.freepik.com',
      'localhost:3000',
    ],
  },
};

export default nextConfig;
