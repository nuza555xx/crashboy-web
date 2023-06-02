/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'dist',
    swcMinify: true,
    images: {
        domains: ['storage.googleapis.com'],
        minimumCacheTTL: 60,
    },
    env: {
        BASE_API_URL: process.env.BASE_API_URL,
    },
};

module.exports = nextConfig;
