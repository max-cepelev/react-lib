import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { theme } from '~/theme';
import {
	card,
	cardContent,
	cardDescription,
	cardFooter,
	cardHeader,
	cardTitle,
} from './card.css';

const Card = ({
	className,
	elevation = 2,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	elevation?: keyof typeof theme.elevation;
}) => (
	<div
		style={{ boxShadow: theme.elevation[elevation] }}
		className={clsx(card, className)}
		{...props}
	/>
);

const CardHeader = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx(cardHeader, className)} {...props} />
);

const CardTitle = ({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h3 className={clsx(cardTitle, className)} {...props} />
);

const CardDescription = ({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) => (
	<p className={clsx(cardDescription, className)} {...props} />
);

const CardContent = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx(cardContent, className)} {...props} />
);

const CardFooter = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx(cardFooter, className)} {...props} />
);

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
