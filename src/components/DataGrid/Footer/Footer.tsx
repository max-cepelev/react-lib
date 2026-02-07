import { clsx } from 'clsx';
import { footerClass } from './styles.css';
export function Footer({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <footer className={clsx(footerClass, className)}>{children}</footer>;
}
