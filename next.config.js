/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    distDir: 'dist',
    // swcMinify: true,
    images: {
        domains: ['storage.googleapis.com'],
    },
    env: {
        BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
    },
};

module.exports = nextConfig;
