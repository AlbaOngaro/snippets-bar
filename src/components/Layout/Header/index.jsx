import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from '../../../contexts';

import Input from '../../Elements/Input';

import styles from "./styles";

const Header = styled.div`
  ${styles.Header}
`;

export default ({ onChange, placeholder, ...rest }) => {
	const theme = useContext(ThemeContext);

	return (
		<Header theme={theme} {...rest}>
			<Input 
				onChange={e => onChange(e.target.value)} 
				placeholder={placeholder || 'search'} 
			/>
		</Header>
	);
};
