import React from "react";
import styled from "styled-components";

import Button from '../../Elements/Button';

import styles from "./styles";

const Footer = styled.div`
  ${styles.Footer}
`;

export default (props) => {
	const close = () => {
		const remote = require("electron").remote;
		const w = remote.getCurrentWindow();
		w.close();
	};

	return (
		<Footer {...props}>
			<Button label="close" onClick={close}></Button>
		</Footer>
	);
};
