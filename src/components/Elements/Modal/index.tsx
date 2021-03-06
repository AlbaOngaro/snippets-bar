import React, { useState, useEffect, ReactNode } from 'react';
import styled from 'styled-components';

import styles from './styles';

import { Theme } from '../../../types/theme';

const Container = styled.div`
	${styles.Container};
`;

interface IModalProps {
	children: ReactNode, 
	theme: Theme,
	timeout?: number,
	autoclose?: boolean,
	onClosed?: Function,
}

export default ({ children, theme, autoclose = false, timeout = 1000, onClosed }: IModalProps) => {
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		if (autoclose) {
			setTimeout(() => {
				setIsOpen(false);
	
				if (onClosed) {
					onClosed();
				}
			}, timeout);
		}
	}, [autoclose, timeout, setIsOpen, onClosed])

	return (
		<Container theme={theme} opened={isOpen}>
			{children}
		</Container>
	);
}