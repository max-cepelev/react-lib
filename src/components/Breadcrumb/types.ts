import type { useRender } from '@base-ui/react/use-render';
import type { ComponentProps } from 'react';

export namespace BreadcrumbProps {
	export type Root = ComponentProps<'nav'>;

	export type List = ComponentProps<'ol'>;

	export type Item = ComponentProps<'li'>;

	export type Link = useRender.ComponentProps<'a'>;

	export type Page = ComponentProps<'span'>;

	export type Separator = ComponentProps<'li'>;

	export type Ellipsis = ComponentProps<'span'>;
}
