import { darken } from 'polished';

export default {
  Header: ({ theme }) =>`
	height: 15%;
	background: ${darken(0.02, theme.bg)};
	color: ${theme.fg};
  `
};
