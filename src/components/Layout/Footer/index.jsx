import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from '../../../contexts';

import Button from '../../Elements/Button';
import { Copy, Edit, Delete, Plus } from '../../../assets/svg';

import styles from "./styles";

const Footer = styled.div`
  ${styles.Footer}
`;

export default (props) => {
	// const close = () => {
	// 	const remote = require("electron").remote;
	// 	const w = remote.getCurrentWindow();
	// 	w.close();
	// };

	const theme = useContext(ThemeContext);

	return (
		<Footer theme={theme} {...props}>
			<Button>
				<Copy /> copy
			</Button>
			<Button>
				<Edit /> edit
			</Button>
			<Button>
				<Delete /> delete
			</Button>
			<Button> 
				<Plus/> new
			</Button>
		</Footer>
	);
};
