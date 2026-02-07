import { useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../constants';

export const useLogic = () => {
	const [pinned, setPinned] = useState(
		window.localStorage.getItem(LOCAL_STORAGE_KEY) === 'true',
	);
	const togglePinned = () => {
		setPinned(!pinned);
		window.localStorage.setItem(LOCAL_STORAGE_KEY, String(!pinned));
	};
	return {
		pinned,
		togglePinned,
	};
};
