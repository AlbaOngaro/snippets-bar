import React, { ReactNode } from "react";
import styled from "styled-components";

import styles from "./styles";
import { Theme } from "../../../../types/theme";

const Row = styled.div`
  ${styles.Row}
`;

interface IRowProps {
	children: ReactNode,
	padding?: {
		top?: number,
		right?: number,
		bottom?: number,
		left?: number,
	},
	theme?: Theme
}

export default ({ children, padding, theme }: IRowProps) => <Row theme={theme} padding={padding}>{children}</Row>;
