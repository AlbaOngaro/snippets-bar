const { menubar } = require("menubar");
const path = require("path");
const url = require("url");
const { nativeTheme, Menu } = require("electron");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

require("dotenv").config();

console.log("path: ", path.join(__dirname, "/../build"));

function selectIcon() {
  if (process.env.NODE_ENV === "dev") {
    return nativeTheme.shouldUseDarkColors
      ? "public/icon-light.png"
      : "public/icon-dark.png";
  }

  return nativeTheme.shouldUseDarkColors
    ? path.join(__dirname, "../icon-light.png")
    : path.join(__dirname, "../icon-dark.png");
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
    alwaysOnTop: process.env.NODE_ENV === "dev",
    width: 600,
    height: 350,
    webPreferences: {
      nodeIntegration: true,
    },
  },
});

mb.on("ready", () => {
  if (process.env.NODE_ENV === "dev") {
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
