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

import "@/public/css/globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { configThemeMantine } from "@/config/theme";
import { ClientWrapper } from "./ClientWrapper";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

const defaultColorScheme = "dark";

export function LayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps} className={classes.html}>
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
        {/* Google Identity Services */}
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body className={classes.body}>
        <ClientWrapper>{children}</ClientWrapper>
        {/* <div className={classes.backdrop} /> */}
      </body>
    </html>
  );
}
