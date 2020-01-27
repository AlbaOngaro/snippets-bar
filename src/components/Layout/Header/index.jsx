import React from "react";
import styled from "styled-components";

import Input from '../../Elements/Input';

import styles from "./styles";

const Header = styled.div`
  ${styles.Header}
`;

export default ({ search, onChange, ...rest }) => {
	return (
		<Header {...rest}>
			{search && (
				<Input onChange={onChange} />
			)}
		</Header>
	);
};
