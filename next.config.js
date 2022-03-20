const withPWA = require("next-pwa");

const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,

  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },

  env: {
    APP_VERSION: version,
  },
});
