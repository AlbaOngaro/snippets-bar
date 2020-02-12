import React from 'react';

import { Theme } from '../../../../types/theme';
import { Snippet } from '../../../../types/snippets';

import { Events } from '../../../../services/machines/snippet';

import Body from '../../../Elements/Body';

interface IReadingProps {
	theme: Theme,
	snippet: Snippet,
	send: Function,
}

const Reading = ({ theme, snippet, send }: IReadingProps) => (
	<Body theme={theme} full>
		<p>Reading</p>
		<code>{snippet.get('contents')}</code>
		<button onClick={() => send({ type: Events.EDIT, snippet: snippet })}>edit</button>
	</Body>
);

export default Reading;