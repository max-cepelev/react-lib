import { SlashIcon } from 'lucide-react';
import type { Meta } from 'storybook-react-rsbuild';
import { Breadcrumb, Button, DropdownMenu } from '~/components';

export default {
	title: 'Breadcrumb',
	component: Breadcrumb,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export function Basic() {
	return (
		<Breadcrumb>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb>
	);
}

export function WithEllipsis() {
	return (
		<Breadcrumb>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<DropdownMenu>
						<DropdownMenu.Trigger
							render={
								<Button
									size="iconSmall"
									variant="ghost"
									aria-label="Toggle breadcrumb menu"
								/>
							}
						>
							<Breadcrumb.Ellipsis />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start">
							<DropdownMenu.Group>
								<DropdownMenu.Item>Documentation</DropdownMenu.Item>
								<DropdownMenu.Item>Themes</DropdownMenu.Item>
								<DropdownMenu.Item>GitHub</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb>
	);
}

export function CustomSeparator() {
	return (
		<Breadcrumb>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator>
					<SlashIcon />
				</Breadcrumb.Separator>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#">Components</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator>
					<SlashIcon />
				</Breadcrumb.Separator>
				<Breadcrumb.Item>
					<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb>
	);
}

export function RenderPropLink() {
	return (
		<Breadcrumb>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link render={<a href="#home">Home</a>} />
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Current page</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb>
	);
}
