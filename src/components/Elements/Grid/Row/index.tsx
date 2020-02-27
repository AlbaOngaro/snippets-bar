import React, { ReactNode } from "react";
import styled from "styled-components";

import styles from "./styles";

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
}

export default ({ children, padding, }: IRowProps) => <Row padding={padding}>{children}</Row>;
