/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'static.wikia.nocookie.net',
            },
            {
              protocol: 'https',
              hostname: 'i.pinimg.com',
            },
          ],
        },

}

module.exports = nextConfig
