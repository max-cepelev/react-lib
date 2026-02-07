import {
	Close,
	Content,
	Description,
	type DialogProps as DialogPrimitiveProps,
	Overlay,
	Portal,
	Root,
	Title,
	Trigger,
} from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { X } from 'lucide-react';
import type * as React from 'react';
import * as styles from './styles.css';

export type DialogProps = DialogPrimitiveProps & {
	title: string;
	description?: string;
	trigger?: React.ReactNode;
	className?: string;
	footer?: React.ReactNode;
};

export const Dialog = ({
	title,
	description = '',
	trigger,
	className,
	footer,
	children,
	...props
}: DialogProps) => {
	return (
		<Root {...props}>
			{trigger && <Trigger asChild>{trigger}</Trigger>}
			<Portal>
				<Overlay className={clsx(styles.overlay)} />
				<Content className={clsx(styles.content, className)}>
					<div
						className={clsx(styles.header, {
							[styles.hasDescription]: Boolean(description),
						})}
					>
						<Title className={styles.title}>{title}</Title>
						<Description className={styles.description}>
							{description}
						</Description>
						{props.onOpenChange && (
							<Close className={styles.closeButton}>
								<X size={24} />
								<span className={styles.closeSpan}>Close</span>
							</Close>
						)}
					</div>
					{children}
					{footer && <div className={styles.footer}>{footer}</div>}
				</Content>
			</Portal>
		</Root>
	);
};
