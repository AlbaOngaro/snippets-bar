import React from 'react';
import styled from 'styled-components';

import styles from './styles';

const Input = styled.input`
	${styles.Input}
`;

export default props => <Input {...props}></Input>