import { List } from '@radix-ui/react-tabs';
import { clsx } from 'clsx';
import { listClass } from './styles.css';

export type TabsListProps = React.ComponentPropsWithoutRef<typeof List>;
export const TabsList = ({ className, ...props }: TabsListProps) => (
	<List className={clsx(listClass, className)} {...props} />
);
