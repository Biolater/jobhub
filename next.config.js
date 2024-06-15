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
            { protocol: 'https', hostname: '*' },
            {
                protocol: 'http',
                hostname: 'filecache.mediaroom.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
}

module.exports = nextConfig
