export const configThemeMantineMain: any = {
  // * COLORS & SHADES
  colors: {
    brand: [
      "#ffe5e5", // 0 - lightest
      "#ffcccc", // 1
      "#ffb3b3", // 2
      "#ff9999", // 3
      "#ff8080", // 4
      "#E44D4D", // 5 - main brand color (from design)
      "#cc4444", // 6
      "#b33b3b", // 7
      "#993333", // 8
      "#802a2a", // 9 - darkest
    ],
    dark: [
      "#C9C9C9", // 0 - lightest text
      "#b8b8b8", // 1
      "#828282", // 2
      "#696969", // 3
      "#424242", // 4
      "#2f2f2f", // 5 - card background
      "#1f1f1f", // 6 - surface
      "#1a1a1a", // 7 - main background
      "#141414", // 8
      "#0a0a0a", // 9 - darkest
    ],
  },
  primaryColor: "brand",
  primaryShade: {
    light: 5,
    dark: 5,
  },
  autoContrast: true,
  luminanceThreshold: 0.3,

  white: "#ffffff",
  black: "#0a0a0a",

  // * FONTS
  fontFamily: `"Stack Sans Headline", -apple-system, BlinkMacSystemFont, sans-serif`,
  fontSmoothing: true,

  headings: {
    fontFamily: `"Stack Sans Headline", -apple-system, BlinkMacSystemFont, sans-serif`,
    fontWeight: "600",
    sizes: {
      h1: { fontSize: "36px", lineHeight: "1.2" },
      h2: { fontSize: "30px", lineHeight: "1.3" },
      h3: { fontSize: "24px", lineHeight: "1.4" },
      h4: { fontSize: "20px", lineHeight: "1.5" },
      h5: { fontSize: "18px", lineHeight: "1.5" },
      h6: { fontSize: "16px", lineHeight: "1.5" },
    },
  },

  // * DEFAULT RADIUS
};
