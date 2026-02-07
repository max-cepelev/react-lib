import { Content, type TabsContentProps } from '@radix-ui/react-tabs';
import { clsx } from 'clsx';
import { contentClass } from './styles.css';

export type ContentProps = React.ComponentPropsWithoutRef<typeof Content>;

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
	<Content className={clsx(contentClass, className)} {...props} />
);
