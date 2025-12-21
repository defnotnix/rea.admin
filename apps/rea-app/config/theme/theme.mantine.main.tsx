export const configThemeMantineMain: any = {
  // * COLORS & SHADES
  colors: {
    brand: [
      "##fdf4f3", // 50
      "#fce4e5", // 100
      "#faced0", // 200
      "#f5acaf", // 300
      "#ec7d82", // 400
      "#e05359", // 500
      "#cc343b", // 600
      "#ac292f", // 700
      "#8e262b", // 800
      "#772529", // 900
      "#400f11", // 950
    ],
  },
  primaryColor: "brand",
  primaryShade: {
    light: 6,
    dark: 6,
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
