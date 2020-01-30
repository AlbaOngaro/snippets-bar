import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext, SnippetsContext } from "../../../contexts";

import styles from "./styles";

const Body = styled.div`
  ${styles.Body}
`;

export default ({ children, ...props }) => {
  const theme = useContext(ThemeContext);
  const { snippet } = useContext(SnippetsContext);

  return (
    <Body theme={theme} {...props}>
      {!snippet.isEmpty() && <code>{snippet.get("contents")}</code>}
    </Body>
  );
};
