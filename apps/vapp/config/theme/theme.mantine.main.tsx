export const configThemeMantineMain: any = {
  // * COLORS & SHADES
  colors: {
    brand: [
      "#F4F9F6", // 50
      "#D9EEE2", // 100
      "#B2DDC5", // 200
      "#84C4A2", // 300
      "#5AA780", // 400
      "#418867", // 500
      "#326F53", // 600
      "#2B5444", // 700
      "#26493A", // 800
      "#233E32", // 900
      "#040907", // 950
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
