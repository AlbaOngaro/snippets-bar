import { darken } from 'polished';

import { Theme } from '../../../contexts/theme/types';

interface Props {
	theme: Theme,
}

export default {
  Header: ({ theme }: Props) =>`
	height: 15%;
	background: ${darken(0.02, theme.bg)};
	color: ${theme.fg};
  `
};
