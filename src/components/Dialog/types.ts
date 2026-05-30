import type { Dialog as DialogPrimitive } from '@base-ui/react/dialog';

export namespace DialogProps {
	export type Root = DialogPrimitive.Root.Props;

	export type Trigger = DialogPrimitive.Trigger.Props;

	export type Portal = DialogPrimitive.Portal.Props;

	export type Close = DialogPrimitive.Close.Props;

	export type Overlay = DialogPrimitive.Backdrop.Props & {
		className?: string;
	};

	export type Content = DialogPrimitive.Popup.Props & {
		className?: string;
		showCloseButton?: boolean;
	};

	export type Header = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Footer = React.ComponentProps<'div'> & {
		className?: string;
		showCloseButton?: boolean;
	};

	export type Title = DialogPrimitive.Title.Props & {
		className?: string;
	};

	export type Description = DialogPrimitive.Description.Props & {
		className?: string;
	};
}
