import React, { useContext } from "react";
import styled from "styled-components";

import { SnippetsContext, ThemeContext } from "../../../contexts";

import Header from "../Header";

import styles from "./styles";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

export default props => {
  const { snippets, snippet, filterSnippets, getSnippetById } = useContext(
    SnippetsContext
  );
  const { theme } = useContext(ThemeContext);

  return (
    <Sidebar theme={theme} {...props}>
      <Header
        search
        onChange={e => {
          filterSnippets(e.target.value);
        }}
      />
      <ul>
        {!snippets.isEmpty() &&
          snippets.map(snippet => (
            <li
              key={snippet.get("id")}
              onClick={() => getSnippetById(snippet.get("id"))}
            >
              {snippet.get("name")}
            </li>
          ))}

        {snippets.isEmpty() && snippet.isEmpty() && <li>No snippets yet</li>}
      </ul>
    </Sidebar>
  );
};
