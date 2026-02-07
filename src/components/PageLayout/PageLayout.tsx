import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Aside } from './Aside';
import { Content } from './Content';
import { Footer } from './Footer';
import { Header } from './Header';
import { rootClass } from './styles.css';

export type PageLayoutProps = {
	children: ReactNode;
	className?: string;
};

export const PageLayout = ({ children, className }: PageLayoutProps) => {
	return <div className={clsx(rootClass, className)}>{children}</div>;
};

PageLayout.Header = Header;
PageLayout.Content = Content;
PageLayout.Footer = Footer;
PageLayout.Aside = Aside;
