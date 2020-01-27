import React, { useContext } from "react";
import styled from "styled-components";

import { SnippetsContext } from "../../../contexts";

import Header from "../Header";

import styles from "./styles";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

export default props => {
	const { snippets, filterSnippets, removeSnippet } = useContext(SnippetsContext);

	return (
		<Sidebar {...props}>
			<Header search onChange={e => {
				filterSnippets(e.target.value);
			}}/>
				<ul>
					{snippets && 
						snippets.map(snippet => (
							<li>
								{snippet.get('name')}
								<button 
									onClick={() => {
										removeSnippet(snippet.get('id'))
									}}
								>
									delete snippet
								</button>
							</li>
						))
					}
				</ul>
			<button>add snippet</button>
		</Sidebar>
	);
};
