import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { PAGE_ASIDE_CLASSNAME } from '../constants';
import { rootClass } from './styles.css';

export type PageAsideProps = {
	children: ReactNode;
	className?: string;
};

export const Aside = ({ children, className }: PageAsideProps) => {
	return (
		<aside className={clsx(rootClass, className, PAGE_ASIDE_CLASSNAME)}>
			{children}
		</aside>
	);
};
