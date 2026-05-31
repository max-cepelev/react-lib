export type EmptyMediaVariant = 'default' | 'icon';

export namespace EmptyProps {
	export type Root = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Header = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Media = React.ComponentProps<'div'> & {
		className?: string;
		variant?: EmptyMediaVariant;
	};

	export type Title = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Description = React.ComponentProps<'div'> & {
		className?: string;
	};

	export type Content = React.ComponentProps<'div'> & {
		className?: string;
	};
}
