/** biome-ignore-all lint/a11y/noStaticElementInteractions: <> */
import type React from 'react';
import { useEffect, useState } from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import { DataList, Typography } from '~/components';

/**
 * ### DataList предназначен для отображения списка различного вида карточек с поддержкой infinity scroll и виртуализацией списка
 * Компонент также обрабатывает несколько состояний: загрузка, отсутствие данных и ошибка
 */
export default {
	title: 'DataList',
	component: DataList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DataList>;

type MockData = {
	id: string;
	title: string;
	organization?: string;
};

const generateData = (length = 16): MockData[] => {
	return Array.from({ length }).map((_, i) => ({
		id: 'frtq-rrtt',
		title: `Договор на оказание услуг №${i + 1}`,
		organization: 'ООО "Рога и копыта"',
	}));
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div style={{ height: '240px', width: '500px', fontFamily: 'inherit' }}>
		{children}
	</div>
);

export const Example = () => {
	const [loading, setLoading] = useState(true);
	const [slicedData, setSlicedData] = useState<MockData[]>([]);
	const [isEndReached, setIsEndReached] = useState(false);

	const TOTAL_COUNT = 40;

	const data = generateData();

	useEffect(() => {
		setTimeout(() => {
			setSlicedData(data.slice(0, 10));
			setLoading(false);
		}, 1500);
	}, [data]);

	useEffect(() => {
		if (slicedData.length >= TOTAL_COUNT) {
			setIsEndReached(true);
		}
	}, [slicedData]);

	const incrementData = () => {
		setLoading(true);

		setTimeout(() => {
			setSlicedData((prevData) => [...prevData, ...generateData(10)]);
			setLoading(false);
		}, 1500);
	};

	const handleClick = (itemIndex: number) =>
		alert(`Clicked item with index ${itemIndex}`);

	return (
		<Container>
			<DataList
				keyId="id"
				data={slicedData}
				onEndReached={incrementData}
				isEndReached={isEndReached}
				isLoading={loading}
				itemContent={({ title, organization }, { index, className }) => (
					<div
						className={className}
						onKeyDown={() => handleClick(index)}
						onClick={() => handleClick(index)}
					>
						<Typography>{title}</Typography>
						<Typography color="secondary">{organization}</Typography>
					</div>
				)}
				onRetry={incrementData}
			/>
		</Container>
	);
};

export const NoData = () => {
	const handleClick = (itemIndex: number) =>
		alert(`Clicked item with index ${itemIndex}`);

	return (
		<Container>
			<DataList<MockData>
				keyId="id"
				data={[]}
				itemContent={({ title, organization }, { index, className }) => (
					<div
						className={className}
						onKeyDown={() => handleClick(index)}
						onClick={() => handleClick(index)}
					>
						<Typography>{title}</Typography>
						<Typography color="secondary">{organization}</Typography>
					</div>
				)}
				onRetry={() => undefined}
			/>
		</Container>
	);
};

export const LoadingWithData = () => {
	const data = generateData();

	const handleClick = (itemIndex: number) =>
		alert(`Clicked item with index ${itemIndex}`);

	return (
		<Container>
			<DataList
				keyId="id"
				data={data}
				isLoading
				itemContent={({ title, organization }, { index, className }) => (
					<div
						className={className}
						onKeyDown={() => handleClick(index)}
						onClick={() => handleClick(index)}
					>
						<Typography>{title}</Typography>
						<Typography color="secondary">{organization}</Typography>
					</div>
				)}
				onRetry={() => undefined}
			/>
		</Container>
	);
};

export const ErrorWithData = () => {
	const data = generateData();

	const handleClick = (itemIndex: number) =>
		alert(`Clicked item with index ${itemIndex}`);

	const handleRetry = () => alert('Повторить запрос');

	return (
		<Container>
			<DataList
				keyId="id"
				data={data}
				isError
				itemContent={({ title, organization }, { index, className }) => (
					<button
						type="button"
						className={className}
						onKeyDown={() => handleClick(index)}
						onClick={() => handleClick(index)}
					>
						<Typography>{title}</Typography>
						<Typography color="secondary">{organization}</Typography>
					</button>
				)}
				onRetry={handleRetry}
			/>
		</Container>
	);
};

export const Loading = () => {
	const handleClick = (itemIndex: number) =>
		alert(`Clicked item with index ${itemIndex}`);

	return (
		<Container>
			<DataList<MockData>
				keyId="id"
				data={[]}
				isLoading
				itemContent={({ title, organization }, { index, className }) => (
					<div
						className={className}
						onKeyDown={() => handleClick(index)}
						onClick={() => handleClick(index)}
					>
						<Typography>{title}</Typography>
						<Typography color="secondary">{organization}</Typography>
					</div>
				)}
				onRetry={() => undefined}
			/>
		</Container>
	);
};

export const ErrorState = () => {
	const handleClick = (itemIndex: number) =>
		alert(`Clicked item with index ${itemIndex}`);

	const handleRetry = () => alert('Повторить запрос');

	return (
		<Container>
			<DataList<MockData>
				keyId="id"
				data={[]}
				isError
				errorState={{
					title: 'Произошла ошибка',
					errorList: ['Ошибка 500'],
					onRetry: handleRetry,
				}}
				itemContent={({ title, organization }, { index, className }) => (
					<div
						className={className}
						onKeyDown={() => handleClick(index)}
						onClick={() => handleClick(index)}
					>
						<Typography>{title}</Typography>
						<Typography color="secondary">{organization}</Typography>
					</div>
				)}
				onRetry={handleRetry}
			/>
		</Container>
	);
};
