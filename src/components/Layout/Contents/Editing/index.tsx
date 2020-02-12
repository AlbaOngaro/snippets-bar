import React, { Fragment } from 'react';

import { Theme } from '../../../../types/theme';
import { Snippet } from '../../../../types/snippets';
import { Events } from '../../../../services/machines/snippet';

import Header from '../../../Elements/Header';
import Input from '../../../Elements/Input';
import Body from '../../../Elements/Body';
import TextArea from '../../../Elements/TextArea';
import Footer from '../../../Elements/Footer';

interface IEditingProps {
	theme: Theme,
	snippet: Snippet,
	send: Function,
}

const Editing = ({ theme, snippet, send }: IEditingProps) => (
	<Fragment>
		<Header theme={theme}>
			<Input theme={theme} type="text" value={snippet.get('name')} />
		</Header>
		<Body theme={theme}>
			<TextArea theme={theme} value={snippet.get('contents')} />
		</Body>
		<Footer>
			<button onClick={() => send({ type: Events.SAVED, snippet: snippet })}>save</button>
		</Footer>
	</Fragment>
);

export default Editing;