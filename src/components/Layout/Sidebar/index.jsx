import React, { useContext } from "react";
import styled from "styled-components";

import { SnippetsContext } from "../../../contexts";

import Header from "../Header";

import styles from "./styles";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

export default props => {
  const { snippets } = useContext(SnippetsContext);

  return (
    <Sidebar {...props}>
      <Header />
      <ul>{snippets && snippets.map(snippet => <li>{snippet.get('name')}</li>)}</ul>
      <button>add snippet</button>
    </Sidebar>
  );
};
