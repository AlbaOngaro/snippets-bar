import React, { useState, useEffect, createContext } from "react";
import { fromJS } from "immutable";

const SnippetsContext = createContext({
  snippets: [],
  addSnippet: () => {},
  removeSnippet: () => {}
});

const SnippetsProvider = ({ children }) => {
  const [snippets, setSnippets] = useState(fromJS([]));

  useEffect(() => {
    setTimeout(() => {
      setSnippets(fromJS(["test", "test"]));
    }, 1000);
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
