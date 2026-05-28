import type { Meta } from 'storybook-react-rsbuild';
import { Description } from '~/components';

export default {
	title: 'Description',
	component: Description,
} as Meta<typeof Description>;

export const Interaction = {
	args: {
		children: (
			<>
				<Description.Name>Название поля</Description.Name>
				<Description.Value>Значение поля</Description.Value>
			</>
		),
	},
	parameters: {
		options: { showPanel: true },
		docs: {
			disable: true,
		},
	},
};

const GridWrapper = ({
	gap,
	children,
}: {
	gap: number;
	children: React.ReactNode;
}) => {
	return (
		<div
			style={{
				display: 'grid',
				gap: gap,
			}}
		>
			{children}
		</div>
	);
};

export const Example = () => {
	return (
		<GridWrapper gap={3}>
			<Description>
				<Description.Name>ИНН</Description.Name>
				<Description.Value>295995231495</Description.Value>
			</Description>
			<Description>
				<Description.Name>Описание</Description.Name>
				<Description.Value>
					ИНН физического лица является последовательностью из 12 цифр
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const CanCopy = () => {
	return (
		<GridWrapper gap={3}>
			<Description>
				<Description.Name>КПП</Description.Name>
				<Description.Value canCopy>293144576</Description.Value>
			</Description>
		</GridWrapper>
	);
};

/**
 * По дефолту copyPosition="right", можно задать "left"
 */
export const CopyPosition = () => {
	return (
		<GridWrapper gap={3}>
			<Description>
				<Description.Name>КПП</Description.Name>
				<Description.Value canCopy>293144576</Description.Value>
			</Description>
			<Description>
				<Description.Name>Снилс</Description.Name>
				<Description.Value canCopy copyPosition="left">
					23339576886
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

/**
 * Prop ```leader``` добавляет dashed строку
 */
export const Leader = () => {
	return (
		<GridWrapper gap={3}>
			<Description leader>
				<Description.Name>ФИО</Description.Name>
				<Description.Value>Швецова М. Д.</Description.Value>
			</Description>
			<Description leader>
				<Description.Name>ФИО</Description.Name>
				<Description.Value>Швецова Мария Дмитриевна</Description.Value>
			</Description>
		</GridWrapper>
	);
};

/**
 * Prop ```direction``` определяет как располагаются Name и Value.
 * Так же изменяет расположение для мобильных устройств.
 * ```default``` значение указывает на позиционирование row для больших экранов и column для мобильных устройств
 *
 */
export const Direction = () => {
	return (
		<GridWrapper gap={3}>
			<Description direction="row">
				<Description.Name>ИНН</Description.Name>
				<Description.Value>295995231495</Description.Value>
			</Description>
			<Description direction="column">
				<Description.Name>Описание</Description.Name>
				<Description.Value>
					ИНН физического лица является последовательностью из 12 цифр
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const JustifyContent = () => {
	return (
		<GridWrapper gap={3}>
			<Description justifyContent="spaceBetween">
				<Description.Name>ФИО</Description.Name>
				<Description.Value>Швецова М. Д.</Description.Value>
			</Description>
			<Description justifyContent="spaceBetween">
				<Description.Name>ФИО</Description.Name>
				<Description.Value>Швецова Мария Дмитриевна</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const JustifyContentCanCopy = () => {
	return (
		<GridWrapper gap={3}>
			<Description justifyContent="spaceBetween">
				<Description.Name>ИНН</Description.Name>
				<Description.Value canCopy>295995231495</Description.Value>
			</Description>
			<Description justifyContent="spaceBetween">
				<Description.Name>Описание</Description.Name>
				<Description.Value canCopy copyPosition="left">
					ИНН физического лица является последовательностью из 12 цифр
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const LongLabelValue = () => {
	return (
		<GridWrapper gap={4}>
			<Description>
				<Description.Name>Описания ИНН юридического лица</Description.Name>
				<Description.Value>
					ИНН юридического лица — последовательность из 10 арабских цифр
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Описания ИНН юридического лица</Description.Name>
				<Description.Value>
					ИНН юридического лица — последовательность из 10 арабских цифр
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const LongDescriptionValueLeader = () => {
	return (
		<GridWrapper gap={3}>
			<Description leader>
				<Description.Name>Описания ИНН юридического лица</Description.Name>
				<Description.Value>
					ИНН юридического лица — последовательность из 10 арабских цифр
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

/**
 * По дефолту component="dl", можно задать "div", при построении списков и наличии внешнего контейнера из dl
 */
export const DescriptionList = () => {
	return (
		<GridWrapper gap={3}>
			<dl>
				<Description component="div">
					<Description.Name>ИНН</Description.Name>
					<Description.Value>295995231495</Description.Value>
				</Description>
				<Description component="div">
					<Description.Name>КПП</Description.Name>
					<Description.Value>293144576</Description.Value>
				</Description>
			</dl>
		</GridWrapper>
	);
};

/**
 * В случаях при длинном значении Value и коротком значении Name,
 * следует ограничить ширину Name через css и переносить его на несколько строк
 */
export const ShortLabelWithLongValue = () => {
	return (
		<GridWrapper gap={3}>
			<Description leader>
				<Description.Name>Полное именование</Description.Name>
				<Description.Value>
					_тест_ОАО "Тестовое коммерческое профессиональное учреждение
					Специальное управление службы №007 Министерство Внутренней Разработки
					по делам тестирования, исправления, чрезвычайным ситуациям и
					ликвидации последствии действия багов"
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const Colors = () => {
	return (
		<GridWrapper gap={3}>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value color="primary">
					Значение показателя
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value color="warning">
					Значение показателя
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value color="error">Значение показателя</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value color="success">
					Значение показателя
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value color="primary">
					Значение показателя
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const ColorsCanCopy = () => {
	return (
		<GridWrapper gap={3}>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value canCopy color="info">
					Значение показателя
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value canCopy color="warning">
					Значение показателя
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value canCopy color="error">
					Значение показателя
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value canCopy color="success">
					Значение показателя
				</Description.Value>
			</Description>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value canCopy color="primary">
					Значение показателя
				</Description.Value>
			</Description>
		</GridWrapper>
	);
};

export const EmptyValue = () => {
	return (
		<GridWrapper gap={3}>
			<Description>
				<Description.Name>Название показателя</Description.Name>
				<Description.Value />
			</Description>
		</GridWrapper>
	);
};
