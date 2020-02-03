import React, { useState, useEffect, createContext, ReactNode } from "react";
import { List, Map, fromJS } from "immutable";
import * as Database from "../../services/db";

import { Snippet, Document, SnippetsContextInterface, Draft } from "./types";

const SnippetsContext = createContext<Partial<SnippetsContextInterface>>({});

interface Props {
  children: ReactNode;
}

const SnippetsProvider = ({ children }: Props) => {
  const [snippets, setSnippets] = useState(List());
  const [snippet, setSnippet] = useState(Map());

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

  const addSnippetRequest = async (snippet: Snippet) => {
    const db = await Database.get();
    await db.snippets.upsert(snippet);
  };

  const removeSnippetRequest = async (id: string) => {
    const db = await Database.get();
    await db.snippets
      .find()
      .where("id")
      .eq(id)
      .remove();
  };

  const filterSnippetsRequest = async (term: string) => {
    const db = await Database.get();
    const regexp = new RegExp(`.*${term}.*`, "gi");
    const snippets = await db.snippets
      .find({ name: { $regex: regexp } })
      .exec();

    setSnippets(List(snippets));
  };

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
    getAllSnippetsRequest();
    getDefaultSnippetRequest();
  }, [setSnippets]);

  const addSnippet = (snippet: Snippet): void => {
    addSnippetRequest(snippet);
  };

  const removeSnippet = (id: string): void => {
    removeSnippetRequest(id);
  };

  const filterSnippets = (term: string): void => {
    filterSnippetsRequest(term);
  };

  const getDefaultSnippet = (): void => {
    getDefaultSnippetRequest();
  };

  const getSnippetById = (id: string): void => {
    getSingleSnippetByIdRequest(id);
  };

  const updateSnippet = (draft: Draft): void => {
    const snippet = Map({
      name: "",
      contents: "",
      editing: true,
      saved: false
    }).merge(Map.isMap(draft) ? draft : fromJS(draft));

    setSnippet(snippet);
  };

  const values: SnippetsContextInterface = {
    snippets,
    addSnippet,
    removeSnippet,
    filterSnippets,
    snippet,
    getDefaultSnippet,
    getSnippetById,
    updateSnippet
  };

  return (
    <SnippetsContext.Provider value={values}>
      {children}
    </SnippetsContext.Provider>
  );
};

export { SnippetsContext, SnippetsProvider };
