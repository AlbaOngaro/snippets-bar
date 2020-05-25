import React, { useContext } from "react";
import { useMachine } from '@xstate/react';
import styled from 'styled-components';

import { ThemeContext, SnippetsContext } from '../../contexts';
import { SnippetMachine, Events } from '../../services/machines/snippet';

import { Col, Row } from "../Elements/Grid";
import Header from '../Elements/Header';
import Sidebar from "../Elements/Sidebar";
import Input from '../Elements/Input';
import * as Contents from './Contents';


import styles from './styles';

const List = styled.ul`
	${styles.List}
`;

const Item = styled.li`
	${styles.Item}
`;

const Layout = () => {
	const theme = useContext(ThemeContext);
	const {snippets, filterSnippets } = useContext(SnippetsContext);
	const [current, send] = useMachine(SnippetMachine);

  	return (
		<Row>
			<Col width={35}>
				<Sidebar theme={theme}>
					<Header theme={theme}>
						<Input
							theme={theme}
							placeholder="search"
							clearable
							onChange={e => filterSnippets(e.target.value)} 
							onClear={() => filterSnippets('')}
						/>
					</Header>
					<List theme={theme}>
						{snippets && snippets.map((snippet, idx) => (
							<Item
								active={snippet.get('id') === current.context.snippet.get('id')}
								theme={theme} 
								key={snippet.get('id')}
								onClick={() => send({ type: Events.SELECTED, id: idx })}
							>
								{snippet.get('name')}
							</Item>
						))}
					</List>
				</Sidebar>
			</Col>
			<Col width={65}>
				{current.matches('reading') && (
					<Contents.Reading theme={theme} snippet={current.context.snippet} send={send} />
				)}
				{current.matches('editing') && (
					<Contents.Editing theme={theme} snippet={current.context.snippet} send={send} />
				)}
				{current.matches('creating') && (
					<Contents.Creating theme={theme} snippet={current.context.snippet} send={send} />
				)}
			</Col>
		</Row>
  	);
};

export default Layout;
