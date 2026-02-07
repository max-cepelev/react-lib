import { DEFAULT_SEPARATOR } from '../constants';
import type { DescriptionProps } from '../Description';

type UseLogicParams = DescriptionProps;

export const useLogic = ({
	direction = 'row',
	separator = DEFAULT_SEPARATOR,
}: UseLogicParams) => {
	const hasSeparator = direction === 'column';

	const descriptionContextProviderProps = {
		separator: hasSeparator ? '' : separator,
	};

	return { descriptionContextProviderProps, direction };
};
