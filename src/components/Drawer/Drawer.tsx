'use client';

import { clsx } from 'clsx';
import type * as React from 'react';
import { type DialogProps, Drawer as DrawerPrimitive, Root } from 'vaul';
import * as styles from './styles.css';

export type DrawerProps = DialogProps & {
	title: string;
	description?: string;
	trigger?: React.ReactNode;
	className?: string;
	footer?: React.ReactNode;
	closeButton?: React.ReactNode;
};

export const Drawer = ({
	children,
	trigger,
	className,
	title,
	description = '',
	footer,
	closeButton,
	...props
}: DrawerProps) => {
	return (
		<Root {...props}>
			{trigger && (
				<DrawerPrimitive.Trigger data-slot="drawer-trigger" asChild>
					{trigger}
				</DrawerPrimitive.Trigger>
			)}
			<DrawerPrimitive.Portal data-slot="drawer-portal">
				<DrawerPrimitive.Overlay
					data-slot="drawer-overlay"
					className={styles.overlay}
				/>
				<DrawerPrimitive.Content
					data-slot="drawer-content"
					className={clsx('group/drawer-content', styles.content, className)}
				>
					<div className={styles.dragHandle} />
					<div data-slot="drawer-header" className={styles.header}>
						<DrawerPrimitive.Title
							data-slot="drawer-title"
							className={styles.title}
						>
							{title}
						</DrawerPrimitive.Title>
						<DrawerPrimitive.Description
							data-slot="drawer-description"
							className={styles.description}
						>
							{description}
						</DrawerPrimitive.Description>
					</div>
					{children}
					<div data-slot="drawer-footer" className={styles.footer}>
						{footer}
						{closeButton && (
							<DrawerPrimitive.Close data-slot="drawer-close" asChild>
								{closeButton}
							</DrawerPrimitive.Close>
						)}
					</div>
				</DrawerPrimitive.Content>
			</DrawerPrimitive.Portal>
		</Root>
	);
};
