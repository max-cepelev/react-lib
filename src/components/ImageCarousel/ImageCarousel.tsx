import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as styles from './styles.css';

type ImageCarouselProps = {
	images: { src: string; alt: string }[];
	autoPlay?: boolean;
	interval?: number;
};

export const ImageCarousel = ({
	images = [],
	autoPlay = false,
	interval = 5000,
}: ImageCarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1,
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	// Автоматическое перелистывание слайдов
	useEffect(() => {
		if (!autoPlay) return;

		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1,
			);
		}, interval);

		return () => clearInterval(timer);
	}, [autoPlay, images.length, interval]);

	if (images.length === 0) {
		return (
			<div className={styles.carousel}>Нет изображений для отображения</div>
		);
	}

	return (
		<div className={styles.carousel}>
			<div
				className={styles.carouselInner}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{images.map((image, index) => (
					<div className={styles.slide} key={image.src}>
						<img
							src={image.src}
							alt={image.alt || `Slide ${index + 1}`}
							className={styles.image}
						/>
					</div>
				))}
			</div>

			{images.length > 1 && (
				<>
					<button
						type="button"
						className={clsx(styles.arrow, styles.arrowLeft)}
						onClick={goToPrevious}
					>
						<ChevronLeft size={24} />
					</button>
					<button
						type="button"
						className={clsx(styles.arrow, styles.arrowRight)}
						onClick={goToNext}
					>
						<ChevronRight size={24} />
					</button>
					<div className={styles.indicators}>
						{images.map(({ src }, index) => (
							<button
								type="button"
								key={src}
								className={`${styles.indicator} ${currentIndex === index ? 'active' : ''}`}
								onClick={() => goToSlide(index)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};
