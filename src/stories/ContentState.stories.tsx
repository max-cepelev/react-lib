import type { Meta } from 'storybook-react-rsbuild';
import { ContentState } from '~/components';

function LoadedContent() {
	return (
		<div style={{ width: 420 }}>
			<h3 style={{ marginTop: 0 }}>Loaded content</h3>
			<p style={{ marginBottom: 0 }}>
				This block represents a component that depends on loaded data.
			</p>
		</div>
	);
}

export default {
	title: 'ContentState',
	component: ContentState,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ContentState>;

export function Success() {
	return (
		<ContentState>
			<LoadedContent />
		</ContentState>
	);
}

export function Loading() {
	return (
		<div style={{ width: 420, height: 500 }}>
			<ContentState isLoading>
				<LoadedContent />
			</ContentState>
		</div>
	);
}

export function ErrorState() {
	return (
		<div style={{ width: 420, height: 500 }}>
			<ContentState
				isError
				errorState={{
					title: 'Projects unavailable',
					message: 'Refresh the list or try again later.',
					onRetry: () => undefined,
				}}
			>
				<LoadedContent />
			</ContentState>
		</div>
	);
}
