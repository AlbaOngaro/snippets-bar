import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { SnippetsProvider } from "../../contexts";

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
  return (
    <SnippetsProvider>
      <GlobalStyle />
      <Container>
        <Row>
          <Col width={35}>
            <Sidebar />
          </Col>
          <Col width={65}>
            <Header />
            <Body />
            <Footer />
          </Col>
        </Row>
      </Container>
    </SnippetsProvider>
  );
}

export default App;
