import { useEffect, useState } from 'react';

function useObjectUrl(file?: File) {
	const [url, setUrl] = useState<string>();

	useEffect(() => {
		if (!file || typeof URL.createObjectURL !== 'function') {
			setUrl(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setUrl(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [file]);

	return url;
}

export { useObjectUrl };
