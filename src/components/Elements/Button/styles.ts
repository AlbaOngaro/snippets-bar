import { Theme } from '../../../types/theme';

interface IStylesProps {
	theme: Theme,
}

export default {
  Button: ({ theme }: IStylesProps) => `
  	background: transparent;
	border: 0;
	color: ${theme.fg};
	display: flex;
    justify-content: space-between;
    padding: 0;
    width: auto;
    text-transform: uppercase;
	align-items: center;
	opacity: 1;
	transition: opacity .5 ease-in-out;

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
