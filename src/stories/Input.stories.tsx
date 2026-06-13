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
				size="small"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				name="test"
			/>
			<Button size="small">small</Button>
			<Input
				placeholder="Type something..."
				size="medium"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				name="test1"
			/>
			<Button size="medium">medium</Button>
			<Input
				placeholder="Type something..."
				size="large"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				name="test2"
			/>
			<Button size="large">large</Button>
		</div>
	);
};

export const Standard = () => (
	<Input placeholder="Type something..." variant="standard" />
);

export const Large = () => (
	<Input placeholder="Type something..." variant="outlined" size="large" />
);

export const SmallWithError = () => (
	<Input
		placeholder="Type something..."
		variant="outlined"
		error
		size="small"
	/>
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
