import { useMemo } from 'react';

interface UsePaginationProps {
	totalCount: number;
	pageSize: number;
	siblingCount?: number;
	currentPage: number;
}

export const DOTS = '...';

const range = (start: number, end: number): number[] => {
	const length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

export const useLogic = ({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}: UsePaginationProps): (number | null)[] => {
	const paginationRange = useMemo(() => {
		if (pageSize <= 0 || totalCount <= 0) return [];

		const totalPageCount = Math.ceil(totalCount / pageSize);
		const totalPageNumbersToShow = siblingCount + 5;

		// Показываем все страницы
		if (totalPageNumbersToShow >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSibling = Math.max(currentPage - siblingCount, 1);
		const rightSibling = Math.min(currentPage + siblingCount, totalPageCount);

		const showLeftDots = leftSibling > 2;
		const showRightDots = rightSibling < totalPageCount - 2;

		const firstPage = 1;
		const lastPage = totalPageCount;

		if (!showLeftDots && showRightDots) {
			const visiblePageCountBeforeDots = 3 + 2 * siblingCount;
			const leftRange = range(1, visiblePageCountBeforeDots);
			return [...leftRange, null, totalPageCount];
		}

		if (showLeftDots && !showRightDots) {
			const visiblePageCountAfterDots = 3 + 2 * siblingCount;
			const rightRange = range(
				totalPageCount - visiblePageCountAfterDots + 1,
				totalPageCount,
			);
			return [firstPage, null, ...rightRange];
		}

		if (showLeftDots && showRightDots) {
			const middleRange = range(leftSibling, rightSibling);
			return [firstPage, null, ...middleRange, null, lastPage];
		}

		return [];
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};
