import React from 'react';
import styled from 'styled-components';

import { Theme } from '../../../types/theme';

import styles from './styles';

const Paragraph = styled.p`
	${styles.Paragraph};
`;

interface IParagraphProps {
	theme: Theme,
	alignment?: string,
	children: string
}

export default ({ theme, alignment = 'center', children }: IParagraphProps) => <Paragraph theme={theme} alignment={alignment}>{children}</Paragraph>;