import React, { useState, useEffect, useCallback } from "react";
import { ThemeContext, ThemeProvider as Provider } from "styled-components";

const light = {
  bg: "#f2f2f2",
  fg: "#262626"
};
const dark = {
  bg: "#262626",
  fg: "#f2f2f2"
};

const themes = {
  light,
  dark
};

const ThemeProvider = ({ children }) => {
  const { nativeTheme } = require("electron").remote;
  const [theme, setTheme] = useState("dark");

  const updateTheme = useCallback(() => {
    const theme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
    setTheme(theme);
  }, [nativeTheme.shouldUseDarkColors]);

  useEffect(() => {
    updateTheme();
  }, [updateTheme]);

  nativeTheme.on("updated", updateTheme);

  return <Provider theme={themes[theme]}>{children}</Provider>;
};

export { ThemeContext, ThemeProvider };
