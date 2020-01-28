import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from '../../../contexts';

import Input from '../../Elements/Input';

import styles from "./styles";

const Header = styled.div`
  ${styles.Header}
`;

export default ({ search, onChange, ...rest }) => {
	const theme = useContext(ThemeContext);

	return (
		<Header theme={theme} {...rest}>
			{search && (
				<Input onChange={onChange} placeholder="search" />
			)}
		</Header>
	);
};
