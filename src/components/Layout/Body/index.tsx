import React, { useContext, ReactNode } from "react";
import styled from "styled-components";

import { SnippetsContextInterface } from "../../../contexts/snippets/types";

import { ThemeContext, SnippetsContext } from "../../../contexts";

import styles from "./styles";

const Body = styled.div`
  ${styles.Body}
`;

interface Props {
  children?: ReactNode;
  full?: boolean;
}

export default ({ children, ...props }: Props) => {
  const theme = useContext(ThemeContext);
  const { snippet }: Partial<SnippetsContextInterface> = useContext(
    SnippetsContext
  );

  return (
    <Body theme={theme} {...props}>
      {!snippet.isEmpty() && <code>{snippet.get("contents")}</code>}
    </Body>
  );
};
