// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: ['media.graphcms.com', 'media.graphassets.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
