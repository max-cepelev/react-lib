import { createChangeEventDetails } from '@base-ui/react/internals/createBaseUIEventDetails';
import { REASONS } from '@base-ui/react/internals/reasons';
import {
	resolveSelectedLabel,
	stringifyAsLabel,
} from '@base-ui/react/internals/resolveValueLabel';
import type { Select as SelectPrimitive } from '@base-ui/react/select';
import {
	createContext,
	type MouseEvent,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import type { SelectProps } from '../types';

type SelectContextValue = {
	disabled: boolean;
	getLabel: (value: unknown) => ReactNode;
	multiple: boolean;
	removeValue: (value: unknown, event: MouseEvent<HTMLButtonElement>) => void;
	value: unknown;
};

const SelectContext = createContext<SelectContextValue | null>(null);

function getInitialValue<Value, Multiple extends boolean | undefined>({
	defaultValue,
	multiple,
}: Pick<SelectProps.Root<Value, Multiple>, 'defaultValue' | 'multiple'>) {
	if (defaultValue !== undefined) return defaultValue;
	return multiple ? [] : null;
}

export function getValueKey(value: unknown) {
	return stringifyAsLabel(value);
}

export function useSelectContext() {
	const context = useContext(SelectContext);

	if (!context) {
		throw new Error('useSelectContext must be used within a <Select />');
	}

	return context;
}

export function useRootLogic<
	Value = string,
	Multiple extends boolean | undefined = false,
>({
	defaultValue,
	disabled = false,
	isItemEqualToValue,
	itemToStringLabel,
	items,
	multiple,
	onValueChange,
	value: valueProp,
}: SelectProps.Root<Value, Multiple>) {
	const isControlled = valueProp !== undefined;
	const [internalValue, setInternalValue] = useState<unknown>(() =>
		getInitialValue({ defaultValue, multiple }),
	);
	const value = isControlled ? valueProp : internalValue;

	const handleValueChange = useCallback(
		(
			nextValue: unknown,
			eventDetails: SelectPrimitive.Root.ChangeEventDetails,
		) => {
			if (!isControlled) {
				setInternalValue(nextValue);
			}

			onValueChange?.(
				nextValue as Parameters<NonNullable<typeof onValueChange>>[0],
				eventDetails,
			);
		},
		[isControlled, onValueChange],
	);

	const contextValue = useMemo<SelectContextValue>(
		() => ({
			disabled,
			getLabel: (itemValue) =>
				resolveSelectedLabel(itemValue, items, itemToStringLabel),
			multiple: Boolean(multiple),
			removeValue: (itemValue, event) => {
				event.preventDefault();
				event.stopPropagation();

				const currentValue = Array.isArray(value) ? value : [];
				const nextValue = currentValue.filter((selectedValue) => {
					const isEqual = isItemEqualToValue ?? Object.is;
					return !isEqual(itemValue as Value, selectedValue as Value);
				});

				handleValueChange(
					nextValue,
					createChangeEventDetails(
						REASONS.chipRemovePress,
						event.nativeEvent,
						event.currentTarget,
					),
				);
			},
			value,
		}),
		[
			disabled,
			handleValueChange,
			isItemEqualToValue,
			itemToStringLabel,
			items,
			multiple,
			value,
		],
	);

	return {
		contextValue,
		handleValueChange,
		value,
	};
}

export function useChipsValueLogic(values: unknown[]) {
	const { getLabel } = useSelectContext();
	const containerRef = useRef<HTMLSpanElement | null>(null);
	const measureRef = useRef<HTMLSpanElement | null>(null);
	const overflowMeasureRef = useRef<HTMLSpanElement | null>(null);
	const [visibleCount, setVisibleCount] = useState(values.length);

	const updateVisibleCount = useCallback(() => {
		const container = containerRef.current;
		const measure = measureRef.current;
		const overflowMeasure = overflowMeasureRef.current;

		if (!container || !measure || !overflowMeasure) return;

		const chipElements = Array.from(
			measure.querySelectorAll<HTMLElement>('[data-chip-measure="chip"]'),
		);
		const stylesDeclaration = window.getComputedStyle(measure);
		const gap = Number.parseFloat(stylesDeclaration.columnGap || '0') || 0;
		const availableWidth = container.clientWidth;
		const chipWidths = chipElements.map((element) => element.offsetWidth);
		const totalWidth = chipWidths.reduce(
			(total, width, index) => total + width + (index > 0 ? gap : 0),
			0,
		);

		if (totalWidth <= availableWidth) {
			setVisibleCount(values.length);
			return;
		}

		const overflowWidth = overflowMeasure.offsetWidth;
		const availableForChips = Math.max(0, availableWidth - overflowWidth - gap);
		let nextVisibleCount = 0;
		let usedWidth = 0;

		for (const chipWidth of chipWidths) {
			const nextWidth =
				usedWidth + chipWidth + (nextVisibleCount > 0 ? gap : 0);

			if (nextWidth > availableForChips) {
				break;
			}

			usedWidth = nextWidth;
			nextVisibleCount += 1;
		}

		setVisibleCount(nextVisibleCount);
	}, [values.length]);

	useLayoutEffect(() => {
		updateVisibleCount();
	}, [updateVisibleCount]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container || typeof ResizeObserver === 'undefined') return;

		const observer = new ResizeObserver(updateVisibleCount);
		observer.observe(container);

		return () => observer.disconnect();
	}, [updateVisibleCount]);

	return {
		containerRef,
		getLabel,
		hiddenCount: Math.max(0, values.length - visibleCount),
		measureRef,
		overflowMeasureRef,
		visibleValues: values.slice(0, visibleCount),
	};
}

export { SelectContext };
