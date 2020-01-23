import React from "react";
import styled from "styled-components";

import Header from '../Header';

import styles from "./styles";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

export default (props) => (
	<Sidebar {...props}>
		<Header />
	</Sidebar>
);
