import React, { ChangeEvent, Fragment, useRef } from 'react';
import styled from 'styled-components';
import { Key } from "ts-keycode-enum";

import { useShortcut } from '../../../hooks';

import { Theme } from '../../../types/theme';

import styles from './styles';

const Input = styled.input`
	${styles.Input}
`;

const ClearIcon = styled.button`
	${styles.ClearIcon}
`;

interface IInputProps {
	theme: Theme,
	type?: string,
	height?: number,
	placeholder?: string,
	defaultValue?: string,
	withIcon?: boolean,
	clearable?: boolean,
	ref?: any,
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
	onClear?: () => void,
}

export default ({ theme, ref, type, defaultValue, onChange, placeholder, height, clearable = false, onClear }: IInputProps) => {
	const inputRef = useRef(null);

	useShortcut([
		{
			code: Key.F,
			shift: false,
			meta: true,
			callback: () => {
				inputRef.current.focus();
			},
		}
	]);

	return (
		<Fragment>
			<Input 
				ref={inputRef}
				theme={theme} 
				type={type}
				height={height}
				placeholder={placeholder}
				defaultValue={defaultValue} 
				onChange={onChange}
			/>
			{clearable && (
				<ClearIcon 
					theme={theme} 
					onClick={() => {
						inputRef.current.value = '';

						if (typeof onClear === 'function') {
							onClear();
						}
					}}
				>
					×
				</ClearIcon>
			)}
		</Fragment>
	)
}