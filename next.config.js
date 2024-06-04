/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 't4.ftcdn.net',
                port: '',
                pathname: '/jpg/**',
            },
            { protocol: 'https', hostname: '*' }
        ],
    },
}

module.exports = nextConfig
