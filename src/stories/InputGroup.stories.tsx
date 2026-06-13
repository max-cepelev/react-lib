import { SearchIcon, SendIcon } from 'lucide-react';
import type { Meta } from 'storybook-react-rsbuild';
import { InputGroup } from '~/components';

export default {
	title: 'InputGroup',
	component: InputGroup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof InputGroup>;

export function WithInlineAddons() {
	return (
		<InputGroup style={{ width: 360 }}>
			<InputGroup.Addon align="inline-start">
				<SearchIcon />
			</InputGroup.Addon>
			<InputGroup.Input placeholder="Search..." />
			<InputGroup.Addon align="inline-end">
				<InputGroup.Button
					size="iconExtraSmall"
					variant="ghost"
					aria-label="Submit"
				>
					<SendIcon />
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup>
	);
}

export function WithTextAddon() {
	return (
		<InputGroup style={{ width: 360 }}>
			<InputGroup.Addon align="inline-start">
				<InputGroup.Text>https://</InputGroup.Text>
			</InputGroup.Addon>
			<InputGroup.Input placeholder="example.com" />
		</InputGroup>
	);
}

export function WithTextarea() {
	return (
		<InputGroup style={{ width: 360 }}>
			<InputGroup.Textarea placeholder="Write a message..." />
			<InputGroup.Addon align="block-end">
				<InputGroup.Button size="small">Send</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup>
	);
}
