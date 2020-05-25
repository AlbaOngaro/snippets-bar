import { lighten, darken } from 'polished';
import { Theme } from '../../../types/theme';

interface IInputProps {
	theme: Theme,
	height?: number,
	withIcon?: boolean,
}

interface IClearIconProps {
	theme: Theme,
}

export default {
	Input: ({ theme, height = 100, withIcon }: IInputProps) => `
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
	`,
	ClearIcon: ({ theme }: IClearIconProps) =>`
		position: absolute;
		right: 16px;
		top: 19px;
		border-radius: 50%;
		height: 16px;
		width: 16px;
		display: block;
		-webkit-appearance: none;
		-moz-appearance: none;
		border: none;
		text-align: center;
		padding: 0;
		line-height: 16px;
		font-size: 13px;
		font-weight: bold;
		color: ${theme.bg};
		background: ${theme.fg};

		&:focus, &:hover {
			outline: none;
			background: ${darken(0.05, theme.fg)};
			cursor: pointer;
		}
	`
}