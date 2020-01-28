import { darken } from 'polished';

export default {
  Body: ({ theme }) => `
	height: 70%;
	background: ${darken(0.03, theme.bg)};
	color: ${theme.fg};
  `
};
