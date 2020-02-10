import React, { ReactNode } from "react";
import styled from "styled-components";
import { Theme } from "../../../types/theme";

import styles from "./styles";

const Body = styled.div`
  ${styles.Body}
`;

interface Props {
  children?: ReactNode;
  full?: boolean;
  theme: Theme,
}

export default ({ children, ...props }: Props) => {
	return (
		<Body {...props}>
			{children}
		</Body>
	);
};
