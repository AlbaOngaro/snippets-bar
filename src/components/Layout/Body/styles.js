import { darken } from "polished";

export default {
  Body: ({ theme, full }) => `
		height: ${full ? "100%" : "70%"};
		background: ${darken(0.03, theme.bg)};
		color: ${theme.fg};
		padding: 24px 16px;
  `
};
