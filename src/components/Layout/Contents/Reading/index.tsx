import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { fromJS } from "immutable";
import { uniqueId } from "xstate/lib/utils";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as style } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactTooltip from "react-tooltip";
import { Key } from 'ts-keycode-enum';

import { useShortcut } from "../../../../hooks";

import { LANGUAGES } from "../../../../constants";

import { Theme } from "../../../../types/theme";
import { Snippet } from "../../../../types/snippets";

import { Events } from "../../../../services/machines/snippet";
import { Row, Col } from "../../../Elements/Grid";
import Body from "../../../Elements/Body";
import Modal from "../../../Elements/Modal";
import Paragraph from "../../../Elements/Paragraph";
import Footer from "../../../Elements/Footer";
import Button from "../../../Elements/Button";
import { Copy, Edit, Delete, New } from "../../../../assets/svg";

interface IReadingProps {
  theme: Theme;
  snippet: Snippet;
  send: Function;
}

const Lang = styled.small`
  position: absolute;
  bottom: 14px;
  right: 16px;
`;

const Reading = ({ theme, snippet, send }: IReadingProps) => {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { nativeTheme } = require("electron").remote;
  const [useDarkColors, setUseDarkColors] = useState(
    nativeTheme.shouldUseDarkColors
  );

  nativeTheme.on("updated", () => {
    setUseDarkColors(!useDarkColors);
  });

  useShortcut([
    {
      code: Key.C,
      shift: false,
      meta: true,
      callback: () => {
        navigator.clipboard
          .writeText(snippet.get("contents"))
          .then(() => setCopied(true));
      },
	},
	{
		code: Key.O,
		shift: false,
		meta: true,
		callback: () => {
			send({ type: Events.EDIT, snippet: snippet });
		},
	  },
    {
      code: Key.D,
      shift: false,
      meta: true,
      callback: () => {
        setDeleting(true);
      },
    },
    {
      code: Key.N,
      shift: false,
      meta: true,
      callback: () => {
        send({
          type: Events.CREATED,
          snippet: fromJS({ id: uniqueId(), lang: "bash" }),
        });
      },
    },
  ]);

  return (
    <Fragment>
      <ReactTooltip backgroundColor={theme.bg} multiline={false} />
      <Body theme={theme} full>
        <SyntaxHighlighter
          language={snippet.get("lang", "")}
		  style={style}
        >
			{snippet.get("contents", "")}
		</SyntaxHighlighter>
        {snippet.get("lang") && (
          <Lang>
            {LANGUAGES.find((lang) => lang.value === snippet.get("lang")).label}
          </Lang>
        )}
        {copied && (
          <Modal
            theme={theme}
            timeout={1000}
            onClosed={() => setCopied(false)}
            autoclose
          >
            <Paragraph theme={theme}>Succesfully copied</Paragraph>
          </Modal>
        )}
        {deleting && (
          <Modal theme={theme}>
            <Row padding={{ bottom: 10 }}>
              <Paragraph theme={theme}>
                Do you really want to delete this snippet?
              </Paragraph>
            </Row>
            <Row>
              <Col width={50}>
                <Button
                  center
                  onClick={() =>
                    send({ type: Events.DELETED, id: snippet.get("id") })
                  }
                >
                  Yes
                </Button>
              </Col>
              <Col width={50}>
                <Button center onClick={() => setDeleting(false)}>
                  No
                </Button>
              </Col>
            </Row>
          </Modal>
        )}
      </Body>
      <Footer theme={theme}>
        <Button
          data-tip="⌘ + C"
          onClick={() => {
            navigator.clipboard
              .writeText(snippet.get("contents"))
              .then(() => setCopied(true));
          }}
        >
          <Copy /> Copy
        </Button>
		<Button
			data-tip="⌘ + O"
			onClick={() => send({ type: Events.EDIT, snippet: snippet })}
		>
          <Edit /> Edit
        </Button>
        <Button data-tip="⌘ + D" onClick={() => setDeleting(true)}>
          <Delete /> Delete
        </Button>
        <Button
          data-tip="⌘ + N"
          onClick={() =>
            send({
              type: Events.CREATED,
              snippet: fromJS({ id: uniqueId(), lang: "bash" }),
            })
          }
        >
          <New /> New
        </Button>
      </Footer>
    </Fragment>
  );
};

export default Reading;
