import { List, Map } from "immutable";
import { RxDocument } from "rxdb";

export interface Document extends RxDocument {
  id: string;
  name: string;
  content: string;
  editing: boolean;
  saved: boolean;
  tags: [string];
}

export interface Snippet extends Map<any, any> {
  id: string;
  name: string;
  content: string;
  editing: boolean;
  saved: boolean;
  tags: [string];
}

interface DraftMap extends Map<any, any> {
  id?: string;
  name?: string;
  content?: string;
  editing?: boolean;
  saved?: boolean;
  tags?: [string];
}

export type Draft = DraftMap;

export interface SnippetsContextInterface {
  snippets?: List<Snippet>;
  addSnippet(snippet: Snippet): void;
  removeSnippet(id: string): void;
  filterSnippets(term: string): void;
}

export interface SnippetContextInterface {
	snippet?: Snippet | Draft;
	getDefaultSnippet(): void;
	getSnippetById(id: string): void;
	editSnippet(draft: Draft): void;
}