import React from "react";
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

const ThemeProvider = ({ children, theme = "dark" }) => (
  <Provider theme={themes[theme]}>{children}</Provider>
);

export { ThemeContext, ThemeProvider };
