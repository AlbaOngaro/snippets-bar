import { darken } from 'polished';
import { Theme } from '../../../../types/theme';

interface IRowProps {
	theme?: Theme,
	padding?: {
		top?: number,
		right?: number,
		bottom?: number,
		left?: number,
	},
}

export default {
	Row: ({ padding = {}, theme }: IRowProps) =>`
		display: flex;
		flex-direction: row;
		height: 100%;
		padding: ${Object.values(padding).join('px ') || 0} !important;
		background: ${darken(0.03, theme.bg) || 'transparent'};
	`
};
