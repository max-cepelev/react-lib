import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { clsx } from 'clsx';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import * as styles from './styles.css';
import type { BreadcrumbProps } from './types';

function Breadcrumb({ className, ...props }: BreadcrumbProps.Root) {
	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			className={className}
			{...props}
		/>
	);
}

function List({ className, ...props }: BreadcrumbProps.List) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={clsx(styles.list, className)}
			{...props}
		/>
	);
}

function Item({ className, ...props }: BreadcrumbProps.Item) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={clsx(styles.item, className)}
			{...props}
		/>
	);
}

function Link({ className, render, ...props }: BreadcrumbProps.Link) {
	return useRender({
		defaultTagName: 'a',
		props: mergeProps<'a'>(
			{
				className: clsx(styles.link, className),
			},
			props,
		),
		render,
		state: {
			slot: 'breadcrumb-link',
		},
	});
}

function Page({ className, ...props }: BreadcrumbProps.Page) {
	return (
		<span
			data-slot="breadcrumb-page"
			aria-current="page"
			className={clsx(styles.page, className)}
			{...props}
		/>
	);
}

function Separator({
	children,
	className,
	...props
}: BreadcrumbProps.Separator) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={clsx(styles.separator, className)}
			{...props}
		>
			{children ?? <ChevronRightIcon />}
		</li>
	);
}

function Ellipsis({ className, ...props }: BreadcrumbProps.Ellipsis) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={clsx(styles.ellipsis, className)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className={styles.visuallyHidden}>More</span>
		</span>
	);
}

Breadcrumb.List = List;
Breadcrumb.Item = Item;
Breadcrumb.Link = Link;
Breadcrumb.Page = Page;
Breadcrumb.Separator = Separator;
Breadcrumb.Ellipsis = Ellipsis;

export { Breadcrumb };
