/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_WEB_API: process.env.NEXT_WEB_API,
  },
}

module.exports = nextConfig
