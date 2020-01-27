const { menubar } = require("menubar");
const path = require("path");
const url = require("url");
const { nativeTheme, systemPreferences } = require("electron");
require("dotenv").config();

const mb = menubar({
  index:
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    }),
  icon: nativeTheme.shouldUseDarkColors
    ? "public/icon-light.png"
    : "public/icon-dark.png",
  browserWindow: {
    alwaysOnTop: process.env.NODE_ENV === "dev",
    width: 600,
    height: 350,
    webPreferences: {
      nodeIntegration: true
    }
  }
});

mb.on("ready", () => {
  systemPreferences.subscribeNotification(
    "AppleInterfaceThemeChangedNotification",
    function theThemeHasChanged() {
      mb.setOption(
        "icon",
        nativeTheme.shouldUseDarkColors
          ? "public/icon-dark.png"
          : "public/icon-light.png"
      );
    }
  );
});
