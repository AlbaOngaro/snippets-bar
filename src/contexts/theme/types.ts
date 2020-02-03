export interface Theme {
	fg: string,
	bg: string,
}

export interface Themes {
	[key: string]: Theme,
}