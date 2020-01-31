import React, { useContext } from 'react';
import { SnippetsContext } from '../../contexts';

import { Col, Row } from "./Grid";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const Layout = () => {
	const { snippet } = useContext(SnippetsContext);

	return (
		<Row>
			<Col width={35}>
				<Sidebar />
			</Col>
			<Col width={65}>
				{!snippet.isEmpty() && <Header />}
				<Body full={snippet.isEmpty()}/>
				<Footer />
			</Col>
		</Row>
	)
}

export default Layout;