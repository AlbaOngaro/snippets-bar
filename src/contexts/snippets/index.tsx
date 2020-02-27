import React, { useState, useEffect, createContext, ReactNode } from "react";
import { List, Map, fromJS } from "immutable";
import * as Database from "../../services/db";

import { Snippet, Document, SnippetsContextInterface } from "../../types/snippets";

const SnippetsContext = createContext<Partial<SnippetsContextInterface>>({});

interface Props {
  children: ReactNode;
}

const SnippetsProvider = ({ children }: Props) => {
  const [snippets, setSnippets] = useState(List());

  const getAllSnippetsRequest = async () => {
	const db = await Database.get();
	
    db.snippets.find().$.subscribe((documents: Document[]) => {
      const snippets: List<Snippet> = fromJS(
        documents.map((document: Document) => {
          return Map(document.toJSON());
        })
	  );
      setSnippets(snippets);
    });
  };

  const filterSnippetsRequest = async (term: string) => {
    const db = await Database.get();
    const regexp = new RegExp(`.*${term}.*`, "gi");
    const snippets = await db.snippets
      .find({ name: { $regex: regexp } })
      .exec();

    setSnippets(List(snippets));
  };

  useEffect(() => {
    getAllSnippetsRequest();
  }, []);

  const filterSnippets = (term: string): void => {
    filterSnippetsRequest(term);
  };

  const values: SnippetsContextInterface = {
    snippets,
    filterSnippets
  };

  return (
    <SnippetsContext.Provider value={values}>
      {children}
    </SnippetsContext.Provider>
  );
};

export { SnippetsContext, SnippetsProvider };
