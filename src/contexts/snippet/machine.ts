import { Machine, assign } from 'xstate';

import { Snippet, Draft } from '../../types/snippets';
import { fromJS, Map } from 'immutable';

export interface SnippetContextType {
	snippet: Snippet | Draft,
	editing: boolean,
};

export interface SnippetStateSchema {
	states: {
		loading: {},
		reading: {},
		editing: {},
	}
};

export enum Events {
	EDIT = 'EDIT',
	LOADED = 'LOADED',
	SAVED = 'SAVED',
}

export type SnippetEvent = 
	{ type: Events.EDIT, snippet: Snippet | Draft } | 
	{ type: Events.LOADED, snippet: Snippet | Draft } | 
	{ type: Events.SAVED, snippet: Snippet }; 

const snippetMachine = Machine<SnippetContextType, SnippetStateSchema, SnippetEvent>({
	id: 'snippet',
	context: {
		snippet: fromJS({}),
		editing: false,
	},
	initial: 'loading',
	states: {
		loading: {
			on: {
				LOADED: {
					target: 'reading',
					actions: assign({
						snippet: (ctx, { snippet }): Snippet | Draft => {
							return Map.isMap(snippet) ? snippet : fromJS(snippet);
						}
					})
				}
			}
		},
		reading: {
			on: {
				EDIT: {
				  target: 'editing',
				  actions: assign((ctx, { snippet }) => ({
					  snippet,
					  editing: true,
				  }))
				}
			}
		},
		editing: {
			on: {
				SAVED: {
					target: 'reading',
					actions: assign((ctx, { snippet }) => ({
						snippet,
						editing: false,
					}))
				}
			}
		}
	}
});

export {
	snippetMachine
};