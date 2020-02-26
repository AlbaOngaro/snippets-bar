import { lighten } from 'polished';
import { Theme } from '../../../types/theme';

interface IContainerProps {
	theme: Theme,
	opened: boolean
}

export default {
	Container: ({ opened, theme }: IContainerProps) => `
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: auto;
		width: 300px;
		background: ${lighten(0.1, theme.bg)};
		margin: 0 auto;
		padding: 16px;
		display: ${opened ? 'block' : 'none'};

		& > * {
			padding: 0;
			margin: 0;
		}
	`
}