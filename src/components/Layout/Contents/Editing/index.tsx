import React, { Fragment, useState, Dispatch, SetStateAction } from 'react';
import ReactTooltip from "react-tooltip";
import { Key } from 'ts-keycode-enum';

import { useShortcut } from '../../../../hooks';

import { Theme } from '../../../../types/theme';
import { Snippet } from '../../../../types/snippets';
import { Events } from '../../../../services/machines/snippet';

import { LANGUAGES } from '../../../../constants';

import Header from '../../../Elements/Header';
import Input from '../../../Elements/Input';
import Select from '../../../Elements/Select';
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

	useShortcut([
		{
			code: Key.Escape,
			shift: false,
			meta: false,
			callback: () => {
				send({ type: Events.SELECTED, id: 0 });
			}
		},
		{
			code: Key.S,
			shift: false,
			meta: true,
			callback: () => {
				send({ type: Events.SAVED, snippet: draft })
			}
		},
	])

	return (
		<Fragment>
			<ReactTooltip backgroundColor={theme.bg} multiline={false} />
			<Header theme={theme}>
				<Input 
					theme={theme} 
					type="text" 
					defaultValue={draft.get('name')} 
					onChange={(e) => handleUpdate('name', e.target.value)}
				/>
				<Select 
					options={LANGUAGES} 
					theme={theme}
					value={draft.get('lang')}
					onChange={(e) => handleUpdate('lang', e.target.value)} 
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
				<Button
					data-tip="⌘ + S" 
					onClick={() => send({ type: Events.SAVED, snippet: draft })}
				>
					<Save /> Save
				</Button>
			</Footer>
		</Fragment>
	)
};

export default Editing;