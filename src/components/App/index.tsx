import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { SnippetsProvider, SnippetProvider, ThemeProvider } from "../../contexts";

import Layout from '../Layout';

import styles from "./styles";

const GlobalStyle = createGlobalStyle`
	${styles.global}
`;

const Container = styled.div`
  ${styles.Container}
`;

function App() {
	return (
		<SnippetsProvider>
			<SnippetProvider>
				<ThemeProvider>
					<GlobalStyle />
					<Container>
						<Layout />
					</Container>
				</ThemeProvider>
			</SnippetProvider>
		</SnippetsProvider>
	);
}

export default App;
