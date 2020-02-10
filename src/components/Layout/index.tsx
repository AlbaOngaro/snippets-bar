import React, { useContext } from "react";
import { useMachine } from '@xstate/react';

import { ThemeContext, SnippetsContext } from '../../contexts';
import { SnippetMachine, Events } from '../../services/machines/snippet';

import { Col, Row } from "./Grid";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { fromJS } from "immutable";

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
				<Body theme={theme} full={!current.matches('editing')}>
					{current.matches('reading') && (
						<code>{current.context.snippet.get('contents')}</code>
					)}
					{current.matches('editing') && (
						<React.Fragment>
							<p>Editing</p>
							<button onClick={() => send({ type: Events.SAVED, snippet: current.context.snippet })}>save</button>
						</React.Fragment>
					)}
				</Body>
				<Footer />
			</Col>
		</Row>
  	);
};

export default Layout;
