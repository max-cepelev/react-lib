import { useEffect, useState } from 'react';

export function useDisplayedProgress(isLoading: boolean, progress?: number) {
	const [fakeProgress, setFakeProgress] = useState(0);
	const hasRealProgress = typeof progress === 'number';

	useEffect(() => {
		if (!isLoading || hasRealProgress) {
			setFakeProgress(0);
			return;
		}

		const interval = window.setInterval(() => {
			setFakeProgress((current) => Math.min(80, current + 10));
		}, 500);

		return () => window.clearInterval(interval);
	}, [hasRealProgress, isLoading]);

	return hasRealProgress ? progress : fakeProgress;
}
