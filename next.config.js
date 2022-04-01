const withPWA = require("next-pwa");
const withTM = require("next-transpile-modules")([
  "@material/material-color-utilities",
]);

const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = withTM(
  withPWA({
    reactStrictMode: true,

    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },

    env: {
      APP_VERSION: version,
    },
  })
);
