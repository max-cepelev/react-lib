import type { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import type { ButtonProps } from '../Button';

export namespace AlertDialogProps {
	export type Root = AlertDialogPrimitive.Root.Props;

	export type Trigger = AlertDialogPrimitive.Trigger.Props;

	export type Portal = AlertDialogPrimitive.Portal.Props;

	export type Overlay = AlertDialogPrimitive.Backdrop.Props & {
		className?: string;
	};

	export type Content = AlertDialogPrimitive.Popup.Props & {
		className?: string;
		size?: 'default' | 'sm';
	};

	export type Header = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Footer = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Media = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Title = React.ComponentProps<
		typeof AlertDialogPrimitive.Title
	> & {
		className?: string;
	};

	export type Description = React.ComponentProps<
		typeof AlertDialogPrimitive.Description
	> & {
		className?: string;
	};

	export type Action = ButtonProps & {
		className?: string;
	};

	export type Cancel = AlertDialogPrimitive.Close.Props &
		Pick<ButtonProps, 'variant' | 'size'> & {
			className?: string;
		};
}
