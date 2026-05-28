import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { clsx } from 'clsx';
import { Button } from '../Button';
import * as styles from './styles.css';
import type { AlertDialogProps } from './types';

function Trigger({ ...props }: AlertDialogProps.Trigger) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

function Portal({ ...props }: AlertDialogProps.Portal) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	);
}

function Overlay({ className, ...props }: AlertDialogProps.Overlay) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-slot="alert-dialog-overlay"
			className={clsx(styles.overlay, className)}
			{...props}
		/>
	);
}

function Content({
	className,
	size = 'default',
	...props
}: AlertDialogProps.Content) {
	return (
		<Portal>
			<Overlay />
			<AlertDialogPrimitive.Popup
				data-slot="alert-dialog-content"
				data-size={size}
				className={clsx(styles.content, className)}
				{...props}
			/>
		</Portal>
	);
}

function Header({ className, ...props }: AlertDialogProps.Header) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={clsx(styles.header, className)}
			{...props}
		/>
	);
}

function Footer({ className, ...props }: AlertDialogProps.Footer) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={clsx(styles.footer, className)}
			{...props}
		/>
	);
}

function Media({ className, ...props }: AlertDialogProps.Media) {
	return (
		<div
			data-slot="alert-dialog-media"
			className={clsx(styles.media, className)}
			{...props}
		/>
	);
}

function Title({ className, ...props }: AlertDialogProps.Title) {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={clsx(styles.title, className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }: AlertDialogProps.Description) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={clsx(styles.description, className)}
			{...props}
		/>
	);
}

function Action({ className, ...props }: AlertDialogProps.Action) {
	return (
		<Button data-slot="alert-dialog-action" className={className} {...props} />
	);
}

function Cancel({
	className,
	variant = 'outline',
	size = 'md',
	...props
}: AlertDialogProps.Cancel) {
	return (
		<AlertDialogPrimitive.Close
			data-slot="alert-dialog-cancel"
			className={className}
			render={<Button variant={variant} size={size} />}
			{...props}
		/>
	);
}

export function AlertDialog({ ...props }: AlertDialogProps.Root) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

AlertDialog.Trigger = Trigger;
AlertDialog.Overlay = Overlay;
AlertDialog.Content = Content;
AlertDialog.Header = Header;
AlertDialog.Footer = Footer;
AlertDialog.Media = Media;
AlertDialog.Title = Title;
AlertDialog.Description = Description;
AlertDialog.Action = Action;
AlertDialog.Cancel = Cancel;
