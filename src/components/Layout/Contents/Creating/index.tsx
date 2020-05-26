import React, { Fragment, useState, Dispatch, SetStateAction } from "react";

import { Theme } from "../../../../types/theme";
import { Draft } from "../../../../types/snippets";
import { Events } from "../../../../services/machines/snippet";

import { LANGUAGES } from "../../../../constants";

import Header from "../../../Elements/Header";
import Input from "../../../Elements/Input";
import Select from "../../../Elements/Select";
import Body from "../../../Elements/Body";
import TextArea from "../../../Elements/TextArea";
import Footer from "../../../Elements/Footer";
import Button from "../../../Elements/Button";
import { Save } from "../../../../assets/svg";

interface ICreatingProps {
  theme: Theme;
  snippet: Draft;
  send: Function;
}

const Creating = ({ theme, snippet, send }: ICreatingProps) => {
  const [draft, setDraft]: [Draft, Dispatch<SetStateAction<Draft>>] = useState(
    snippet
  );

  const handleUpdate = (key: string[], val: string) => {
    const updated: Draft = draft.setIn(key, val);
    setDraft(updated);
  };

  return (
    <Fragment>
      <Header theme={theme}>
        <Input
          theme={theme}
          type="text"
          placeholder="snippet name"
          defaultValue={draft.get("name")}
          onChange={(e) => handleUpdate(["name"], e.target.value)}
        />
        <Select
          options={LANGUAGES}
		  theme={theme}
          onChange={(e) => handleUpdate(["lang"], e.target.value)}
        />
      </Header>
      <Body theme={theme}>
        <TextArea
          theme={theme}
          defaultValue={draft.get("contents")}
          onChange={(e) => handleUpdate(["contents"], e.target.value)}
        />
      </Body>
      <Footer theme={theme}>
		<Button 
			disabled={!draft.get('contents') || !draft.get('name')} 
			onClick={() => send({ type: Events.SAVED, snippet: draft })}
		>
          <Save /> Save
        </Button>
      </Footer>
    </Fragment>
  );
};

export default Creating;
