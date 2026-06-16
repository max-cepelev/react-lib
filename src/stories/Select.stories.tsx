import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Select } from '~/components';

const fruits = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'blueberry', label: 'Blueberry' },
	{ value: 'grapes', label: 'Grapes' },
	{ value: 'pineapple', label: 'Pineapple' },
] as const;

const roles = [
	{ value: 'owner', label: 'Owner' },
	{ value: 'admin', label: 'Admin' },
	{ value: 'editor', label: 'Editor' },
	{ value: 'analyst', label: 'Analyst' },
	{ value: 'billing', label: 'Billing' },
] as const;

export default {
	title: 'Select',
	component: Select,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Select>;

function FruitItems() {
	return (
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			{fruits.map((fruit) => (
				<Select.Item key={fruit.value} value={fruit.value}>
					{fruit.label}
				</Select.Item>
			))}
		</Select.Group>
	);
}

export function Demo() {
	return (
		<Select>
			<Select.Trigger style={{ width: '180px' }}>
				<Select.Value placeholder="Select a fruit" />
			</Select.Trigger>
			<Select.Content style={{ width: '180px' }}>
				<FruitItems />
			</Select.Content>
		</Select>
	);
}

export function Sizes() {
	return (
		<div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
			{(['small', 'medium', 'large'] as const).map((size) => (
				<Select key={size}>
					<Select.Trigger size={size} style={{ width: 280 }}>
						<Select.Value placeholder="Select a fruit" />
					</Select.Trigger>
					<Select.Content>
						<FruitItems />
					</Select.Content>
				</Select>
			))}
		</div>
	);
}

export function Multiple() {
	return (
		<Select multiple defaultValue={['apple', 'grapes']} items={fruits}>
			<Select.Trigger style={{ width: '220px' }}>
				<Select.Value placeholder="Select fruits" />
			</Select.Trigger>
			<Select.Content style={{ width: '220px' }}>
				<FruitItems />
			</Select.Content>
		</Select>
	);
}

export function MultipleOverflow() {
	return (
		<Select
			multiple
			defaultValue={['apple', 'banana', 'blueberry', 'grapes', 'pineapple']}
			items={fruits}
		>
			<Select.Trigger style={{ width: '220px' }}>
				<Select.Value placeholder="Select fruits" />
			</Select.Trigger>
			<Select.Content style={{ width: '220px' }}>
				<FruitItems />
			</Select.Content>
		</Select>
	);
}

export function MultipleControlled() {
	const [value, setValue] = useState<string[]>(['admin', 'editor']);

	return (
		<Select multiple value={value} onValueChange={setValue} items={roles}>
			<Select.Trigger style={{ width: '260px' }}>
				<Select.Value placeholder="Select roles" />
			</Select.Trigger>
			<Select.Content style={{ width: '260px' }}>
				<Select.Group>
					<Select.Label>Workspace roles</Select.Label>
					{roles.map((role) => (
						<Select.Item key={role.value} value={role.value}>
							{role.label}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select>
	);
}

export function Scrollable() {
	return (
		<Select>
			<Select.Trigger style={{ width: '280px' }}>
				<Select.Value placeholder="Select a timezone" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>North America</Select.Label>
					<Select.Item value="est">Eastern Standard Time (EST)</Select.Item>
					<Select.Item value="cst">Central Standard Time (CST)</Select.Item>
					<Select.Item value="mst">Mountain Standard Time (MST)</Select.Item>
					<Select.Item value="pst">Pacific Standard Time (PST)</Select.Item>
					<Select.Item value="akst">Alaska Standard Time (AKST)</Select.Item>
					<Select.Item value="hst">Hawaii Standard Time (HST)</Select.Item>
				</Select.Group>
				<Select.Group>
					<Select.Label>Europe & Africa</Select.Label>
					<Select.Item value="gmt">Greenwich Mean Time (GMT)</Select.Item>
					<Select.Item value="cet">Central European Time (CET)</Select.Item>
					<Select.Item value="eet">Eastern European Time (EET)</Select.Item>
					<Select.Item value="west">
						Western European Summer Time (WEST)
					</Select.Item>
					<Select.Item value="cat">Central Africa Time (CAT)</Select.Item>
					<Select.Item value="eat">East Africa Time (EAT)</Select.Item>
				</Select.Group>
				<Select.Group>
					<Select.Label>Asia</Select.Label>
					<Select.Item value="msk">Moscow Time (MSK)</Select.Item>
					<Select.Item value="ist">India Standard Time (IST)</Select.Item>
					<Select.Item value="cst_china">China Standard Time (CST)</Select.Item>
					<Select.Item value="jst">Japan Standard Time (JST)</Select.Item>
					<Select.Item value="kst">Korea Standard Time (KST)</Select.Item>
					<Select.Item value="ist_indonesia">
						Indonesia Central Standard Time (WITA)
					</Select.Item>
				</Select.Group>
				<Select.Group>
					<Select.Label>Australia & Pacific</Select.Label>
					<Select.Item value="awst">
						Australian Western Standard Time (AWST)
					</Select.Item>
					<Select.Item value="acst">
						Australian Central Standard Time (ACST)
					</Select.Item>
					<Select.Item value="aest">
						Australian Eastern Standard Time (AEST)
					</Select.Item>
					<Select.Item value="nzst">
						New Zealand Standard Time (NZST)
					</Select.Item>
					<Select.Item value="fjt">Fiji Time (FJT)</Select.Item>
				</Select.Group>
				<Select.Group>
					<Select.Label>South America</Select.Label>
					<Select.Item value="art">Argentina Time (ART)</Select.Item>
					<Select.Item value="bot">Bolivia Time (BOT)</Select.Item>
					<Select.Item value="brt">Brasilia Time (BRT)</Select.Item>
					<Select.Item value="clt">Chile Standard Time (CLT)</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select>
	);
}
