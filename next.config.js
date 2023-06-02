/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'dist',
    swcMinify: true,
    images: {
        domains: ['storage.googleapis.com'],
        minimumCacheTTL: 60,
    },
};

module.exports = nextConfig;
