import React, { ReactNode } from "react";
import styled from "styled-components";

import styles from "./styles";
import { Theme } from "../../../types/theme";

const Footer = styled.div`
  ${styles.Footer}
`;

interface IFooterProps {
	theme: Theme,
	children?: ReactNode,
}

export default ({ theme, children }: IFooterProps) => {
  return (
    <Footer theme={theme}>
		{children}
      {/* {!!snippet && snippet.isEmpty() && !snippet.get("editing") && (
        <Button
          onClick={() => {
            if (!!editSnippet) {
              editSnippet(Map({ name: "", contents: "" }));
            }
          }}
        >
          <Plus /> new
        </Button>
      )}

      {!!snippet && !snippet.isEmpty() && snippet.get("editing") && (
        <Fragment>
          <Button>
            <Save /> save
          </Button>
          <Button onClick={getSnippet}>
            <Delete /> delete
          </Button>
        </Fragment>
      )}

      {!!snippet && !snippet.isEmpty() && snippet.get("saved") && (
        <Fragment>
          <Button>
            <Copy /> copy
          </Button>
          <Button>
            <Edit /> edit
          </Button>
          <Button
            onClick={() => {
              if (!!removeSnippet) {
                removeSnippet(snippet.get("id"));
              }
            }}
          >
            <Delete /> delete
          </Button>
          <Button>
            <Plus /> new
          </Button>
        </Fragment>
      )} */}
    </Footer>
  );
};
