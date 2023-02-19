const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
});

const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,

  transpilePackages: ["@material/material-color-utilities"],

  env: {
    APP_VERSION: version,
  },
});
