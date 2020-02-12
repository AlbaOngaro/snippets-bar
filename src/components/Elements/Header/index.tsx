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
}

export default ({ children, theme }: IHeaderProps) => {
	return (
		<Header theme={theme}>
			{children}
		</Header>
	);
};
