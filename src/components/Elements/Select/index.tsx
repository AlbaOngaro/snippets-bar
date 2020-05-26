import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import styles from './styles';
import { Theme } from '../../../types/theme';

const Select = styled.select`
	${styles.Select};
`;

interface IOption {
	value: string,
	label: string,
}

interface ISelectProps {
	theme: Theme,
	options: IOption[],
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
	value?: string,
}

export default ({ theme, options, onChange, value }: ISelectProps) => {
	return (
		<Select theme={theme} onChange={onChange} value={value}>
			{options.map(option => 
				<option 
					key={option.value} 
					value={option.value}
				>
					{option.label}
				</option>
			)}
		</Select>
	)
}