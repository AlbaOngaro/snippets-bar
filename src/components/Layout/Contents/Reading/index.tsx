import React, { Fragment, useState } from 'react';

import { Theme } from '../../../../types/theme';
import { Snippet } from '../../../../types/snippets';

import { Events } from '../../../../services/machines/snippet';

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

const Reading = ({ theme, snippet, send }: IReadingProps) => {

	const [copied, setCopied] = useState(false);

	return (
		<Fragment>
			<Body theme={theme} full>
				<code>{snippet.get('contents')}</code>
				{copied && (
					<Modal 
						theme={theme} 
						timeout={1000} 
						onClosed={() => setCopied(false)}
					>
						<Paragraph theme={theme}>Succesfully copied</Paragraph>
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
				<Button 
					onClick={() => send({ type: Events.EDIT, snippet: snippet })}
				>
					<Edit /> Edit
				</Button>
				<Button>
					<Delete /> Delete
				</Button>
				<Button>
					<New /> New
				</Button>
			</Footer>
		</Fragment>
	);
};

export default Reading;