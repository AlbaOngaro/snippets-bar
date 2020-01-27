import React, { useState, useEffect, createContext } from "react";
import { List } from "immutable";
import * as Database from "../../services/db";

const SnippetsContext = createContext({
  snippets: new List(),
  addSnippet: () => {},
  removeSnippet: () => {}
});

const SnippetsProvider = ({ children }) => {
  const [snippets, setSnippets] = useState(new List());

  useEffect(() => {
    const getDb = async () => {
      const db = await Database.get();
      const snippets = await db.snippets.find().exec();

      setSnippets(snippets || new List());
    };

    getDb();
  }, [setSnippets]);

  const addSnippet = snippet => {
    setSnippets(snippets.push(snippet));
  };

  const removeSnippet = snippet => {
    setSnippets(snippets.splice(snippets.indexOf(snippet), 1));
  };

  const values = {
    snippets,
    addSnippet,
    removeSnippet
  };

  return (
    <SnippetsContext.Provider value={values}>
      {children}
    </SnippetsContext.Provider>
  );
};

export { SnippetsContext, SnippetsProvider };
