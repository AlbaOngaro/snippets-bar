import { Theme } from '../../../contexts/theme/types';

interface Props {
	theme: Theme,
}

export default {
	Sidebar: ({ theme }: Props) => `
		height: 100%;
		width: 100%;
		background: ${theme.bg};
		color: ${theme.fg};
  	`
};
