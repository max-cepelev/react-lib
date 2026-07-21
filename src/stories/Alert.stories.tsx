import { useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { Alert, Button } from '~/components';

const meta: Meta<typeof Alert> = {
	title: 'Alert',
	component: Alert,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div style={{ width: 'min(42rem, calc(100vw - 2rem))' }}>
				<Story />
			</div>
		),
	],
};

export default meta;

export function Severities() {
	return (
		<div style={{ display: 'grid', gap: '0.75rem' }}>
			<Alert severity="info" title="Информация">
				Формирование счёта может занять до 15 минут.
			</Alert>
			<Alert severity="success" title="Готово">
				Счёт сформирован и доступен для скачивания.
			</Alert>
			<Alert severity="warning" title="Обратите внимание">
				Проверьте реквизиты перед отправкой.
			</Alert>
			<Alert severity="error" title="Не удалось сформировать счёт">
				Повторите попытку или обратитесь в поддержку.
			</Alert>
		</div>
	);
}

export function WithActions() {
	return (
		<Alert
			severity="warning"
			title="Срок оплаты истекает сегодня"
			actions={
				<>
					<Button size="small">Оплатить</Button>
					<Button size="small" variant="ghost">
						Подробнее
					</Button>
				</>
			}
		>
			После полуночи ссылка на оплату станет недоступна.
		</Alert>
	);
}

export function Dismissible() {
	const [display, setDisplay] = useState(true);

	return (
		<div style={{ display: 'grid', gap: '0.75rem' }}>
			<Button
				size="small"
				variant="outline"
				onClick={() => setDisplay(true)}
				disabled={display}
			>
				Показать Alert
			</Button>
			<Alert
				display={display}
				onClose={() => setDisplay(false)}
				title="Настройки сохранены"
				severity="success"
			>
				Изменения уже применены.
			</Alert>
		</div>
	);
}
