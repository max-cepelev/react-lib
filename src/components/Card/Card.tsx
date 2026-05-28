import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { theme } from '~/theme';
import * as styles from './card.css';

const Card = ({
	className,
	elevation = 2,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	elevation?: keyof typeof theme.elevation;
}) => (
	<div
		style={{ boxShadow: theme.elevation[elevation] }}
		className={clsx(styles.root, className)}
		{...props}
	/>
);

const Header = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx(styles.header, className)} {...props} />
);

const Title = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
	<h3 className={clsx(styles.title, className)} {...props} />
);

const Description = ({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) => (
	<p className={clsx(styles.description, className)} {...props} />
);

const Content = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx(styles.content, className)} {...props} />
);

const Footer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={clsx(styles.footer, className)} {...props} />
);

Card.Footer = Footer;
Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;

export { Card };
