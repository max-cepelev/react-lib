import type { Meta } from 'storybook-react-rsbuild';
import { Pagination } from '~/components';

export default {
	title: 'Pagination',
	component: Pagination,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof Pagination>;

export function Demo() {
	return (
		<Pagination
			onPageChange={(page) => console.log(page)}
			totalCount={150}
			currentPage={6}
			pageSize={15}
		/>
	);
}
