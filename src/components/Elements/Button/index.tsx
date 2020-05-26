import React, { useContext, ReactNode } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../contexts';

import styles from './styles';

const Button = styled.button`
	${styles.Button}
`;

interface Props {
	children: ReactNode,
	onClick?: any,
	center?: boolean
	disabled?: boolean,
}

export default ({ children, center, disabled = false, ...rest }: Props) => {
	const theme = useContext(ThemeContext);

	return <Button theme={theme} center={center} disabled={disabled} {...rest}>{children}</Button>
}