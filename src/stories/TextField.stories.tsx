import type { Meta } from 'storybook-react-rsbuild';
import { TextField } from '~/components';

export default {
	title: 'TextField',
	component: TextField,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof TextField>;

export const Default = () => (
	<TextField
		label="Default Label"
		placeholder="Type something..."
		helperText="This is helper text"
		variant="outlined"
		required
	/>
);

export const WithError = () => (
	<TextField
		label="Error Label"
		placeholder="Type something..."
		helperText="This is an error message"
		variant="outlined"
		required
		error
	/>
);

export const Disabled = () => (
	<TextField
		label="Disabled Label"
		placeholder="Type something..."
		helperText="Field is disabled"
		variant="outlined"
		disabled
		fullWidth
	/>
);

export const WithAdornment = () => (
	<TextField
		label="Adornment Label"
		placeholder="Type something..."
		helperText="This is helper text with adornments"
		variant="outlined"
		startAdornment={<span>💡</span>}
		endAdornment={<span>🔍</span>}
	/>
);
