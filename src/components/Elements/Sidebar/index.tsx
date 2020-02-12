import React, { ReactNode } from "react";
import styled from "styled-components";

import styles from "./styles";
import { Theme } from "../../../types/theme";

const Sidebar = styled.div`
  ${styles.Sidebar}
`;

interface Props {
	children?: ReactNode,
	theme: Theme
};

export default ({ children, ...rest }: Props) => {
	return (
		<Sidebar {...rest}>
			{children}
		</Sidebar>
	);
};
