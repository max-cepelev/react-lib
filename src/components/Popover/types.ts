import type { Popover } from '@base-ui/react/popover';

export namespace PopoverProps {
	export type Root = Popover.Root.Props;

	export type Trigger = Popover.Trigger.Props;

	export type Content = Popover.Popup.Props &
		Pick<
			Popover.Positioner.Props,
			'align' | 'alignOffset' | 'side' | 'sideOffset'
		>;
}
