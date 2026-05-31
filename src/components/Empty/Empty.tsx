import { clsx } from 'clsx';
import * as styles from './styles.css';
import type { EmptyProps } from './types';

function Empty({ className, ...props }: EmptyProps.Root) {
	return (
		<div
			data-slot="empty"
			className={clsx(styles.root, className)}
			{...props}
		/>
	);
}

function Header({ className, ...props }: EmptyProps.Header) {
	return (
		<div
			data-slot="empty-header"
			className={clsx(styles.header, className)}
			{...props}
		/>
	);
}

function Media({ className, variant = 'default', ...props }: EmptyProps.Media) {
	return (
		<div
			data-slot="empty-media"
			data-variant={variant}
			className={clsx(styles.media, styles.mediaVariants[variant], className)}
			{...props}
		/>
	);
}

function Title({ className, ...props }: EmptyProps.Title) {
	return (
		<div
			data-slot="empty-title"
			className={clsx(styles.title, className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }: EmptyProps.Description) {
	return (
		<div
			data-slot="empty-description"
			className={clsx(styles.description, className)}
			{...props}
		/>
	);
}

function Content({ className, ...props }: EmptyProps.Content) {
	return (
		<div
			data-slot="empty-content"
			className={clsx(styles.content, className)}
			{...props}
		/>
	);
}

Empty.Header = Header;
Empty.Media = Media;
Empty.Title = Title;
Empty.Description = Description;
Empty.Content = Content;

export { Empty };
