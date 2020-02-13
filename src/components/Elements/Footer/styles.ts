import { darken } from 'polished';
import { Theme } from '../../../types/theme';

interface IStylesProps {
	theme: Theme,
}

export default {
  Footer: ({ theme }: IStylesProps) =>`
	height: 15%;
	background: ${darken(0.02, theme.bg)};
	color: ${theme.fg};
	display: flex;
    justify-content: space-around;
    align-items: center;
  `
};
