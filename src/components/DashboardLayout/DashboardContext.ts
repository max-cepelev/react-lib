import { createContext } from 'react';

export const DashboardContext = createContext<{
	pinned?: boolean;
	hovered?: boolean;
	togglePinned: () => void;
}>({ pinned: true, hovered: false, togglePinned: () => {} });
