import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { Theme } from '../../../types/theme';

import styles from './styles';

const Input = styled.input`
	${styles.Input}
`;

interface IInputProps {
	theme: Theme,
	type?: string,
	placeholder?: string,
	defaultValue?: string,
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
}

export default ({ theme, type, defaultValue, onChange, placeholder }: IInputProps) => {
	return (
		<Input 
			theme={theme} 
			type={type}
			placeholder={placeholder}
			defaultValue={defaultValue} 
			onChange={onChange} 
		/>
	)
}