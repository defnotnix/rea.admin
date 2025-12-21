//modals
import { ModalsProvider } from "@mantine/modals";
//notifications
import { Notifications } from "@mantine/notifications";

//styles

import classes from "./root.module.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import "@/public/globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { configThemeMantine } from "@/config/theme";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

const defaultColorScheme = "dark";

export function LayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript
          nonce="8IBTHwOdqNKAWeKl7plt8g=="
          defaultColorScheme={defaultColorScheme}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={classes.body}>
        <MantineProvider
          theme={configThemeMantine}
          defaultColorScheme={defaultColorScheme}
        >
          <Notifications />
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>

        <div className={classes.backdrop} />
      </body>
    </html>
  );
}
