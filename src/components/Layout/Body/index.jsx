import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../contexts';

import styles from './styles';

const Body = styled.div`
	${styles.Body}
`;

export default ({ children, ...props }) => {
	const theme = useContext(ThemeContext);

	return (
		<Body theme={theme} {...props}>
			{children}
		</Body>
	);
};