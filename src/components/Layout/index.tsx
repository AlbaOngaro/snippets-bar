import React, { useContext } from "react";
import { useMachine } from '@xstate/react';

import { ThemeContext, SnippetsContext } from '../../contexts';
import { SnippetMachine, Events } from '../../services/machines/snippet';

import { Col, Row } from "../Elements/Grid";
import Sidebar from "../Elements/Sidebar";
import * as Contents from './Contents';


const Layout = () => {
	const theme = useContext(ThemeContext);
	const { snippets } = useContext(SnippetsContext);
	const [current, send] = useMachine(SnippetMachine);

  	return (
		<Row>
			<Col width={35}>
				<Sidebar theme={theme}>
					<ul>
						{snippets && snippets.map((snippet, idx) => (
							<li 
								key={snippet.get('id')}
								onClick={() => send({ type: Events.SELECTED, id: idx })}
							>
								{snippet.get('name')}
							</li>
						))}
					</ul>
				</Sidebar>
			</Col>
			<Col width={65}>
				{current.matches('reading') && (
					<Contents.Reading theme={theme} snippet={current.context.snippet} send={send} />
				)}
				{current.matches('editing') && (
					<Contents.Editing theme={theme} snippet={current.context.snippet} send={send} />
				)}
			</Col>
		</Row>
  	);
};

export default Layout;
