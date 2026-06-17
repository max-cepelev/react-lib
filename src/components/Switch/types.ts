import type { Switch } from '@base-ui/react/switch';

export namespace SwitchProps {
	export type Root = Switch.Root.Props & {
		size?: 'small' | 'medium';
	};
}
