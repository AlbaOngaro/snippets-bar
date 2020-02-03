import React, { useContext, ChangeEvent } from "react";
import styled from "styled-components";

import { SnippetsContext, ThemeContext } from "../../../contexts";

import Header from "../Header";

import styles from "./styles";
import { Snippet } from "../../../contexts/snippets/types";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

interface Props {};

export default (props: Props) => {
  const { snippets, snippet, filterSnippets, getSnippetById } = useContext(
    SnippetsContext
  );
  const { theme } = useContext(ThemeContext);

  return (
    <Sidebar theme={theme} {...props}>
      <Header
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
			if (!!filterSnippets) {
				filterSnippets(e.target.value);
			}
		}}
      />
      <ul>
        {!!snippets && !snippets.isEmpty() && snippets.map((snippet: Snippet | Map<any, any>) => (
            <li
              key={snippet.get("id")}
              onClick={() => {
				  if (!!getSnippetById) {
					getSnippetById(snippet.get("id"))
				  }
			  }}
            >
              {snippet.get("name")}
            </li>
          ))}

        {!!snippets && snippets.isEmpty() && !!snippet && snippet.isEmpty() && <li>No snippets yet</li>}
      </ul>
    </Sidebar>
  );
};
