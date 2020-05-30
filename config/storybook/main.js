const path = require("path");

module.exports = {
  stories: ["../../src/**/*.stories.(js|jsx|ts|tsx|mdx)"],
  webpackFinal: config => {
    config.resolve.alias["@"] = path.resolve(__dirname, "..", "..", "src");
    return config;
  },
  addons: [
    "@storybook/addon-actions",
    {
      name: "@storybook/addon-docs",
      options: {
        babelOptions: {
          presets: [
            [
              "@vue/cli-plugin-babel/preset",
              {
                jsx: false
              }
            ]
          ]
        }
      }
    },
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-notes"
  ]
};
