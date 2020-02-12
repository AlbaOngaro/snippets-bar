interface Props {
	width: number,
}

export default {
	Column: ({ width = 100 }: Props) => `
		display: flex;
		flex-direction: column;
		height: 100%;
		width: ${width}%;
	`
};
