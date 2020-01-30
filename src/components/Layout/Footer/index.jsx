import React, { Fragment, useContext } from "react";
import styled from "styled-components";

import { ThemeContext, SnippetsContext } from "../../../contexts";

import Button from "../../Elements/Button";
import { Copy, Edit, Delete, Plus } from "../../../assets/svg";

import styles from "./styles";

const Footer = styled.div`
  ${styles.Footer}
`;

export default props => {
  const theme = useContext(ThemeContext);
  const { snippet, removeSnippet } = useContext(SnippetsContext);

  return (
    <Footer theme={theme} {...props}>
      {snippet.isEmpty() && (
        <Button>
          <Plus /> new
        </Button>
      )}

      {!snippet.isEmpty() && (
        <Fragment>
          <Button>
            <Copy /> copy
          </Button>
          <Button>
            <Edit /> edit
          </Button>
          <Button onClick={() => removeSnippet(snippet.get("id"))}>
            <Delete /> delete
          </Button>
          <Button>
            <Plus /> new
          </Button>
        </Fragment>
      )}
    </Footer>
  );
};
