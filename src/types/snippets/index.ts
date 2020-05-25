import { List, Map } from "immutable";
import { RxDocument } from "rxdb";

export interface Document extends RxDocument {
  id: string;
  name: string;
  content: string;
  editing: boolean;
  saved: boolean;
  lang: string,
}

export interface Snippet extends Map<any, any> {
  id: string;
  name: string;
  content: string;
  editing: boolean;
  saved: boolean;
  lang: string,
}

interface DraftMap extends Map<any, any> {
  id?: string;
  name?: string;
  content?: string;
  editing?: boolean;
  saved?: boolean;
  lang?: string;
}

export type Draft = DraftMap;

export interface SnippetsContextInterface {
  snippets?: List<Snippet>;
  filterSnippets(term: string): void;
}