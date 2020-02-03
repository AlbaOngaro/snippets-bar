import { darken } from 'polished';
import { Theme } from '../../../contexts/theme/types';

interface Props {
	theme: Theme,
}

export default {
  Footer: ({ theme }: Props) =>`
	height: 15%;
	background: ${darken(0.02, theme.bg)};
	color: ${theme.fg};
	display: flex;
    justify-content: space-around;
    align-items: center;
  `
};
