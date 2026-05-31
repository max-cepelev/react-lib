import type { Meta } from 'storybook-react-rsbuild';
import { OverflowTypography } from '~/components';

const LONG_TEXT =
	'Очень длинное название документа с номером договора, датой, городом и дополнительным описанием, которое не помещается в доступную ширину';
const FILE_NAME =
	'quarterly-financial-report-with-adjustments-and-comments-2026-final.xlsx';

export default {
	title: 'OverflowTypography',
	component: OverflowTypography,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} as Meta<typeof OverflowTypography>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			gap: 16,
			width: 320,
		}}
	>
		{children}
	</div>
);

export const Basic = () => (
	<Wrapper>
		<OverflowTypography>{LONG_TEXT}</OverflowTypography>
		<OverflowTypography>Короткий текст</OverflowTypography>
	</Wrapper>
);

export const RowsCount = () => (
	<Wrapper>
		<OverflowTypography rowsCount={2}>{LONG_TEXT}</OverflowTypography>
		<OverflowTypography rowsCount={3}>{LONG_TEXT}</OverflowTypography>
	</Wrapper>
);

export const VisibleLastSymbols = () => (
	<Wrapper>
		<OverflowTypography visibleLastSymbolsCount={10}>
			{FILE_NAME}
		</OverflowTypography>
		<OverflowTypography align="center" visibleLastSymbolsCount={8}>
			{FILE_NAME}
		</OverflowTypography>
		<OverflowTypography align="right" visibleLastSymbolsCount={8}>
			{FILE_NAME}
		</OverflowTypography>
	</Wrapper>
);

export const TextProp = () => (
	<Wrapper>
		<OverflowTypography text={LONG_TEXT} />
		<OverflowTypography
			text={FILE_NAME}
			tooltipProps={{ side: 'bottom', arrow: true }}
			visibleLastSymbolsCount={12}
		/>
	</Wrapper>
);

export const TooltipProps = () => (
	<Wrapper>
		<OverflowTypography
			tooltipProps={{
				arrow: true,
				content: <span>Кастомный контент tooltip</span>,
				side: 'bottom',
			}}
		>
			{LONG_TEXT}
		</OverflowTypography>
	</Wrapper>
);
