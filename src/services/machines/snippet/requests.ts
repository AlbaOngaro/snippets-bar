import { Map, List, fromJS } from 'immutable';
import { Snippet, Document, Draft } from '../../../types/snippets';

import * as Database from "../../db";

const getSnippetRequest = async (id?: number): Promise<Snippet | Draft> => {
	const db = await Database.get();
	const documents: Document[] = await db.snippets.find().exec();

	const snippets: List<Snippet> = fromJS(
		documents
			.filter((document: Document) => !document.deleted)
			.map((document: Document) => {
				return Map(document.toJSON());
			}) || fromJS([])
      );

	const snippet: Snippet | Draft = snippets.get(id || 0, Map());

	return snippet;
};

const updateSnippetRequest = async (snippet: Snippet): Promise<Snippet> => {
	const db = await Database.get();
	const newSnippet: Document = await db.snippets.upsert(snippet.toJS());
	return fromJS(newSnippet.toJSON());
}

const deleteSnippetRequest = async (id: string): Promise<Snippet> => {
	const db = await Database.get();
	const document = await db.snippets.find({ id: { $eq: id } }).remove();

	return document;
}

export {
	getSnippetRequest,
	updateSnippetRequest,
	deleteSnippetRequest
}