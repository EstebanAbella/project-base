// eslint-disable
/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development"
const withPWA = require("next-pwa")

const baseConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
      {
        source: "/botTrainingSelected",
        destination: "/botTraining/",
        permanent: false,
      },
      {
        source: "/botTrainingSelected/create",
        destination: "/botTraining",
        permanent: false,
      },
      {
        source: "/botTrainingSelected/update",
        destination: "/botTraining",
        permanent: false,
      },
      {
        source: "/clientSelected",
        destination: "/clients",
        permanent: false,
      },
      {
        source: "/userSelected",
        destination: "/users",
        permanent: false,
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = isDev
  ? baseConfig
  : withPWA({
      dest: "public",
      disable: false,
    })(baseConfig)
