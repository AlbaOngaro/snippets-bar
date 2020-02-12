import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import styles from './styles';
import { Theme } from '../../../types/theme';

const TextArea = styled.textarea`
	${styles.TextArea};
`;

interface ITextAreaProps {
	theme: Theme,
	value?: string,
	onChange?: (e: ChangeEvent) => {},
};

export default ({ theme, value, onChange, ...rest }: ITextAreaProps) => {
	return <TextArea theme={theme} value={value} onChange={onChange} {...rest} />;
}