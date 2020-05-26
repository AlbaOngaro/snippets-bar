import { darken } from 'polished';
import { Theme } from "../../../../types/theme";

interface IStylesProps {
	width: number,
	theme?: Theme,
}

export default {
	Column: ({ width = 100, theme }: IStylesProps) => `
		display: flex;
		flex-direction: column;
		height: 100%;
		width: ${width}%;
		background: ${darken(0.03, theme.bg) || 'transparent'};
	`
};
