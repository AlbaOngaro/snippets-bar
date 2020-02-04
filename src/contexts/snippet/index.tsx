import React, { useEffect, createContext, ReactNode } from "react";
import { List, Map, fromJS } from "immutable";
import { useMachine } from "@xstate/react";

import { snippetMachine, Events } from "./machine";
import * as Database from "../../services/db";

import {
  Snippet,
  Document,
  SnippetContextInterface,
  Draft
} from "../../types/snippets";

const SnippetContext = createContext<Partial<SnippetContextInterface>>({});

interface Props {
  children: ReactNode;
}

const SnippetProvider = ({ children }: Props) => {
  const [current, send] = useMachine(snippetMachine);

  const getSingleSnippetByIdRequest = async (id: string) => {
    const db = await Database.get();

    const snippet: Snippet = await db.snippets
      .findOne()
      .where("id")
      .eq(id)
      .exec();

    send({ type: Events.LOADED, snippet });
  };

  const getDefaultSnippetRequest = async () => {
    const db = await Database.get();
    db.snippets.find().$.subscribe((documents: Document[]) => {
      const snippets: List<Snippet> = fromJS(
        documents.map((document: Document) => {
          return Map(document.toJSON());
        }) || List()
      );

      const snippet: Snippet | Draft = snippets.first(Map());

      send({ type: Events.LOADED, snippet });
    });
  };

  useEffect(() => {
    getDefaultSnippetRequest();
  });

  const getDefaultSnippet = (): void => {
    getDefaultSnippetRequest();
  };

  const getSnippetById = (id: string): void => {
    getSingleSnippetByIdRequest(id);
  };

  const editSnippet = (draft: Draft): void => {
    const snippet = Map({
      name: "",
      contents: "",
      editing: true,
      saved: false
    }).merge(Map.isMap(draft) ? draft : fromJS(draft));

    send({ type: Events.EDIT, snippet });
  };

  const values: SnippetContextInterface = {
    snippet: current.context.snippet,
    getDefaultSnippet,
    getSnippetById,
    editSnippet
  };

  return (
    <SnippetContext.Provider value={values}>{children}</SnippetContext.Provider>
  );
};

export { SnippetContext, SnippetProvider };
