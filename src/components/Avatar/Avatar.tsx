'use client';

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { clsx } from 'clsx';
import * as styles from './styles.css';
import type { AvatarProps } from './types';

function Avatar({ className, size = 'medium', ...props }: AvatarProps.Root) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={clsx(styles.root, className)}
			{...props}
		/>
	);
}

function Image({ className, ...props }: AvatarProps.Image) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={clsx(styles.image, className)}
			{...props}
		/>
	);
}

function Fallback({ className, ...props }: AvatarProps.Fallback) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={clsx(styles.fallback, className)}
			{...props}
		/>
	);
}

function Badge({ className, ...props }: AvatarProps.Badge) {
	return (
		<span
			data-slot="avatar-badge"
			className={clsx(styles.badge, className)}
			{...props}
		/>
	);
}

function Group({ className, ...props }: AvatarProps.Group) {
	return (
		<div
			data-slot="avatar-group"
			className={clsx(styles.group, className)}
			{...props}
		/>
	);
}

function GroupCount({ className, ...props }: AvatarProps.GroupCount) {
	return (
		<div
			data-slot="avatar-group-count"
			className={clsx(styles.groupCount, className)}
			{...props}
		/>
	);
}

Avatar.Image = Image;
Avatar.Fallback = Fallback;
Avatar.Badge = Badge;
Avatar.Group = Group;
Avatar.GroupCount = GroupCount;

export { Avatar };
