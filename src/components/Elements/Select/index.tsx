import React from 'react';
import styled from 'styled-components';

import styles from './styles';


const Select = styled.select`
	${styles.Select};
`;

export default ({ theme, options, onChange }) => {
	return (
		<Select theme={theme} onChange={onChange}>
			{options.map(option => 
				<option key={option.value} value={option.value}>{option.label}</option>
			)}
		</Select>
	)
}