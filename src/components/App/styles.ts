export default {
  global: `
  	@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
	
	* {
		font-family: 'Raleway', sans-serif;
		box-sizing: border-box;
	}

	html,
	body {
		padding: 0;
		margin: 0;
	}

	#root {
		height: 100%;
	}
  `,
  Container: `
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
`
};
