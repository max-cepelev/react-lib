import {
	AudioWaveformIcon,
	BadgeCheckIcon,
	BarChart3Icon,
	BellIcon,
	BookOpenIcon,
	BotIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	ChevronsUpDownIcon,
	CircleHelpIcon,
	CommandIcon,
	CreditCardIcon,
	FolderIcon,
	ForwardIcon,
	FrameIcon,
	GalleryVerticalEndIcon,
	HomeIcon,
	InboxIcon,
	LogOutIcon,
	MapIcon,
	MoreHorizontalIcon,
	PieChartIcon,
	PlusIcon,
	SearchIcon,
	Settings2Icon,
	SettingsIcon,
	SparklesIcon,
	SquareTerminalIcon,
	Trash2Icon,
	UsersIcon,
} from 'lucide-react';
import * as React from 'react';
import type { Meta } from 'storybook-react-rsbuild';
import {
	Avatar,
	Badge,
	Button,
	Collapsible,
	DropdownMenu,
	Sidebar,
	useSidebar,
} from '~/components';
import * as demoStyles from './sidebarDemo.css';

export default {
	title: 'Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

const navItems = [
	{ title: 'Home', icon: HomeIcon, active: true, badge: null },
	{ title: 'Inbox', icon: InboxIcon, active: false, badge: '12' },
	{ title: 'Projects', icon: FolderIcon, active: false, badge: null },
	{ title: 'Customers', icon: UsersIcon, active: false, badge: null },
	{ title: 'Reports', icon: BarChart3Icon, active: false, badge: null },
];

function AppSidebar({
	variant = 'sidebar',
	collapsible = 'offcanvas',
	side = 'left',
}: Pick<
	React.ComponentProps<typeof Sidebar>,
	'variant' | 'collapsible' | 'side'
>) {
	return (
		<Sidebar variant={variant} collapsible={collapsible} side={side}>
			<Sidebar.Header>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton size="lg" tooltip="Acme Workspace">
							<div
								className={demoStyles.simpleBrandIcon}
								style={{
									display: 'grid',
									width: 28,
									height: 28,
									placeItems: 'center',
									borderRadius: 6,
									background: 'oklch(0.27 0 0)',
									color: '#fff',
									fontWeight: 700,
								}}
							>
								A
							</div>
							<span className={demoStyles.simpleBrandText}>Acme Workspace</span>
							<ChevronDownIcon className={demoStyles.simpleBrandChevron} />
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
				<Sidebar.Input
					className={demoStyles.simpleSearch}
					placeholder="Search"
					startAdornment={<SearchIcon />}
				/>
			</Sidebar.Header>
			<Sidebar.Separator />
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
					<Sidebar.GroupAction aria-label="Help">
						<CircleHelpIcon />
					</Sidebar.GroupAction>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{navItems.map((item) => (
								<Sidebar.MenuItem key={item.title}>
									<Sidebar.MenuButton
										render={(props) => (
											<a {...props} href="/">
												{props.children}
											</a>
										)}
										isActive={item.active}
										tooltip={item.title}
									>
										<item.icon />
										<span>{item.title}</span>
									</Sidebar.MenuButton>
									{item.badge && (
										<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
									)}
									<Sidebar.MenuAction
										showOnHover
										aria-label={`More ${item.title}`}
									>
										<MoreHorizontalIcon />
									</Sidebar.MenuAction>
								</Sidebar.MenuItem>
							))}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									<FolderIcon />
									<span>Design System</span>
								</Sidebar.MenuButton>
								<Sidebar.MenuSub>
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton
											isActive
											render={(props) => (
												<a {...props} href="/">
													{props.children}
												</a>
											)}
										>
											<span>Components</span>
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton
											render={(props) => (
												<a {...props} href="/">
													{props.children}
												</a>
											)}
										>
											<span>Tokens</span>
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								</Sidebar.MenuSub>
							</Sidebar.MenuItem>
							<Sidebar.MenuSkeleton showIcon />
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
			<Sidebar.Footer>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton tooltip="Notifications">
							<BellIcon />
							<span>Notifications</span>
							<Badge variant="secondary">3</Badge>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							<SettingsIcon />
							<span>Settings</span>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Footer>
			<Sidebar.Rail />
		</Sidebar>
	);
}

function Shell({
	defaultOpen = true,
	variant,
	collapsible,
	side,
}: {
	defaultOpen?: boolean;
	variant?: React.ComponentProps<typeof Sidebar>['variant'];
	collapsible?: React.ComponentProps<typeof Sidebar>['collapsible'];
	side?: React.ComponentProps<typeof Sidebar>['side'];
}) {
	return (
		<Sidebar.Provider defaultOpen={defaultOpen}>
			<AppSidebar variant={variant} collapsible={collapsible} side={side} />
			<Sidebar.Inset>
				<header
					style={{
						display: 'flex',
						height: 56,
						alignItems: 'center',
						gap: 8,
						borderBottom: '1px solid oklch(0.92 0 0)',
						padding: '0 16px',
					}}
				>
					<Sidebar.Trigger />
					<strong>Dashboard</strong>
					<Button size="sm" variant="outline" style={{ marginLeft: 'auto' }}>
						Create
					</Button>
				</header>
				<main
					style={{
						display: 'grid',
						gap: 16,
						padding: 16,
					}}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
							gap: 16,
						}}
					>
						{['Revenue', 'Active users', 'Open tickets'].map((label) => (
							<section
								key={label}
								style={{
									minHeight: 120,
									border: '1px solid oklch(0.92 0 0)',
									borderRadius: 8,
									padding: 16,
									background: '#fff',
								}}
							>
								<strong>{label}</strong>
							</section>
						))}
					</div>
					<section
						style={{
							minHeight: 280,
							border: '1px solid oklch(0.92 0 0)',
							borderRadius: 8,
							background: '#fff',
						}}
					/>
				</main>
			</Sidebar.Inset>
		</Sidebar.Provider>
	);
}

export function Default() {
	return <Shell />;
}

export function CollapsedIcon() {
	return <Shell defaultOpen={false} collapsible="icon" />;
}

export function FloatingRight() {
	return <Shell variant="floating" collapsible="icon" side="right" />;
}

const demoData = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEndIcon,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveformIcon,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: CommandIcon,
			plan: 'Free',
		},
	],
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: SquareTerminalIcon,
			isActive: true,
			items: [
				{ title: 'History', url: '#' },
				{ title: 'Starred', url: '#' },
				{ title: 'Settings', url: '#' },
			],
		},
		{
			title: 'Models',
			url: '#',
			icon: BotIcon,
			items: [
				{ title: 'Genesis', url: '#' },
				{ title: 'Explorer', url: '#' },
				{ title: 'Quantum', url: '#' },
			],
		},
		{
			title: 'Documentation',
			url: '#',
			icon: BookOpenIcon,
			items: [
				{ title: 'Introduction', url: '#' },
				{ title: 'Get Started', url: '#' },
				{ title: 'Tutorials', url: '#' },
				{ title: 'Changelog', url: '#' },
			],
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2Icon,
			items: [
				{ title: 'General', url: '#' },
				{ title: 'Team', url: '#' },
				{ title: 'Billing', url: '#' },
				{ title: 'Limits', url: '#' },
			],
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: FrameIcon,
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChartIcon,
		},
		{
			name: 'Travel',
			url: '#',
			icon: MapIcon,
		},
	],
};

function DemoLink({
	href,
	children,
	onClick,
	...props
}: React.ComponentProps<'a'>) {
	return (
		<a
			{...props}
			href={href}
			onClick={(event) => {
				onClick?.(event);
				event.preventDefault();
			}}
		>
			{children}
		</a>
	);
}

function TeamSwitcher({
	teams,
}: {
	teams: {
		name: string;
		logo: React.ElementType;
		plan: string;
	}[];
}) {
	const { isMobile } = useSidebar();
	const [activeTeam, setActiveTeam] = React.useState(teams[0]);

	if (!activeTeam) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Sidebar.MenuButton size="lg" />}>
				<div className={demoStyles.workspaceIcon}>
					<activeTeam.logo />
				</div>
				<div className={demoStyles.textStack}>
					<span className={demoStyles.titleText}>{activeTeam.name}</span>
					<span className={demoStyles.subtitleText}>{activeTeam.plan}</span>
				</div>
				<ChevronsUpDownIcon className={demoStyles.chevronAuto} />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				className={demoStyles.dropdownWide}
				align="start"
				side={isMobile ? 'bottom' : 'right'}
				sideOffset={4}
			>
				<DropdownMenu.Group>
					<DropdownMenu.Label className={demoStyles.dropdownLabelMuted}>
						Teams
					</DropdownMenu.Label>
					{teams.map((team, index) => (
						<DropdownMenu.Item
							key={team.name}
							onClick={() => setActiveTeam(team)}
							className={demoStyles.dropdownItemPadded}
						>
							<div className={demoStyles.workspaceIconSmall}>
								<team.logo />
							</div>
							{team.name}
							<DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item className={demoStyles.dropdownItemPadded}>
						<div className={demoStyles.workspaceIconSmall}>
							<PlusIcon />
						</div>
						<div className={demoStyles.dropdownLabelMuted}>Add team</div>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
}

function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: React.ElementType;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<Sidebar.Group>
			<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						defaultOpen={item.isActive}
						className={demoStyles.collapsibleItem}
					>
						<Sidebar.MenuItem>
							<Collapsible.Trigger
								render={<Sidebar.MenuButton tooltip={item.title} />}
							>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
								<ChevronRightIcon className={demoStyles.collapsibleChevron} />
							</Collapsible.Trigger>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{item.items?.map((subItem) => (
										<Sidebar.MenuSubItem key={subItem.title}>
											<Sidebar.MenuSubButton
												render={
													<DemoLink href={subItem.url}>
														<span>{subItem.title}</span>
													</DemoLink>
												}
											/>
										</Sidebar.MenuSubItem>
									))}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						</Sidebar.MenuItem>
					</Collapsible>
				))}
			</Sidebar.Menu>
		</Sidebar.Group>
	);
}

function NavProjects({
	projects,
}: {
	projects: {
		name: string;
		url: string;
		icon: React.ElementType;
	}[];
}) {
	const { isMobile } = useSidebar();

	return (
		<Sidebar.Group className={demoStyles.projectsGroup}>
			<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{projects.map((item) => (
					<Sidebar.MenuItem key={item.name}>
						<Sidebar.MenuButton
							render={
								<DemoLink href={item.url}>
									<item.icon />
									<span>{item.name}</span>
								</DemoLink>
							}
						/>
						<DropdownMenu>
							<DropdownMenu.Trigger render={<Sidebar.MenuAction showOnHover />}>
								<MoreHorizontalIcon />
								<span className={demoStyles.srOnly}>More</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content
								className={demoStyles.dropdownWide}
								side={isMobile ? 'bottom' : 'right'}
								align={isMobile ? 'end' : 'start'}
							>
								<DropdownMenu.Item>
									<FolderIcon className={demoStyles.mutedIcon} />
									<span>View Project</span>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<ForwardIcon className={demoStyles.mutedIcon} />
									<span>Share Project</span>
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<Trash2Icon className={demoStyles.mutedIcon} />
									<span>Delete Project</span>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
					</Sidebar.MenuItem>
				))}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton className={demoStyles.mutedMenuButton}>
						<MoreHorizontalIcon />
						<span>More</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>
	);
}

function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger render={<Sidebar.MenuButton size="lg" />}>
				<Avatar className={demoStyles.avatarSquare}>
					<Avatar.Image src={user.avatar} alt={user.name} />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar>
				<div className={demoStyles.textStack}>
					<span className={demoStyles.titleText}>{user.name}</span>
					<span className={demoStyles.subtitleText}>{user.email}</span>
				</div>
				<ChevronsUpDownIcon className={demoStyles.chevronAuto} />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				className={demoStyles.dropdownWide}
				side={isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Group>
					<DropdownMenu.Label className={demoStyles.dropdownUserLabel}>
						<div className={demoStyles.dropdownUserRow}>
							<Avatar className={demoStyles.avatarSquare}>
								<Avatar.Image src={user.avatar} alt={user.name} />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar>
							<div className={demoStyles.textStack}>
								<span className={demoStyles.titleText}>{user.name}</span>
								<span className={demoStyles.subtitleText}>{user.email}</span>
							</div>
						</div>
					</DropdownMenu.Label>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<SparklesIcon />
						Upgrade to Pro
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<BadgeCheckIcon />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CreditCardIcon />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<BellIcon />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<LogOutIcon />
						Log out
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
}

function ShadcnDemoAppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar.Provider>
			<Sidebar collapsible="icon" {...props}>
				<Sidebar.Header>
					<TeamSwitcher teams={demoData.teams} />
				</Sidebar.Header>
				<Sidebar.Content>
					<NavMain items={demoData.navMain} />
					<NavProjects projects={demoData.projects} />
				</Sidebar.Content>
				<Sidebar.Footer>
					<NavUser user={demoData.user} />
				</Sidebar.Footer>
				<Sidebar.Rail />
			</Sidebar>
			<Sidebar.Inset>
				<header className={demoStyles.appHeader}>
					<div className={demoStyles.headerInner}>
						<Sidebar.Trigger className={demoStyles.triggerNudge} />
					</div>
				</header>
				<main className={demoStyles.insetBody}>
					<section className={demoStyles.insetPanel} />
				</main>
			</Sidebar.Inset>
		</Sidebar.Provider>
	);
}

export function ShadcnDemo() {
	return <ShadcnDemoAppSidebar />;
}
