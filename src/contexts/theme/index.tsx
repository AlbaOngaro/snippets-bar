import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { ThemeContext, ThemeProvider as Provider } from "styled-components";
import { Theme, Themes } from '../../types/theme';

const light: Theme = {
  bg: "#f2f2f2",
  fg: "#262626"
};
const dark: Theme = {
  bg: "#262626",
  fg: "#f2f2f2"
};

const themes: Themes = {
  light,
  dark
};

interface Props {
	children: ReactNode,
}

const ThemeProvider = ({ children }: Props) => {
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
