import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { rootClass } from './styles.css';

export type PageLayoutFooterProps = {
	className?: string;
	children: ReactNode;
};

export const Footer = (props: PageLayoutFooterProps) => {
	const { children, className } = props;

	return <footer className={clsx(rootClass, className)}>{children}</footer>;
};
