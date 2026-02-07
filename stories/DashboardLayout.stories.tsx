import type { Meta } from 'storybook-react-rsbuild';
import {
	Button,
	DashboardLayout,
	PageLayout,
	useDashboard,
} from '~/components';

export default {
	title: 'DashboardLayout',
	component: DashboardLayout,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DashboardLayout>;

const Toggler = () => {
	const { togglePinned } = useDashboard();
	return <Button onClick={togglePinned}>Toggle</Button>;
};

export const Example = () => {
	return (
		<div style={{ width: '100%', height: '100svh' }}>
			<DashboardLayout>
				<DashboardLayout.Sidebar
					header={<div> header </div>}
					content={<div> content </div>}
					footer={<div> footer </div>}
				/>
				<DashboardLayout.Main>
					<PageLayout>
						<PageLayout.Header title={'Dashboard'} />
						<PageLayout.Content>
							<Toggler />
						</PageLayout.Content>
					</PageLayout>
				</DashboardLayout.Main>
			</DashboardLayout>
		</div>
	);
};
