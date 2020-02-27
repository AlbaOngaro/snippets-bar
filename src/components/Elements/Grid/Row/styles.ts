interface IRowProps {
	padding?: {
		top?: number,
		right?: number,
		bottom?: number,
		left?: number,
	},
}

export default {
	Row: ({ padding = {} }: IRowProps) =>`
		display: flex;
		flex-direction: row;
		height: 100%;
		padding: ${Object.values(padding).join('px ') || 0} !important;
	`
};
