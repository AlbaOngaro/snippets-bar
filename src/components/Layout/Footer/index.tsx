import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { Map } from 'immutable';

import { ThemeContext, SnippetContext, SnippetsContext } from "../../../contexts";

import Button from "../../Elements/Button";
import { Copy, Edit, Delete, Plus, Save } from "../../../assets/svg";

import styles from "./styles";

const Footer = styled.div`
  ${styles.Footer}
`;

interface Props {};

export default (props: Props) => {
	const theme = useContext(ThemeContext);
	const { snippet, getDefaultSnippet, updateSnippet } = useContext(SnippetContext);
	const { removeSnippet } = useContext(SnippetsContext);
  
	return (
		<Footer theme={theme} {...props}>
			{!!snippet && snippet.isEmpty() && !snippet.get('editing') && (
				<Button onClick={() => {
					if (!!updateSnippet) {
						updateSnippet(Map({ name: '', contents: '' }));
					}
				}}>
				<Plus /> new
				</Button>
			)}

			{!!snippet && !snippet.isEmpty() && snippet.get('editing') && (
				<Fragment>
					<Button>
						<Save /> save
					</Button>
					<Button onClick={getDefaultSnippet}>
						<Delete/> delete
					</Button>
				</Fragment>
			)}

			{!!snippet && !snippet.isEmpty() && snippet.get('saved') && (
				<Fragment>
				<Button>
					<Copy /> copy
				</Button>
				<Button>
					<Edit /> edit
				</Button>
				<Button onClick={() => {
					if (!!removeSnippet) {
						removeSnippet(snippet.get("id"));
					}
				}}>
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
