import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from '../../../contexts';

import Input from '../../Elements/Input';

import styles from "./styles";

const Header = styled.div`
  ${styles.Header}
`;

export default ({ search, onSearch, onChange, placeholder, ...rest }) => {
	const theme = useContext(ThemeContext);

	return (
		<Header theme={theme} {...rest}>
			<Input 
				onChange={(e) => {
					if (search) {
						onSearch(e.target.value);
					} else {
						onChange(e.target.value);
					}
				}} 
				placeholder={search ? "search" : placeholder} 
			/>
		</Header>
	);
};
