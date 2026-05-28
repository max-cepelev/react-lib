import { toast } from 'sonner';

export class Notification {
	private readonly service;
	constructor(sonner: typeof toast) {
		this.service = sonner;
	}

	public message(title: string, message?: string) {
		return this.service.message(title, {
			description: message,
		});
	}

	public success = (title: string) => this.service.success(title);

	public error = (title: string) => this.service.error(title);

	public info = (title: string) => this.service.info(title);

	public warning = (title: string) => this.service.warning(title);

	public loading = (title: string) => this.service.loading(title);

	public dismiss = (id?: string | number | undefined) =>
		this.service.dismiss(id);

	public custom = (node: React.ReactNode) => this.service(node);

	public action = ({
		title,
		buttonLabel,
		onClick,
	}: {
		title: string;
		buttonLabel: string;
		onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	}) =>
		this.service(title, {
			action: {
				label: buttonLabel,
				onClick,
			},
		});
}

export const notification = new Notification(toast);
