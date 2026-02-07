// Accordion.tsx
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as styles from './accordion.css';

type Props = {
	summary: React.ReactNode;
	children: React.ReactNode;
	isOpen: boolean;
	onToggle: () => void;
	duration?: number;
	easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
	className?: string;
};

export function Accordion({
	summary,
	children,
	isOpen,
	onToggle,
	className,
	duration = 250,
	easing = 'ease',
}: Props) {
	const contentRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<Animation | null>(null);
	const [internalOpen, setInternalOpen] = useState(isOpen);

	// запускаем анимацию при каждом изменении isOpen
	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		animationRef.current?.cancel();

		if (isOpen) {
			setInternalOpen(true);
			requestAnimationFrame(() => {
				const h = content.scrollHeight;
				content.style.height = '0px';
				content.style.overflow = 'hidden';
				animationRef.current = content.animate(
					[
						{
							height: 0,
							opacity: 0,
						},
						{
							height: `${h}px`,
							opacity: 1,
						},
					],
					{ duration, easing, fill: 'forwards' },
				);
				animationRef.current.onfinish = () => {
					content.style.height = 'auto';
					content.style.overflow = 'visible';
				};
			});
		} else {
			const h = content.scrollHeight;
			content.style.height = `${h}px`;
			content.style.overflow = 'hidden';
			// reflow
			content.offsetHeight;
			animationRef.current = content.animate(
				[
					{
						height: `${h}px`,
						opacity: 1,
					},
					{
						height: '0px',
						opacity: 0,
					},
				],
				{ duration, easing, fill: 'forwards' },
			);

			animationRef.current.onfinish = () => {
				content.style.height = 'auto';
				content.style.overflow = 'visible';
				setInternalOpen(false);
			};
		}
	}, [isOpen, duration, easing]);

	return (
		<details open={internalOpen} className={clsx(styles.details, className)}>
			{/** biome-ignore lint/a11y/noStaticElementInteractions: <> */}
			<summary
				className={styles.summary}
				onClick={(e) => {
					e.preventDefault();
					onToggle();
				}}
			>
				{summary}
				<ChevronDown
					size={20}
					className={clsx(styles.chevron, { [styles.open]: isOpen })}
				/>
			</summary>
			<div ref={contentRef} className={styles.content}>
				{children}
			</div>
		</details>
	);
}
