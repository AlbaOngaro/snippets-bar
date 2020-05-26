import { useEffect } from 'react';

interface Combination {
	code: number,
	shift: boolean,
	meta: boolean,
	callback: () => void
}

const useShortcut = (combinations: Combination[]) => {
	useEffect(() => {
		const handleKeyDown = (e) => {
			combinations.forEach(combination => {
				if (
					combination.code === e.keyCode && 
					combination.shift === e.shiftKey && 
					combination.meta === e.metaKey
				) {
					combination.callback();
				}
			});
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);

	}, [combinations]);
} 

export default useShortcut;