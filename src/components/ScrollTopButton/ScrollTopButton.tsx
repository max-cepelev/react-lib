import { clsx } from 'clsx';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, type ButtonProps } from '../Button';
import * as styles from './styles.css';

type ScrollTopButtonProps = ButtonProps;
export function ScrollTopButton({
	onClick,
	variant = 'outline',
	...props
}: ScrollTopButtonProps) {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 400) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<Button
			type="button"
			variant={variant}
			className={clsx(styles.button, {
				[styles.visible]: isVisible,
			})}
			onClick={onClick || scrollToTop}
			{...props}
		>
			<ChevronUp />
		</Button>
	);
}
