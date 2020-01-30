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
    db.snippets.find().$.subscribe(snippets => {
      setSnippets(new List(snippets));
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

  const getSingleSnippetRequest = async id => {
    const db = await Database.get();

    db.snippets
      .findOne()
      .where("id")
      .eq(id)
      .$.subscribe(snippet => setSnippet(new Map(snippet.toJSON())));
  };

  useEffect(() => {
    (async () => {
      const db = await Database.get();

      db.snippets.bulkInsert([
        {
          name: "Test",
          contents: "Test Contents"
        },
        {
          name: "Prod",
          contents: "Prod Contents"
        }
      ]);
    })();
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
  };

  const selectSnippet = id => {
    getSingleSnippetRequest(id);
  };

  const values = {
    snippets,
    addSnippet,
    removeSnippet,
    filterSnippets,
    snippet,
    selectSnippet
  };

  return (
    <SnippetsContext.Provider value={values}>
      {children}
    </SnippetsContext.Provider>
  );
};

export { SnippetsContext, SnippetsProvider };
