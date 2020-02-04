import React, { useContext } from "react";
import { fromJS } from "immutable";
import { SnippetContext } from "../../contexts";

import { Col, Row } from "./Grid";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { SnippetContextInterface } from "../../types/snippets";

const Layout = () => {
  const {
    snippet,
    updateSnippet
  }: Partial<SnippetContextInterface> = useContext(SnippetContext);

  return (
    <Row>
      <Col width={35}>
        <Sidebar />
      </Col>
      <Col width={65}>
        {!!snippet && !snippet.isEmpty() && (
          <Header
            placeholder="snippet name"
            onChange={(name: string) => {
              if (!!updateSnippet) {
                updateSnippet(
                  fromJS({
                    name
                  })
                );
              }
            }}
          />
        )}
        <Body full={!!snippet && snippet.isEmpty()} />
        <Footer />
      </Col>
    </Row>
  );
};

export default Layout;
