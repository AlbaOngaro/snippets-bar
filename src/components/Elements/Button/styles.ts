import { Theme } from '../../../types/theme';

interface IStylesProps {
	theme: Theme,
	center?: boolean,
}

export default {
  Button: ({ theme, center }: IStylesProps) => `
  	background: transparent;
	border: 0;
	color: ${theme.fg};
	display: flex;
    padding: 0;
    width: auto;
    text-transform: uppercase;
	align-items: center;
	opacity: 1;
	transition: opacity .5 ease-in-out;
	${center ? 'justify-content: center;' : 'justify-content: space-between;'}

	&:focus,
	&:hover {
		outline: none;
		opacity: .7;
		transition: opacity .5 ease-in-out;
		cursor: pointer;
	}

	svg {
		width: 15px;
		height: 100%;
		fill: ${theme.fg};
		margin-right: 16px;
	}
  `
};
