import type {
	ComponentPropsWithRef,
	MouseEventHandler,
	ReactNode,
} from 'react';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export type AlertProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
	/** Visual tone of the alert. */
	severity?: AlertSeverity;
	/** Optional heading displayed above the message. */
	title?: ReactNode;
	/** Actions displayed below the message. */
	actions?: ReactNode;
	/** Controls whether the alert is visible. */
	display?: boolean;
	/** Called when the close button is pressed. */
	onClose?: MouseEventHandler<HTMLButtonElement>;
	/** Accessible label and tooltip for the close button. */
	closeText?: string;
	/** Replaces the default severity icon. */
	icon?: ReactNode;
	/** Removes the alert from the DOM when `display` is `false`. */
	unmountOnExit?: boolean;
};
