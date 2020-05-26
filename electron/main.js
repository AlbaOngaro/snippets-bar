const { menubar } = require("menubar");
const path = require("path");
const url = require("url");
const { nativeTheme, Menu } = require("electron");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

require("dotenv").config();

const isDev = process.env.NODE_ENV === "dev";

function selectIcon() {
  if (process.env.NODE_ENV === "dev") {
    return nativeTheme.shouldUseDarkColors
      ? "public/TrayLightTemplate.png"
      : "public/TrayDarkTemplate.png";
  }

  return nativeTheme.shouldUseDarkColors
    ? path.join(__dirname, "../TrayLightTemplate.png")
    : path.join(__dirname, "../TrayDarkTemplate.png");
}

const mb = menubar({
  index:
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    }),
  icon: selectIcon(),
  browserWindow: {
    alwaysOnTop: isDev,
    width: 600,
    height: 350,
    icon: url.format({
      pathname: path.join(__dirname, "../Icon.icns"),
      protocol: "file:",
      slashes: true,
    }),
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
    },
  },
  showDockIcon: isDev,
});

mb.on("ready", () => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));

    installExtension("hgldghadipiblonfkkicmgcbbijnpeog")
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }

  nativeTheme.on("updated", () => {
    mb.setOption(
      "icon",
      nativeTheme.shouldUseDarkColors
        ? "public/icon-dark.png"
        : "public/icon-light.png"
    );
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => {
        mb.app.quit();
      },
    },
  ]);

  mb.tray.on("right-click", () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});
