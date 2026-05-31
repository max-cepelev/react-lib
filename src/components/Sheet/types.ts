import type { Dialog as SheetPrimitive } from '@base-ui/react/dialog';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

export namespace SheetProps {
	export type Root = SheetPrimitive.Root.Props;

	export type Trigger = SheetPrimitive.Trigger.Props;

	export type Close = SheetPrimitive.Close.Props;

	export type Portal = SheetPrimitive.Portal.Props;

	export type Overlay = SheetPrimitive.Backdrop.Props & {
		className?: string;
	};

	export type Content = SheetPrimitive.Popup.Props & {
		className?: string;
		side?: SheetSide;
		showCloseButton?: boolean;
	};

	export type Header = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Footer = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Title = SheetPrimitive.Title.Props & {
		className?: string;
	};

	export type Description = SheetPrimitive.Description.Props & {
		className?: string;
	};
}
