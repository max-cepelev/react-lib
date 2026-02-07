import clsx from 'clsx';
import { circle, colors, root, svg, variants } from './styles.css';

type CircularProgressProps = {
	size?: number; // px
	thickness?: number; // px
	color?: 'primary' | 'secondary' | 'inherit';
	value?: number; // 0–100 (только для determinate)
	variant?: 'indeterminate' | 'determinate';
	className?: string;
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
	size = 30,
	thickness = 2.6,
	color = 'primary',
	value = 0,
	variant = 'indeterminate',
	className,
}) => {
	const radius = (size - thickness) / 2;
	const circumference = 2 * Math.PI * radius;
	const dashOffset =
		variant === 'determinate'
			? circumference * (1 - value / 100)
			: circumference * 0.25;

	return (
		<div
			className={clsx(root, variants[variant], colors[color], className)}
			style={{ width: size, height: size }}
		>
			<svg className={svg} viewBox={`0 0 ${size} ${size}`}>
				<title>Progress bar</title>
				<circle
					className={clsx(
						circle,
						variant === 'determinate' && variants.determinate,
					)}
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					strokeWidth={thickness}
					strokeDasharray={circumference}
					strokeDashoffset={dashOffset}
				/>
			</svg>
		</div>
	);
};
