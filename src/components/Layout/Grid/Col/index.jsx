import React from "react";
import styled from "styled-components";

import styles from "./styles";

const Column = styled.div`
  ${styles.Column}
`;

export default ({ children, ...rest }) => <Column {...rest}>{children}</Column>;
