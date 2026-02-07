import { Button } from '../../Button';
import { CircularProgress } from '../../CircularProgress';
import { Placeholder } from '../../Placeholder';
import type { DataGridState } from '../types';
import { container, loader } from './styles.css';

export function State({
	isLoading,
	isEmpty,
	columnsLength,
	emptyState = {
		text: 'Нет данных',
	},
	errorState = {
		text: 'Произошла ошибка',
	},
	isError,
	onRetry,
}: {
	isLoading?: boolean;
	isEmpty?: boolean;
	isError?: boolean;
	columnsLength: number;
	errorState?: DataGridState;
	emptyState?: DataGridState;
	onRetry?: () => void;
}) {
	const Container = ({ children }: { children: React.ReactNode }) => (
		<tr className={container}>
			<td colSpan={columnsLength} align="center">
				{children}
			</td>
		</tr>
	);

	if (isLoading) {
		return (
			<Container>
				<span className={loader}>
					<CircularProgress />
				</span>
			</Container>
		);
	}

	if (isEmpty) {
		const { imgSrc, imgAlt, text } = emptyState;
		return (
			<Container>
				<Placeholder title={text} imgSrc={imgSrc} imgAlt={imgAlt} />
			</Container>
		);
	}

	if (isError) {
		const { imgSrc, imgAlt, text } = errorState;
		return (
			<Container>
				<Placeholder
					title={text}
					imgSrc={imgSrc}
					imgAlt={imgAlt}
					actions={
						onRetry ? (
							<Button variant="outline" onClick={onRetry}>
								Попробовать снова
							</Button>
						) : undefined
					}
				/>
			</Container>
		);
	}

	return null;
}
