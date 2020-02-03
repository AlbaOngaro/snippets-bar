import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../contexts';

import styles from './styles';

const Input = styled.input`
	${styles.Input}
`;

interface Props {
	onChange?: any,
	placeholder: string,
}

export default ({ onChange, placeholder, ...rest }: Props) => {
	const theme = useContext(ThemeContext);
	return <Input onChange={onChange} placeholder={placeholder} theme={theme} {...rest}></Input>
}