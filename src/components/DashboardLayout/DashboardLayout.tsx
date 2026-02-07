import { clsx } from 'clsx';
import { DashboardContext } from './DashboardContext';
import { useLogic } from './hooks';
import { Main } from './Main';
import { Sidebar } from './Sidebar';
import { containerClass } from './styles.css';

export type DashboardLayoutProps = {
	children: React.ReactNode;
	className?: string;
};
export const DashboardLayout = ({
	children,
	className,
}: DashboardLayoutProps) => {
	const { pinned, togglePinned } = useLogic();
	return (
		<DashboardContext.Provider value={{ pinned, togglePinned }}>
			<div className={clsx(containerClass, className)}>{children}</div>
		</DashboardContext.Provider>
	);
};

DashboardLayout.Sidebar = Sidebar;
DashboardLayout.Main = Main;
