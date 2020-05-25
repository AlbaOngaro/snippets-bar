import { darken } from 'polished';

import { Theme } from '../../../types/theme';

interface IStylesProps {
	theme: Theme,
	height?: number,
}

export default {
  Header: ({ theme, height = 15 }: IStylesProps) =>`
	background: ${darken(0.02, theme.bg)};
	color: ${theme.fg};
	height: ${height}%;
	position: relative;
	display: flex;
  `
};
