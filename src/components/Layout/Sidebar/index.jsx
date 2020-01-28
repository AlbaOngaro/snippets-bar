import React, { useContext } from "react";
import styled from "styled-components";

import { SnippetsContext, ThemeContext } from "../../../contexts";

import Header from "../Header";

import styles from "./styles";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

export default props => {
	const { snippets, filterSnippets } = useContext(SnippetsContext);
	const { theme } = useContext(ThemeContext);

	return (
		<Sidebar theme={theme} {...props}>
			<Header search onChange={e => {
				filterSnippets(e.target.value);
			}}/>
			<ul>
				{snippets && 
					snippets.map(snippet => (
						<li>
							{snippet.get('name')}
						</li>
					))
				}
			</ul>
		</Sidebar>
	);
};
