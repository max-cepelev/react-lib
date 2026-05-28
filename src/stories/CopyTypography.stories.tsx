import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { CopyTypography, Typography } from '~/components';

export default {
	title: 'CopyTypography',
	component: CopyTypography,
} satisfies Meta<typeof CopyTypography>;

export const Interaction: StoryObj<typeof CopyTypography> = {
	args: {
		children: <Typography>Швецова М. Д.</Typography>,
		copyText: 'Швецова М. Д.',
	},
	parameters: {
		docs: {
			disable: true,
		},
	},
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				gap: '4px',
				width: '100%',
			}}
		>
			{children}
		</div>
	);
};

const OverflowWrapper = ({ children }: { children: React.ReactNode }) => (
	<div style={{ width: '150px' }}>{children}</div>
);

export const Example = () => {
	return (
		<Wrapper>
			<CopyTypography>Швецова М. Д.</CopyTypography>
		</Wrapper>
	);
};

/**
 * prop `copyPosition` определяет расположение иконки(справа/слева от текста). По умолчанию справа
 */
export const CopyPosition = () => {
	return (
		<Wrapper>
			<CopyTypography>Швецова М. Д.</CopyTypography>
			<CopyTypography copyPosition="left">Швецова М. Д.</CopyTypography>
		</Wrapper>
	);
};

/**
 * prop `copyText` указывает какой текст необходимо скопировать в буфер обмена.
 * Необходим для копирования текста вложенных компонентов или когда копируемое содержимое
 * должно отличаться от представления.
 */
export const CopyText = () => {
	return (
		<Wrapper>
			<CopyTypography copyText="Швецова Мария Дмитриевна">
				Швецова М. Д.
			</CopyTypography>
			<CopyTypography copyText="Швецова М. Д.">
				<Typography>Швецова М. Д.</Typography>
			</CopyTypography>
		</Wrapper>
	);
};

/**
 * prop `isShowCopyText` показывает в тултипе текст, который будет скопирован.
 * Необходимо отключать тултип у вложенных компонентов, при их наличии, для избежания их наложения
 */
export const IsShowCopyText = () => {
	return (
		<OverflowWrapper>
			<CopyTypography copyText="Швецова Мария Дмитриевна" isShowCopyText>
				<Typography>Швецова Мария Дмитриевна</Typography>
			</CopyTypography>
		</OverflowWrapper>
	);
};
