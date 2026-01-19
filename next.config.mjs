/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Note: Removed 'output: export' for Vercel deployment
    // Vercel handles server-side rendering natively
    trailingSlash: true,
    images: {
        // Using Next.js Image Optimization on Vercel
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
            },
            {
                protocol: 'https',
                hostname: 'portfolio-assets-manthan291999.s3.ap-south-1.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: '*.s3.*.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
