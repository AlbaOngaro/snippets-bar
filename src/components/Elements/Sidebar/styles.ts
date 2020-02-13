import { Theme } from '../../../types/theme';

interface IStylesProps {
	theme: Theme,
}

export default {
	Sidebar: ({ theme }: IStylesProps) => `
		height: 100%;
		width: 100%;
		background: ${theme.bg};
		color: ${theme.fg};
  	`
};
