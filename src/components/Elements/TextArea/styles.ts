import { Theme } from '../../../types/theme';

interface IStylesProps {
	theme: Theme,
}

export default {
	TextArea: ({ theme }: IStylesProps) =>`
		background: transparent;
		border: none;
		color: ${theme.fg};
		font-size: 14px;
		width: 100%;
		height: 100%;
		resize: none;

		&:focus {
			outline: none;
		}
	`
};