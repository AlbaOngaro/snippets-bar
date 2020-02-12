import { Machine, assign, interpret } from 'xstate';

import { Snippet, Draft } from '../../../types/snippets';
import { fromJS } from 'immutable';
import { getDefaultSnippetRequest, updateSnippet } from './requests';

export interface SnippetContextType {
	snippet: Snippet | Draft,
	editing: boolean,
};

export interface SnippetStateSchema {
	states: {
		loading: {},
		saving: {},
		reading: {},
		editing: {},
	}
};

export enum Events {
	SELECTED = 'SELECTED',
	EDIT = 'EDIT',
	SAVED = 'SAVED',
}

export type SnippetEvent = 
	{ type: Events.SELECTED, id: number } | 
	{ type: Events.EDIT, snippet: Snippet | Draft } | 
	{ type: Events.SAVED, snippet: Snippet }; 

const SnippetMachine = Machine<any, SnippetStateSchema, SnippetEvent>({
	id: 'snippet',
	context: {
		snippet: fromJS({}),
		editing: false,
	},
	initial: 'loading',
	states: {
		loading: {
			invoke: {
				id: 'getSnippet',
				src: (_, { id }) => getDefaultSnippetRequest(id),
				onDone: {
					target: 'reading',
					actions: assign((_, { data }) => ({ snippet: data })),
				},
				onError: {
					target: 'reading',
					actions: assign(() => ({
						snippet: fromJS({}),
					})),
				}
			}
		},
		saving: {
			invoke: {
				id: 'updateSnippet',
				src: (_, { snippet }) => updateSnippet(snippet),
				onDone: {
					target: 'reading',
					actions: assign((_, { data }) => ({ snippet: data })),
				},
				onError: {
					target: 'reading',
					actions: assign((_, { data }) => {
						debugger;
						return {
							snippet: fromJS({}),
						};
					}),
				}
			}
		},
		reading: {
			on: {
				[Events.EDIT]: {
				  	target: 'editing',
				  	actions: assign((_, { snippet }) => ({
						snippet,
						editing: true,
					}))
				},
				[Events.SELECTED]: 'loading',
			}
		},
		editing: {
			on: {
				[Events.SAVED]: {
					target: 'saving',
					actions: assign((_, { snippet }) => ({
						snippet,
						editing: false,
					}))
				}
			}
		}
	}
});

const SnippetService = interpret(SnippetMachine);

export {
	SnippetMachine,
	SnippetService
};