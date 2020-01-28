import React, { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { SnippetsProvider, SnippetsContext, ThemeProvider } from "../../contexts";

import { Col, Row } from "../Layout/Grid";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import Body from "../Layout/Body";
import Footer from "../Layout/Footer";

import styles from "./styles";

const GlobalStyle = createGlobalStyle`
	${styles.global}
`;

const Container = styled.div`
  ${styles.Container}
`;

function App() {
	const { snippet } = useContext(SnippetsContext);
	return (
		<SnippetsProvider>
			<ThemeProvider>
				<GlobalStyle />
				<Container>
					<Row>
					<Col width={35}>
						<Sidebar />
					</Col>
					<Col width={65}>
						{!snippet.isEmpty() && <Header />}
						<Body full={snippet.isEmpty()}/>
						<Footer />
					</Col>
					</Row>
				</Container>
		</ThemeProvider>
		</SnippetsProvider>
	);
}

export default App;
