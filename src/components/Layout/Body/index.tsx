import React, { useContext, ReactNode } from "react";
import styled from "styled-components";

import { SnippetContextInterface } from "../../../types/snippets";

import { ThemeContext, SnippetContext } from "../../../contexts";

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
  const { snippet }: Partial<SnippetContextInterface> = useContext(
    SnippetContext
  );

  return (
    <Body theme={theme} {...props}>
      {!!snippet && !snippet.isEmpty() && <code>{snippet.get("contents")}</code>}
    </Body>
  );
};
