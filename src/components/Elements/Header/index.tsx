import React, { ReactNode } from "react";
import styled from "styled-components";

import { Theme } from '../../../types/theme';

import styles from "./styles";

const Header = styled.div`
  ${styles.Header}
`;

interface IHeaderProps {
	theme: Theme,
	children?: ReactNode,
	height?: number,
}

export default ({ children, theme, height }: IHeaderProps) => {
	return (
		<Header height={height} theme={theme}>
			{children}
		</Header>
	);
};
