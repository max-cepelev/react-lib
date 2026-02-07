import type { ComponentProps } from 'react';
import { separatorClass } from './styles.css';

export const Separator = ({
	separator = '•',
	...props
}: ComponentProps<'div'> & { separator?: string }) => (
	<div {...props}>
		<span className={separatorClass}>{separator}</span>
	</div>
);
