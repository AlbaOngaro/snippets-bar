import React, { useContext } from "react";
import styled from "styled-components";

import { SnippetsContext, ThemeContext } from "../../../contexts";

import Header from "../Header";

import styles from "./styles";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

export default props => {
  const { snippets, filterSnippets, selectSnippet } = useContext(
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
              onClick={() => selectSnippet(snippet.get("id"))}
            >
              {snippet.get("name")}
            </li>
          ))}

        {snippets.isEmpty() && <li>No snippets yet</li>}
      </ul>
    </Sidebar>
  );
};
