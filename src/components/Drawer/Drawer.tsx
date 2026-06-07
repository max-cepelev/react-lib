'use client';

import {
	Drawer as DrawerPrimitive,
	type DrawerRoot,
} from '@base-ui/react/drawer';
import { clsx } from 'clsx';
import type * as React from 'react';
import * as styles from './styles.css';

export type DrawerProps = Omit<DrawerRoot.Props, 'children'> & {
	title: string;
	children?: React.ReactNode;
	description?: string;
	trigger?: React.ReactElement;
	className?: string;
	footer?: React.ReactNode;
	closeButton?: React.ReactElement;
};

export const Drawer = ({
	children,
	trigger,
	className,
	title,
	description = '',
	footer,
	closeButton,
	swipeDirection = 'down',
	...props
}: DrawerProps) => {
	return (
		<DrawerPrimitive.Root swipeDirection={swipeDirection} {...props}>
			{trigger && (
				<DrawerPrimitive.Trigger data-slot="drawer-trigger" render={trigger} />
			)}
			<DrawerPrimitive.Portal data-slot="drawer-portal">
				<DrawerPrimitive.Backdrop
					data-slot="drawer-overlay"
					className={styles.overlay}
				/>
				<DrawerPrimitive.Viewport className={styles.viewport}>
					<DrawerPrimitive.Popup
						data-slot="drawer-content"
						className={clsx('group/drawer-content', styles.content, className)}
					>
						<DrawerPrimitive.Content className={styles.contentInner}>
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
									<DrawerPrimitive.Close
										data-slot="drawer-close"
										render={closeButton}
									/>
								)}
							</div>
						</DrawerPrimitive.Content>
					</DrawerPrimitive.Popup>
				</DrawerPrimitive.Viewport>
			</DrawerPrimitive.Portal>
		</DrawerPrimitive.Root>
	);
};
