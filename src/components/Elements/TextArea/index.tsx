import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import styles from './styles';
import { Theme } from '../../../types/theme';

const TextArea = styled.textarea`
	${styles.TextArea};
`;

interface ITextAreaProps {
	theme: Theme,
	defaultValue?: string,
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
};

export default ({ theme, defaultValue, onChange, ...rest }: ITextAreaProps) => {
	return <TextArea theme={theme} defaultValue={defaultValue} onChange={onChange} {...rest} />;
}