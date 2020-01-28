import { darken } from 'polished';

export default {
  Footer: ({ theme }) =>`
	height: 15%;
	background: ${darken(0.02, theme.bg)};
	color: ${theme.fg};
	display: flex;
    justify-content: space-around;
    align-items: center;
  `
};
