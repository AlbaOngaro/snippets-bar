import { transparentize, darken } from 'polished';

export default {
	List: ({ theme }) =>`
		list-style: none;
		margin: 0;
		padding: 0;
		overflow: scroll;
		height: calc(100% - 15%);
	`,
	Item: ({ theme, active }) =>`
		padding: 16px 32px;
		border-bottom: 1px solid ${transparentize(0.5, theme.fg)};
		background: ${active ? darken(0.02, theme.bg) : ''};

		&:hover {
			background: ${darken(0.02, theme.bg)};
			cursor: pointer;
		}
	`
}