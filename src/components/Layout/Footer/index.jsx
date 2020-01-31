import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { Map } from 'immutable';

import { ThemeContext, SnippetsContext } from "../../../contexts";

import Button from "../../Elements/Button";
import { Copy, Edit, Delete, Plus, Save } from "../../../assets/svg";

import styles from "./styles";

const Footer = styled.div`
  ${styles.Footer}
`;

export default props => {
  const theme = useContext(ThemeContext);
  const { snippet, getDefaultSnippet, removeSnippet, updateSnippet,  } = useContext(SnippetsContext);

  return (
    <Footer theme={theme} {...props}>
      {snippet.isEmpty() && !snippet.get('editing') && (
        <Button onClick={() => updateSnippet(new Map({ name: '', contents: '' }))}>
          <Plus /> new
        </Button>
      )}

	  {!snippet.isEmpty() && snippet.get('editing') && (
		<Fragment>
			<Button>
				<Save /> save
			</Button>
			<Button onClick={getDefaultSnippet}>
				<Delete/> delete
			</Button>
		</Fragment>
      )}

      {!snippet.isEmpty() && snippet.get('saved') && (
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
