import React from 'react';
import styled from 'styled-components';

import { Theme } from '../../../types/theme';

import styles from './styles';

const Input = styled.input`
	${styles.Input}
`;

interface IInputProps {
	theme: Theme,
	type?: string,
	value?: string,
}

export default ({ theme, ...rest }: IInputProps) => {
	return <Input theme={theme} {...rest}></Input>
}