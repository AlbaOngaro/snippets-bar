import { Theme } from '../../../types/theme';
import { darken } from "polished";

interface IStylesProps {
	theme: Theme,
	full?: boolean,
}

export default {
	Body: ({ theme, full }: IStylesProps) => `
		height: ${full ? "100%" : "70%"};
		background: ${darken(0.03, theme.bg)};
		color: ${theme.fg};
		padding: 24px 16px;
		position: relative;
		overflow: scroll;

		pre {
			background: transparent !important;
			font-size: 14px;
		}
	`
};
