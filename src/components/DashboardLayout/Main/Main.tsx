import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { rootClass } from './styles.css';

export type MainProps = {
	children: ReactNode;
	className?: string;
};
export const Main = ({ children, className }: MainProps) => {
	return <main className={clsx(rootClass, className)}>{children}</main>;
};
