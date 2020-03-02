import { lighten } from 'polished';
import { Theme } from '../../../types/theme';

interface IInputProps {
	theme: Theme,
	height?: number,
}

export default {
	Input: ({ theme, height = 100 }: IInputProps) => `
		background: ${lighten(0.02, theme.bg)};
		color: ${theme.fg};
		border: 0;
		height: ${height}%;
		width: 100%;
		padding: 0 32px;
		font-size: 14px;

		&:focus {
			outline: none;
		}
	`
}