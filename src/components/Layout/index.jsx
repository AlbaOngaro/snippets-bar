import React, { useContext } from 'react';
import { SnippetsContext } from '../../contexts';

import { Col, Row } from "./Grid";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const Layout = () => {
	const { snippet, updateSnippet } = useContext(SnippetsContext);

	return (
		<Row>
			<Col width={35}>
				<Sidebar />
			</Col>
			<Col width={65}>
				{!snippet.isEmpty() && (
					<Header 
						placeholder="snippet name" 
						onChange={name => updateSnippet({
							name,
						})}
					/>
				)}
				<Body full={snippet.isEmpty()}/>
				<Footer />
			</Col>
		</Row>
	)
}

export default Layout;