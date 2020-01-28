import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../contexts';

import styles from './styles';

const Button = styled.button`
	${styles.Button}
`;

export default ({ children, ...rest }) => {
	const theme = useContext(ThemeContext);

	return <Button theme={theme} {...rest}>{children}</Button>
}