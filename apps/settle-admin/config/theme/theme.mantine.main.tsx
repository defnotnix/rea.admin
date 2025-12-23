export const configThemeMantineMain: any = {
  // * COLORS & SHADES
  colors: {
    brand: [
      "#f1f6fd", // 50
      "#dfecfa", // 100
      "#c7def6", // 200
      "#a1c9ef", // 300
      "#74abe6", // 400
      "#538dde", // 500
      "#3e71d2", // 600
      "#3660c4", // 700
      "#314e9c", // 800
      "#2c447c", // 900
      "#1f2b4c", // 950
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
