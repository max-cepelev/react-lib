import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { MaskField } from '~/components';

export default {
	title: 'MaskField',
	component: MaskField,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof MaskField>;

export const Default = () => {
	const [value, setValue] = useState('');
	return (
		<MaskField
			value={value}
			onChange={(e) => setValue(e.target.value)}
			label="Phone"
			maskProps={{
				mask: '+7 (___) ___-__-__',
				replacement: { _: /\d/ },
				showMask: true,
			}}
		/>
	);
};
