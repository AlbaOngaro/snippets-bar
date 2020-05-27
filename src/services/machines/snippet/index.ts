import { Machine, assign, interpret } from 'xstate';

import { Snippet, Draft } from '../../../types/snippets';
import { fromJS } from 'immutable';
import { getSnippetRequest, updateSnippetRequest, deleteSnippetRequest } from './requests';

export interface SnippetContextType {
	snippet: Snippet | Draft,
};

export interface SnippetStateSchema {
	states: {
		loading: {},
		saving: {},
		deleting: {},
		reading: {},
		editing: {},
		creating: {},
	}
};

export enum Events {
	SELECTED = 'SELECTED',
	EDIT = 'EDIT',
	SAVED = 'SAVED',
	DELETED = 'DELETED',
	CREATED = 'CREATED',
}

export type SnippetEvent = 
	{ type: Events.SELECTED, id: number } | 
	{ type: Events.EDIT, snippet: Snippet | Draft } | 
	{ type: Events.SAVED, snippet: Snippet } |
	{ type: Events.DELETED, id: string } |
	{ type: Events.CREATED, snippet: Draft };

const SnippetMachine = Machine<any, SnippetStateSchema, SnippetEvent>({
	id: 'snippet',
context: {
  snippet: fromJS({}),
},
	initial: 'loading',
	states: {
		loading: {
			invoke: {
				id: 'getSnippet',
				src: (_, { id }) => getSnippetRequest(id),
				onDone: {
					target: 'reading',
					actions: assign((_, { data }) => ({ snippet: data })),
				},
				onError: 'reading'
			}
		},
		saving: {
			invoke: {
				id: 'updateSnippet',
				src: (_, { snippet }) => updateSnippetRequest(snippet),
				onDone: {
					target: 'reading',
					actions: assign((_, { data }) => ({ snippet: data })),
				},
				onError: 'reading'
			}
		},
		deleting: {
			invoke: {
				id: 'deleteSnippet',
				src: (_, { id }) => deleteSnippetRequest(id),
				onDone: {
					target: 'loading',
				},
				onError: {
					target: 'loading',
				}
			}
		},
		reading: {
			on: {
				[Events.EDIT]: {
				  	target: 'editing',
				  	actions: assign((_, { snippet }) => ({
							snippet,
						}))
				},
				[Events.CREATED]: {
					target: 'creating',
					actions: assign((_, { snippet }) => ({
						snippet
					}))
				},
				[Events.SELECTED]: 'loading',
				[Events.DELETED]: 'deleting',
			}
		},
		editing: {
			on: {
				[Events.SAVED]: {
					target: 'saving',
					actions: assign((_, { snippet }) => ({
						snippet,
					}))
				},
				[Events.SELECTED]: 'loading',
			}
		},
		creating: {
			on: {
				[Events.SAVED]: {
					target: 'saving',
					actions: assign((_, { snippet }) => ({
						snippet,
					})) 
				},
				[Events.SELECTED]: 'loading',
			}
		}
	}
});

const SnippetService = interpret(SnippetMachine);

export {
	SnippetMachine,
	SnippetService
};