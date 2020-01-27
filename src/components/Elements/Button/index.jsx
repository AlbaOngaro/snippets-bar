import React from 'react';
import styled from 'styled-components';

import styles from './styles';

const Button = styled.button`
	${styles.Button}
`;

export default ({ label, ...rest }) => <Button {...rest}>{label}</Button>