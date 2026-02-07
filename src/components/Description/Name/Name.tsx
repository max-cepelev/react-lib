import { clsx } from 'clsx';
import { useContext } from 'react';
import { Typography, type TypographyProps } from '../../Typography';
import { DescriptionContext } from '../DescriptionContext';
import * as styles from './styles.css';

export type NameProps = Pick<TypographyProps, 'color' | 'variant' | 'children'>;

export const Name = ({
	children,
	color = 'secondary',
	...props
}: NameProps) => {
	const { leader, separator } = useContext(DescriptionContext);

	return (
		<>
			<dt className={clsx(styles.wrapper, { [styles.leader]: leader })}>
				<Typography {...props} color={color}>
					{children}
					{!leader && separator}
				</Typography>
			</dt>
			{leader && <div className={styles.dashedSeparator} />}
		</>
	);
};
