import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../../../contexts';

import styles from './styles';

const Input = styled.input`
	${styles.Input}
`;

export default props => {
	const theme = useContext(ThemeContext);
	return <Input theme={theme} {...props}></Input>
}