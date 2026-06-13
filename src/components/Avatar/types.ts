import type { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';

export type AvatarSize = 'medium' | 'small' | 'large';

export namespace AvatarProps {
	export type Root = AvatarPrimitive.Root.Props & {
		size?: AvatarSize;
	};

	export type Image = AvatarPrimitive.Image.Props;

	export type Fallback = AvatarPrimitive.Fallback.Props;

	export type Badge = React.ComponentProps<'span'>;

	export type Group = React.ComponentProps<'div'>;

	export type GroupCount = React.ComponentProps<'div'>;
}
