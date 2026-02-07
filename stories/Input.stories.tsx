import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, Input } from '~/components';

export default {
	title: 'Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Input>;

export const Default = () => {
	const [value, setValue] = useState('');

	return (
		<div
			style={{
				width: 400,
				display: 'flex',
				flexWrap: 'wrap',
				gap: 8,
			}}
		>
			<Input
				placeholder="Type something..."
				size="sm"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				name="test"
			/>
			<Button size="sm">sm</Button>
			<Input
				placeholder="Type something..."
				size="md"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				name="test1"
			/>
			<Button size="md">md</Button>
			<Input
				placeholder="Type something..."
				size="lg"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				name="test2"
			/>
			<Button size="lg">lg</Button>
		</div>
	);
};

export const Standard = () => (
	<Input placeholder="Type something..." variant="standard" />
);

export const Large = () => (
	<Input placeholder="Type something..." variant="outlined" size="lg" />
);

export const SmallWithError = () => (
	<Input placeholder="Type something..." variant="outlined" error size="sm" />
);

export const Disabled = () => (
	<Input
		placeholder="Type something..."
		variant="outlined"
		disabled
		fullWidth
	/>
);

export const WithAdornment = () => (
	<Input
		placeholder="Type something..."
		variant="outlined"
		startAdornment={<span>💡</span>}
		endAdornment={<span>🔍</span>}
	/>
);
