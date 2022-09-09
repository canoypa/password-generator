const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
});
const withTM = require("next-transpile-modules")([
  "@material/material-color-utilities",
]);

const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = withTM(
  withPWA({
    reactStrictMode: true,

    env: {
      APP_VERSION: version,
    },
  })
);
