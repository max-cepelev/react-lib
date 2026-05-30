import type { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import type { useRender } from '@base-ui/react/use-render';

export namespace ButtonGroupProps {
	export type Root = React.ComponentProps<'fieldset'> & {
		orientation?: 'horizontal' | 'vertical';
	};

	export type Text = useRender.ComponentProps<'div'>;

	export type Separator = SeparatorPrimitive.Props;
}
