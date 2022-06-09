/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['mager-apps.s3.us-west-1.amazonaws.com', 'markas-gamer.herokuapp.com']
  }
}

module.exports = nextConfig
