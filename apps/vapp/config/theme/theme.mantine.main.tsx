export const configThemeMantineMain: any = {
  // * COLORS & SHADES
  colors: {
    brand: [
      "#eff8fc", // 50
      "#d8edf5", // 100
      "#b5daec", // 200
      "#82bfde", // 300
      "#479bc9", // 400
      "#2c7fae", // 500
      "#276793", // 600
      "#265478", // 700
      "#274863", // 800
      "#243d55", // 900
      "#04080c", // 950
    ],
  },
  primaryColor: "brand",
  primaryShade: {
    light: 6,
    dark: 5,
  },
  autoContrast: true,
  luminanceThreshold: 0.5,

  // white : "#ffffff"
  // black : "#000000"

  // * FONTS
  fontFamily: `"Stack Sans Headline", sans-serif`,
  fontSmoothing: true,

  headings: {
    fontFamily: `"Stack Sans Headline", sans-serif`,
    sizes: {
      h1: { fontSize: "36" },
    },
  },
};
