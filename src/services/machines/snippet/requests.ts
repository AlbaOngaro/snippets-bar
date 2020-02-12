import { Map, List, fromJS } from 'immutable';
import { Snippet, Document, Draft } from '../../../types/snippets';

import * as Database from "../../db";

const getDefaultSnippetRequest = async (id?: number): Promise<Snippet | Draft> => {
	const db = await Database.get();
	const documents: Document[] = await db.snippets.find().exec();

	const snippets: List<Snippet> = fromJS(
        documents.map((document: Document) => {
          return Map(document.toJSON());
        }) || fromJS([])
      );

	const snippet: Snippet | Draft = snippets.get(id || 0, Map());

	return snippet;
};

const updateSnippet = async (snippet: Snippet): Promise<Snippet> => {
	const db = await Database.get();
	const newSnippet: Document = await db.snippets.upsert(snippet.toJS());
	return fromJS(newSnippet.toJSON());
}

export {
	getDefaultSnippetRequest,
	updateSnippet
}