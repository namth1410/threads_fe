/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "auto",
  overrides: [
    {
      files: "*.scss",
      options: {
        tabWidth: 4,
      },
    },
  ],
};
