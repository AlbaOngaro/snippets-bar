export default {
	TextArea: ({ theme }) =>`
		background: transparent;
		border: none;
		color: ${theme.fg};
		font-size: 14px;
		width: 100%;
		height: 100%;
		resize: none;

		&:focus {
			outline: none;
		}
	`
};