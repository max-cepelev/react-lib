'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import { XIcon } from 'lucide-react';
import { Button } from '../Button';
import * as styles from './styles.css';
import type { DialogProps } from './types';

function Dialog({ ...props }: DialogProps.Root) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function Trigger({ ...props }: DialogProps.Trigger) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function Portal({ ...props }: DialogProps.Portal) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function Close({ ...props }: DialogProps.Close) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function Overlay({ className, ...props }: DialogProps.Overlay) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
			className={clsx(styles.overlay, className)}
			{...props}
		/>
	);
}

function Content({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogProps.Content) {
	return (
		<Portal>
			<Overlay />
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				className={clsx(styles.content, className)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={
							<Button
								variant="ghost"
								size="iconSmall"
								className={styles.closeButton}
							/>
						}
					>
						<XIcon />
						<span className={styles.closeText}>Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</Portal>
	);
}

function Header({ className, ...props }: DialogProps.Header) {
	return (
		<div
			data-slot="dialog-header"
			className={clsx(styles.header, className)}
			{...props}
		/>
	);
}

function Footer({
	className,
	showCloseButton = false,
	children,
	...props
}: DialogProps.Footer) {
	return (
		<div
			data-slot="dialog-footer"
			className={clsx(styles.footer, className)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close render={<Button variant="outline" />}>
					Close
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function Title({ className, ...props }: DialogProps.Title) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={clsx(styles.title, className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }: DialogProps.Description) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={clsx(styles.description, className)}
			{...props}
		/>
	);
}

Dialog.Trigger = Trigger;
Dialog.Portal = Portal;
Dialog.Close = Close;
Dialog.Overlay = Overlay;
Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Footer = Footer;
Dialog.Title = Title;
Dialog.Description = Description;

export { Dialog };
