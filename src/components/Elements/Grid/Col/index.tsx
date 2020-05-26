import React, { ReactNode } from "react";
import styled from "styled-components";

import styles from "./styles";
import { Theme } from "../../../../types/theme";

const Column = styled.div`
  ${styles.Column}
`;

interface Props {
	children: ReactNode,
	width: number,
	theme?: Theme,
}

export default ({ children, width, theme, ...rest }: Props) => <Column width={width} theme={theme} {...rest}>{children}</Column>;
