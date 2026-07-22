export const getStringInputValue = (input: unknown): string =>
	typeof input === 'string' ? input : '';
