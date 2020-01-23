import React from 'react';
const remote = require('electron').remote

function App() {

	const handleClick = () => {
		const w = remote.getCurrentWindow()
		w.close()
	}

	return (
		<div>
			<div>
				<h2>Welcome to React/Electron</h2>
			</div>
			<p>
				Hello Electron!
			</p>
			<button onClick={handleClick}>close</button>
		</div>
	);
}

export default App;
