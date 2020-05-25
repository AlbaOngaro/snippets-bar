import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { fromJS } from 'immutable';
import { uniqueId } from 'xstate/lib/utils';
import { CodeBlock, atomOneDark, atomOneLight } from 'react-code-blocks'

import { LANGUAGES } from '../../../../constants';

import { Theme } from '../../../../types/theme';
import { Snippet } from '../../../../types/snippets';

import { Events } from '../../../../services/machines/snippet';
import { Row, Col } from '../../../Elements/Grid';
import Body from '../../../Elements/Body';
import Modal from '../../../Elements/Modal';
import Paragraph from '../../../Elements/Paragraph';
import Footer from '../../../Elements/Footer';
import Button from '../../../Elements/Button';
import { Copy, Edit, Delete, New } from '../../../../assets/svg';

interface IReadingProps {
	theme: Theme,
	snippet: Snippet,
	send: Function,
}

const Lang = styled.small`
	position: absolute;
	bottom: 14px;
	right: 16px;
`;

const Reading = ({ theme, snippet, send }: IReadingProps) => {

	const [copied, setCopied] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const { nativeTheme } = require("electron").remote;
	const [useDarkColors, setUseDarkColors] = useState(nativeTheme.shouldUseDarkColors);

	nativeTheme.on("updated", () => {
		setUseDarkColors(!useDarkColors);
	});

	return (
		<Fragment>
			<Body theme={theme} full>
				<CodeBlock
					text={snippet.get('contents', '')}
					language={snippet.get('lang', '')}
					theme={Object.assign(useDarkColors ? atomOneDark : atomOneLight, { backgroundColor: 'transparent' })}
					showLineNumbers={false}
					wrapLines
				/>
				<Lang>{LANGUAGES.find(lang => lang.value === snippet.get('lang')).label}</Lang>
				{copied && (
					<Modal 
						theme={theme} 
						timeout={1000} 
						onClosed={() => setCopied(false)}
						autoclose
					>
						<Paragraph theme={theme}>Succesfully copied</Paragraph>
					</Modal>
				)}
				{deleting && (
					<Modal theme={theme}>
						<Row padding={{ bottom: 10 }}>
							<Paragraph theme={theme}>Do you really want to delete this snippet?</Paragraph>
						</Row>
						<Row>
							<Col width={50}>
								<Button
									center 
									onClick={() => send({ type: Events.DELETED, id: snippet.get('id')})}
								>
									Yes
								</Button>
							</Col>
							<Col width={50}>
								<Button 
									center 
									onClick={() => setDeleting(false)}
								>
									No
								</Button>
							</Col>
						</Row>
					</Modal>
				)}
			</Body>
			<Footer theme={theme}>
				<Button 
					onClick={() => {
						navigator.clipboard
							.writeText(snippet.get('contents'))
							.then(() => setCopied(true));
					}}
				>
					<Copy /> Copy
				</Button>
				<Button onClick={() => send({ type: Events.EDIT, snippet: snippet })}>
					<Edit /> Edit
				</Button>
				<Button onClick={() => setDeleting(true)}>
					<Delete /> Delete
				</Button>
				<Button onClick={() => send({ type: Events.CREATED, snippet: fromJS({ id: uniqueId() }) })}>
					<New /> New
				</Button>
			</Footer>
		</Fragment>
	);
};

export default Reading;