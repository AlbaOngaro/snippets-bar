import { lighten } from 'polished';
import { Theme } from '../../../types/theme';

interface Props {
	theme: Theme,
}

export default {
	Input: ({ theme }: Props) => `
		background: ${lighten(0.02, theme.bg)};
		color: ${theme.fg};
		border: 0;
		height: 100%;
		width: 100%;
		padding: 0 32px;
		font-size: 14px;

		&:focus {
			outline: none;
		}
	`
}