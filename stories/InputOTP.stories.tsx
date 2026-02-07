import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';

import { InputOTP } from '~/components';

export default {
	title: 'InputOTP',
	component: InputOTP,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof InputOTP>;

export const Primary = () => {
	const [code, setCode] = useState('');
	return <InputOTP maxLength={6} value={code} onChange={setCode} />;
};
