import type { Meta } from 'storybook-react-rsbuild';
import { ProgressBar, Typography } from '~/components';

export default {
	title: 'ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export function Demo() {
	return (
		<div style={{ display: 'grid', gap: 16, width: 360 }}>
			{[0, 25, 50, 75, 100].map((value) => (
				<div key={value} style={{ display: 'grid', gap: 6 }}>
					<Typography variant="caption" color="secondary">
						{value}%
					</Typography>
					<ProgressBar value={value} aria-label={`Прогресс: ${value}%`} />
				</div>
			))}
		</div>
	);
}

export function ClampedValue() {
	return (
		<div style={{ width: 360 }}>
			<ProgressBar value={140} aria-label="Завершено" />
		</div>
	);
}
