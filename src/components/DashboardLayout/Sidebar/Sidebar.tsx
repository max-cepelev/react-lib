import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import { useDashboard } from '../hooks';
import { SIDEBAR_WIDTH } from './constants';
import {
	contentClass,
	footerClass,
	headerClass,
	rootClass,
	triggerClass,
	unpinnedClass,
	wrapperClass,
} from './styles.css';

export type SidebarProps = {
	width?: CSSProperties['width'];
	collapsedWidth?: CSSProperties['width'];
	header?: React.ReactNode;
	footer?: React.ReactNode;
	content: React.ReactNode;
	// groups?: React.ReactNode[];
	className?: string;
};
export const Sidebar = ({
	width = SIDEBAR_WIDTH,
	header,
	footer,
	content,
	// groups,
	className,
}: SidebarProps) => {
	const { pinned } = useDashboard();
	return (
		<div style={{ width: pinned ? width : 0 }} className={wrapperClass}>
			<span className={triggerClass} />
			<aside
				style={{ width }}
				className={clsx(rootClass, { [unpinnedClass]: !pinned }, className)}
			>
				{header && <header className={headerClass}>{header}</header>}
				<div className={contentClass}>{content}</div>
				{footer && <footer className={footerClass}>{footer}</footer>}
			</aside>
		</div>
	);
};
