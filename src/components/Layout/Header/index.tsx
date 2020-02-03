import React, { useContext, ChangeEvent } from "react";
import styled from "styled-components";

import { ThemeContext } from '../../../contexts';

import Input from '../../Elements/Input';

import styles from "./styles";

const Header = styled.div`
  ${styles.Header}
`;

interface Props {
	onChange?: any,
	placeholder?: string,
}

export default ({ onChange, placeholder, ...rest }: Props) => {
	const theme = useContext(ThemeContext);

	return (
		<Header theme={theme} {...rest}>
			<Input 
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					if (!!onChange) {
						onChange(e.target.value);
					}
				}} 
				placeholder={placeholder || 'search'} 
			/>
		</Header>
	);
};
