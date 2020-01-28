import React, { useState, useEffect, createContext } from "react";
import { List, Map } from "immutable";
import * as Database from "../../services/db";

const SnippetsContext = createContext({
  snippets: new List(),
  snippet: new Map(),
  addSnippet: () => {},
  removeSnippet: () => {},
  filterSnippets: () => {}
});

const SnippetsProvider = ({ children }) => {
  const [snippets, setSnippets] = useState(new List());
  const [snippet, setSnippet] = useState(new Map());

  const getAllSnippetsRequest = async () => {
	const db = await Database.get();
	const snippets = await db.snippets.find().exec();

	setSnippets(snippets || new List());
  };

  const addSnippetRequest = async snippet => {
	const db = await Database.get();
	await db.snippets.upsert(snippet);
	
	getAllSnippetsRequest();
  }

  const removeSnippetRequest = async id => {
	const db = await Database.get();
	await db.snippets.find().where('id').eq(id).remove();

	getAllSnippetsRequest();
  }

  const filterSnippetsRequest = async term => {
	const db = await Database.get();
	const regexp = new RegExp(`.*${term}.*`, 'gi');
	const snippets = await db.snippets.find({ name: { $regex: regexp }}).exec();

	setSnippets(snippets || new List());
  }

  const getSingleSnippetRequest = async id => {
	const db = await Database.get();
	const snippet = await db.snippets.find().where('id').eq(id);
	setSnippet(snippet);
  }

  useEffect(() => {
    getAllSnippetsRequest();
  }, [setSnippets]);

  const addSnippet = snippet => {
    addSnippetRequest(snippet);
  };

  const removeSnippet = id => {
    removeSnippetRequest(id);
  };

  const filterSnippets = term => {
	filterSnippetsRequest(term);
  }

  const selectSnippet = id => {
	getSingleSnippetRequest(id);
  }

  const values = {
    snippets,
    addSnippet,
	removeSnippet,
	filterSnippets,
	snippet,
	selectSnippet,
  };

  return (
    <SnippetsContext.Provider value={values}>
      {children}
    </SnippetsContext.Provider>
  );
};

export { SnippetsContext, SnippetsProvider };
