import { clsx } from 'clsx';
import {
	alignments,
	colors,
	decorations,
	displays,
	gutterBottomClass,
	transforms,
	variants,
	weights,
} from './styles.css';
import type {
	TypographyAlign,
	TypographyColor,
	TypographyVariant,
} from './types';

export type TypographyProps = Omit<
	React.HTMLAttributes<HTMLElement>,
	'color'
> & {
	align?: TypographyAlign;
	variant?: TypographyVariant;
	color?: TypographyColor;
	display?: 'block' | 'inline';
	weight?: 'normal' | 'bold' | 'medium' | 'semibold';
	transform?: 'lowercase' | 'capitalize' | 'uppercase';
	decoration?: 'none' | 'underline' | 'lineThrough';
	component?: React.ElementType;
	gutterBottom?: boolean;
};

const VARIANT_COMPONENT_MAP: Record<
	NonNullable<TypographyProps['variant']>,
	React.ElementType
> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle1: 'h6',
	subtitle2: 'h6',
	body1: 'p',
	body2: 'p',
	caption: 'span',
	overline: 'span',
};

const Typography = ({
	className,
	variant = 'body1',
	component,
	color = 'primary',
	align = 'left',
	display = 'inline',
	weight = 'normal',
	transform,
	decoration = 'none',
	gutterBottom,
	children,
	...props
}: TypographyProps) => {
	const Component = component || VARIANT_COMPONENT_MAP[variant || 'body1'];

	return (
		<Component
			className={clsx(
				decorations[decoration],
				variants[variant],
				colors[color],
				weights[weight],
				transform && transforms[transform],
				displays[display],
				alignments[align],
				{
					[gutterBottomClass]: gutterBottom,
				},
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
};

export {
	alignments,
	colors,
	displays,
	Typography,
	transforms,
	variants,
	weights,
};
