import React, { useState, useEffect, createContext, ReactNode } from "react";
import { List, Map, fromJS } from "immutable";
import * as Database from "../../services/db";

import { Snippet, Document, SnippetContextInterface, DraftMap, DrafObj } from "../../types/snippets";

const SnippetContext = createContext<Partial<SnippetContextInterface>>({});

interface Props {
  children: ReactNode;
}

const SnippetProvider = ({ children }: Props) => {
  const [snippet, setSnippet] = useState(Map());

  const getSingleSnippetByIdRequest = async (id: string) => {
    const db = await Database.get();

    const snippet = await db.snippets
      .findOne()
      .where("id")
      .eq(id)
      .exec();

    setSnippet(!snippet ? Map() : Map(snippet.toJSON()));
  };

  const getDefaultSnippetRequest = async () => {
    const db = await Database.get();
    db.snippets.find().$.subscribe((documents: Document[]) => {
      const snippets: List<Snippet> = fromJS(
        documents.map((document: Document) => {
          return Map(document.toJSON());
        }) || List()
      );

      const snippet: Snippet | Map<any, any> = snippets.first(Map());

      setSnippet(snippet);
    });
  };

  useEffect(() => {
    getDefaultSnippetRequest();
  }, []);

  const getDefaultSnippet = (): void => {
    getDefaultSnippetRequest();
  };

  const getSnippetById = (id: string): void => {
    getSingleSnippetByIdRequest(id);
  };

  const updateSnippet = (draft: DraftMap | DrafObj): void => {
    const snippet = Map({
      name: "",
      contents: "",
      editing: true,
      saved: false
    }).merge(Map.isMap(draft) ? draft : fromJS(draft));

    setSnippet(snippet);
  };

  const values: SnippetContextInterface = {
    snippet,
    getDefaultSnippet,
    getSnippetById,
    updateSnippet
  };

  return (
    <SnippetContext.Provider value={values}>
      {children}
    </SnippetContext.Provider>
  );
};

export { SnippetContext, SnippetProvider };
