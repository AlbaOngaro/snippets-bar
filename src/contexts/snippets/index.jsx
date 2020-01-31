import React, { useState, useEffect, createContext } from "react";
import { List, Map, fromJS } from "immutable";
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
    db.snippets.find().$.subscribe(documents => {
      const snippets = fromJS(
        documents.reduce(
          (acc, curr) => [...acc, new Map(curr.toJSON())],
          []
        )
      );
      

      setSnippets(snippets);
    });
  };

  const addSnippetRequest = async snippet => {
    const db = await Database.get();
    await db.snippets.upsert(snippet);
  };

  const removeSnippetRequest = async id => {
    const db = await Database.get();
    await db.snippets
      .find()
      .where("id")
      .eq(id)
      .remove();
  };

  const filterSnippetsRequest = async term => {
    const db = await Database.get();
    const regexp = new RegExp(`.*${term}.*`, "gi");
    const snippets = await db.snippets
      .find({ name: { $regex: regexp } })
      .exec();

    setSnippets(new List(snippets));
  };

  const getSingleSnippetByIdRequest = async id => {
    const db = await Database.get();

    const snippet = await db.snippets
      .findOne()
      .where("id")
      .eq(id)
      .exec();

    setSnippet(!snippet ? new Map() : new Map(snippet.toJSON()));
  };

  const getDefaultSnippetRequest = async () => {
	const db = await Database.get();
    db.snippets.find().$.subscribe(documents => {
      const snippets = fromJS(
        documents.reduce(
          (acc, curr) => [...acc, new Map(curr.toJSON())],
          []
        )
      );
	  const snippet = snippets.first(new Map());

      setSnippet(snippet);
    });
  }

  useEffect(() => {
	getAllSnippetsRequest();
	getDefaultSnippetRequest();
  }, [setSnippets]);

  const addSnippet = snippet => {
    addSnippetRequest(snippet);
  };

  const removeSnippet = id => {
    removeSnippetRequest(id);
  };

  const filterSnippets = term => {
    filterSnippetsRequest(term);
  };

  const getDefaultSnippet = () => {
	getDefaultSnippetRequest();
  }

  const getSnippetById = id => {
    getSingleSnippetByIdRequest(id);
  };

  const updateSnippet = draft => {
	  const snippet =  new Map({
		  name: '',
		  contents: '',
		  editing: true,
		  saved: false,
	  }).merge(draft);

	  setSnippet(snippet);
  }

  const values = {
    snippets,
    addSnippet,
    removeSnippet,
    filterSnippets,
	snippet,
	getDefaultSnippet,
	getSnippetById,
	updateSnippet,
  };

  return (
    <SnippetsContext.Provider value={values}>
      {children}
    </SnippetsContext.Provider>
  );
};

export { SnippetsContext, SnippetsProvider };
