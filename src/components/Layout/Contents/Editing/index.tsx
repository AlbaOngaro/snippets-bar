import React, { Fragment, useState, Dispatch, SetStateAction } from 'react';

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

const Editing = ({ theme, snippet, send }: IEditingProps) => {
	const [draft, setDraft]: [Snippet, Dispatch<SetStateAction<Snippet>>] = useState(snippet);

	return (
		<Fragment>
			<Header theme={theme}>
				<Input theme={theme} type="text" value={draft.get('name')} />
			</Header>
			<Body theme={theme}>
				<TextArea 
					theme={theme} 
					defaultValue={draft.get('contents')} 
					onChange={(e) => {
						const updated: Snippet = draft.set('contents', e.target.value);
						setDraft(updated);
					}} 
				/>
			</Body>
			<Footer>
				<button onClick={() => send({ type: Events.SAVED, snippet: draft })}>save</button>
			</Footer>
		</Fragment>
	)
};

export default Editing;