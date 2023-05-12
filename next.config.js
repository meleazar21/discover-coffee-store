/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com']
  },
  target: "serverless"
}

module.exports = nextConfig
