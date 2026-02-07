import { Trash } from 'lucide-react';
import type { Meta } from 'storybook-react-rsbuild';
import { Button, ConfirmAction } from '~/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'ConfirmAction',
	component: ConfirmAction,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ConfirmAction>;

export const Example = () => {
	return (
		<ConfirmAction
			actionComponent={(props) => (
				<Button variant="outline" size="icon" {...props}>
					<Trash />
				</Button>
			)}
			onConfirm={() => alert('Delete')}
		/>
	);
};

/**
 * Пропс `text` позволяет добавить поясняющий текст
 */
export const WithText = () => {
	return (
		<ConfirmAction
			text="Уверены, что хотите отменить запрос на подписание?"
			confirmButtonProps={{
				text: 'Да, отменить запрос',
			}}
			actionComponent={(props) => (
				<Button variant="destructive" size="icon" {...props}>
					<Trash />
				</Button>
			)}
			onConfirm={() => alert('Delete')}
		/>
	);
};

/**
 * При осуществлении важных действий, например при удалении, можно добавить акцент кнопке подтверждения
 */
export const AccentedConfirmationButton = () => {
	return (
		<ConfirmAction
			text="Если вы удалите черновик, то черновик с такими же данными нужно будет создать заново. Удалить черновик из списка?"
			confirmButtonProps={{
				text: 'Да, удалить',
				isAccented: true,
			}}
			actionComponent={(props) => (
				<Button variant="outline" size="icon" {...props}>
					<Trash />
				</Button>
			)}
			onConfirm={() => alert('Delete')}
		/>
	);
};

export const PopoverProps = () => {
	return (
		<ConfirmAction
			actionComponent={(props) => (
				<Button variant="outline" size="icon" {...props}>
					<Trash />
				</Button>
			)}
			popoverProps={{
				side: 'top',
				align: 'start',
			}}
			onConfirm={() => alert('Delete')}
		/>
	);
};
