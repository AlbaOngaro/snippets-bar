import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { SnippetsProvider, ThemeProvider } from "../../contexts";

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
			<ThemeProvider>
				<GlobalStyle />
				<Container>
					<Layout />
				</Container>
			</ThemeProvider>
		</SnippetsProvider>
	);
}

export default App;
