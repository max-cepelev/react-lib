import { ContentState, type ContentStateProps } from '../../ContentState';
import { Empty } from '../../Empty';
import type { DataGridEmptyState } from '../types';
import { cell, container, stateImage } from './styles.css';

export function State({
	isLoading,
	isEmpty,
	columnsLength,
	emptyState = {
		text: 'Нет данных',
	},
	errorState = {
		message: 'Произошла ошибка',
	},
	isError,
}: {
	isLoading?: boolean;
	isEmpty?: boolean;
	isError?: boolean;
	columnsLength: number;
	errorState?: ContentStateProps.ErrorState;
	emptyState?: DataGridEmptyState;
}) {
	const Container = ({ children }: { children: React.ReactNode }) => (
		<tr className={container}>
			<td className={cell} colSpan={columnsLength}>
				{children}
			</td>
		</tr>
	);

	if (isLoading) {
		return (
			<Container>
				<ContentState isLoading>{null}</ContentState>
			</Container>
		);
	}

	if (isEmpty) {
		const { imgSrc, imgAlt, text, actions } = emptyState;
		return (
			<Container>
				<Empty>
					<Empty.Header>
						{imgSrc && (
							<Empty.Media>
								<img className={stateImage} src={imgSrc} alt={imgAlt ?? ''} />
							</Empty.Media>
						)}
						<Empty.Title>{text}</Empty.Title>
					</Empty.Header>
					{actions && <Empty.Content>{actions}</Empty.Content>}
				</Empty>
			</Container>
		);
	}

	if (isError) {
		return (
			<Container>
				<ContentState isError errorState={errorState}>
					{null}
				</ContentState>
			</Container>
		);
	}

	return null;
}
