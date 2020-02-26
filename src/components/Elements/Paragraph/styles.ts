import { Theme } from '../../../types/theme';

interface IParagraphProps {
	theme: Theme,
	alignment?: string,
}

export default {
	Paragraph: ({ theme, alignment }: IParagraphProps) =>`
		color: ${theme.fg};
		text-align: ${alignment};
		margin: 0;
		padding: 0;
	`
}