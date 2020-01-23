import React from "react";
import styled from "styled-components";

import styles from "./styles";

const Row = styled.div`
  ${styles.Row}
`;

export default ({ children, ...rest }) => <Row {...rest}>{children}</Row>;
