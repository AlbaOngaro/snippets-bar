import React, { Fragment, useState, Dispatch, SetStateAction } from 'react';

import { Theme } from '../../../../types/theme';
import { Snippet } from '../../../../types/snippets';
import { Events } from '../../../../services/machines/snippet';

import Header from '../../../Elements/Header';
import Input from '../../../Elements/Input';
import Body from '../../../Elements/Body';
import TextArea from '../../../Elements/TextArea';
import Footer from '../../../Elements/Footer';
import Button from '../../../Elements/Button';
import { Save } from '../../../../assets/svg';

interface IEditingProps {
	theme: Theme,
	snippet: Snippet,
	send: Function,
}

const Editing = ({ theme, snippet, send }: IEditingProps) => {
	const [draft, setDraft]: [Snippet, Dispatch<SetStateAction<Snippet>>] = useState(snippet);

	const handleUpdate = (key: string, val: string) => {
		const updated: Snippet = draft.set(key, val);
		setDraft(updated);
	}

	return (
		<Fragment>
			<Header theme={theme}>
				<Input 
					theme={theme} 
					type="text" 
					defaultValue={draft.get('name')} 
					onChange={(e) => handleUpdate('name', e.target.value)}
				/>
			</Header>
			<Body theme={theme}>
				<TextArea 
					theme={theme} 
					defaultValue={draft.get('contents')} 
					onChange={(e) => handleUpdate('contents' , e.target.value)} 
				/>
			</Body>
			<Footer theme={theme}>
				<Button onClick={() => send({ type: Events.SAVED, snippet: draft })}>
					<Save /> Save
				</Button>
			</Footer>
		</Fragment>
	)
};

export default Editing;