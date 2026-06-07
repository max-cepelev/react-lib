import { useEffect, useState } from 'react';
import { MOBILE_BREAKPOINT } from './constants';

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
		);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		mediaQuery.addEventListener('change', onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

		return () => mediaQuery.removeEventListener('change', onChange);
	}, []);

	return Boolean(isMobile);
}
