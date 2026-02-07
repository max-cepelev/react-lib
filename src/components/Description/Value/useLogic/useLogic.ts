import { useContext } from 'react';

import { DescriptionContext } from '../../DescriptionContext';
import type { ValueProps } from '../Value';

type UseLogicParams = ValueProps;

export const useLogic = ({ canCopy, children, stub = '—' }: UseLogicParams) => {
	const { leader, direction } = useContext(DescriptionContext);

	const valueToRender = children || stub;

	const isDefaultValueRender = !canCopy || !children;

	return { valueToRender, isDefaultValueRender, leader, direction };
};
