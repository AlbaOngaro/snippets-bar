import { darken } from 'polished';

import { Theme } from '../../../types/theme';

interface IStylesProps {
	theme: Theme,
}

export default {
  Header: ({ theme }: IStylesProps) =>`
	height: 15%;
	background: ${darken(0.02, theme.bg)};
	color: ${theme.fg};
  `
};
