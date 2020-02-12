import React, { ReactNode } from "react";
import styled from "styled-components";

import styles from "./styles";

const Column = styled.div`
  ${styles.Column}
`;

interface Props {
	children: ReactNode,
	width: number,
}

export default ({ children, width, ...rest }: Props) => <Column width={width} {...rest}>{children}</Column>;
