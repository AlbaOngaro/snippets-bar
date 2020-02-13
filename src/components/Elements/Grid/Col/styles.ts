interface IStylesProps {
	width: number,
}

export default {
	Column: ({ width = 100 }: IStylesProps) => `
		display: flex;
		flex-direction: column;
		height: 100%;
		width: ${width}%;
	`
};
