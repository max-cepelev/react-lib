import type { Meta } from 'storybook-react-rsbuild';
import { Badge } from '~/components';

export default {
	title: 'Badge',
	component: Badge,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export function Demo() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					width: '100%',
					flexWrap: 'wrap',
					gap: '0.5rem',
				}}
			>
				<Badge>Badge</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="destructive">Destructive</Badge>
				<Badge variant="outline">Outline</Badge>
			</div>
			<div
				style={{
					display: 'flex',
					width: '100%',
					flexWrap: 'wrap',
					gap: '0.5rem',
				}}
			>
				<Badge variant="secondary">Verified</Badge>
				<Badge>8</Badge>
				<Badge variant="destructive">99</Badge>
				<Badge variant="outline">20+</Badge>
			</div>
		</div>
	);
}
