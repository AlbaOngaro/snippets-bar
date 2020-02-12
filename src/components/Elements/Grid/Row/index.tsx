import React, { ReactNode } from "react";
import styled from "styled-components";

import styles from "./styles";

const Row = styled.div`
  ${styles.Row}
`;

interface Props {
	children: ReactNode,
}

export default ({ children, ...rest }: Props) => <Row {...rest}>{children}</Row>;
