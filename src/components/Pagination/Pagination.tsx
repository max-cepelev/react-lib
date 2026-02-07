import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import { Button } from '../Button';
import type { ButtonSize } from '../Button/types';
import { ellipsisSpan, paginationContainer } from './styles.css';
import { useLogic } from './useLogic';

type Props = {
	onPageChange: (page: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	className?: string;
	size?: ButtonSize;
};

export function Pagination(props: Props) {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		size = 'icon',
	} = props;

	const paginationRange = useLogic({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	const lastPage = paginationRange.at(-1);
	return (
		<nav className={paginationContainer}>
			<Button
				variant="ghost"
				size={size}
				onClick={onPrevious}
				disabled={currentPage === 1}
			>
				<ChevronLeft />
			</Button>
			{paginationRange?.map((pageNumber, index) => {
				if (!pageNumber) {
					return (
						<span className={ellipsisSpan}>
							<Ellipsis />
						</span>
					);
				}
				return (
					<Button
						key={`${pageNumber}${index.toString()}`}
						size={size}
						variant={pageNumber === currentPage ? 'default' : 'outline'}
						onClick={() => onPageChange(+pageNumber)}
					>
						{pageNumber}
					</Button>
				);
			})}
			<Button
				variant="ghost"
				size={size}
				onClick={onNext}
				disabled={currentPage === lastPage}
			>
				<ChevronRight />
			</Button>
		</nav>
	);
}
