'use client';

import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { clsx } from 'clsx';
import { XIcon } from 'lucide-react';
import { Button } from '../Button';
import * as styles from './styles.css';
import type { SheetProps } from './types';

function Sheet({ ...props }: SheetProps.Root) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function Trigger({ ...props }: SheetProps.Trigger) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function Close({ ...props }: SheetProps.Close) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function Portal({ ...props }: SheetProps.Portal) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function Overlay({ className, ...props }: SheetProps.Overlay) {
	return (
		<SheetPrimitive.Backdrop
			data-slot="sheet-overlay"
			className={clsx(styles.overlay, className)}
			{...props}
		/>
	);
}

function Content({
	className,
	children,
	side = 'right',
	showCloseButton = true,
	...props
}: SheetProps.Content) {
	return (
		<Portal>
			<Overlay />
			<SheetPrimitive.Popup
				data-slot="sheet-content"
				data-side={side}
				className={clsx(styles.content, className)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<SheetPrimitive.Close
						data-slot="sheet-close"
						render={
							<Button
								variant="ghost"
								className={styles.closeButton}
								size="iconSm"
							/>
						}
					>
						<XIcon />
						<span className={styles.closeText}>Close</span>
					</SheetPrimitive.Close>
				)}
			</SheetPrimitive.Popup>
		</Portal>
	);
}

function Header({ className, ...props }: SheetProps.Header) {
	return (
		<div
			data-slot="sheet-header"
			className={clsx(styles.header, className)}
			{...props}
		/>
	);
}

function Footer({ className, ...props }: SheetProps.Footer) {
	return (
		<div
			data-slot="sheet-footer"
			className={clsx(styles.footer, className)}
			{...props}
		/>
	);
}

function Title({ className, ...props }: SheetProps.Title) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={clsx(styles.title, className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }: SheetProps.Description) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={clsx(styles.description, className)}
			{...props}
		/>
	);
}

Sheet.Trigger = Trigger;
Sheet.Close = Close;
Sheet.Portal = Portal;
Sheet.Overlay = Overlay;
Sheet.Content = Content;
Sheet.Header = Header;
Sheet.Footer = Footer;
Sheet.Title = Title;
Sheet.Description = Description;

export { Sheet };
