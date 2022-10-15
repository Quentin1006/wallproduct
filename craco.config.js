const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@shared": path.resolve(__dirname, "src/shared"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "typings": path.resolve(__dirname, "src/typing.ts"),
    },
  },
};