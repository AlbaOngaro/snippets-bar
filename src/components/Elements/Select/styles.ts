export default {
	Select: ({ theme }) => `
		-webkit-appearance: none;
		-moz-appearance: none;
		background: ${theme.bg};
		width: 200px;
		color: ${theme.fg};
		border: none;
		padding: 0 24px;
		
		&:focus {
			outline: none;
		}
	`
};