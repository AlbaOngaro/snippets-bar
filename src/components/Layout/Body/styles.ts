import { Theme } from '../../../contexts/theme/types';
import { darken } from "polished";

interface Props {
	theme: Theme,
	full?: boolean,
}

export default {
  Body: ({ theme, full }: Props) => `
		height: ${full ? "100%" : "70%"};
		background: ${darken(0.03, theme.bg)};
		color: ${theme.fg};
		padding: 24px 16px;
  `
};
