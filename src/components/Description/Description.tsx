import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { DESCRIPTION_ROOT_CLASSNAME } from './constants';
import { DescriptionContextProvider } from './DescriptionContext';
import { Name } from './Name';
import { directions, justify, wrapper } from './styles.css';
import { useLogic } from './useLogic';
import { Value } from './Value';

export type DescriptionProps = {
	/**
	 * Элементы Description.Name и Description.Value
	 */
	children: ReactNode;

	/**
	 * Позиционирует элементы либо по разным краям, либо по левому краю
	 */
	justifyContent?: 'spaceBetween' | 'start';

	/**
	 * Добавляет dashed разделитель, заполняющего свободное пространство между Name Value
	 */
	leader?: boolean;

	/**
	 * Определяет разделитель между Name Value
	 * @default ':'
	 */
	separator?: string;

	/**
	 * Определяет тип корневого HTML-элемента
	 */
	component?: 'div' | 'dl';

	/**
	 * Определяет перенос строк
	 * @default 'default'
	 */
	direction?: 'column' | 'row';

	className?: string;
};

export const Description = (props: DescriptionProps) => {
	const { descriptionContextProviderProps, direction } = useLogic(props);

	const {
		justifyContent = 'start',
		component: Component = 'dl',
		children,
		leader = false,
		className,
	} = props;

	return (
		<DescriptionContextProvider
			leader={leader}
			direction={direction}
			{...descriptionContextProviderProps}
		>
			<Component
				className={clsx(
					wrapper,
					directions[direction],
					justify[justifyContent],
					DESCRIPTION_ROOT_CLASSNAME,
					className,
				)}
			>
				{children}
			</Component>
		</DescriptionContextProvider>
	);
};

Description.Name = Name;
Description.Value = Value;
