# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm build` - Build the library using Rslib
- `pnpm dev` - Start development server with hot reload
- `pnpm preview` - Preview the built library

### Storybook (Component Development)
- `pnpm storybook` - Run Storybook dev server on port 6006
- `pnpm build:storybook` - Build Storybook for production

### Code Quality
- `pnpm lint` - Run Biome linter and formatter checks
- `pnpm lint:fix` - Auto-fix linting and formatting issues
- `pnpm lint:types` - Run TypeScript type checking without emitting files

## Architecture Overview

This is a React component library (`@max-ts/kit`) built with modern tooling for React v19. The library uses a design system approach with comprehensive theming and styling.

### Key Technologies
- **Build Tool**: Rslib (Rsbuild-based) for library bundling
- **Styling**: Vanilla Extract CSS-in-TypeScript for type-safe styling
- **Component Development**: Storybook for component documentation and testing
- **Code Quality**: Biome for linting and formatting
- **UI Primitives**: Base UI is preferred for new accessible primitives; Radix UI is still present for existing components
- **Forms**: React Hook Form integration with custom form components

### Project Structure

- `src/components/` - All UI components, each in its own folder with:
  - Component TypeScript file
  - Vanilla Extract styles (`.css.ts`)
  - Type definitions
  - Index file for exports
- `src/theme/` - Global design system tokens and CSS variables
- `src/form/` - Form-specific components and React Hook Form utilities
- `src/utils.ts` - Shared utility functions (spacing, sizing helpers)
- `stories/` - Storybook stories for each component
- `lib/` - Build output directory

### Design System

The library uses a comprehensive design system defined in `src/theme/theme.css.ts`:
- **Colors**: Primary, secondary, semantic colors (error, success, warning, info)
- **Spacing**: Consistent spacing scale (1-20 in rem units)
- **Typography**: Font sizes, weights, and line heights
- **Elevation**: Box shadow definitions for depth
- **Border Radius**: Consistent corner radius values

### Component Architecture

Components follow a consistent pattern:
1. TypeScript component with typed props extending the underlying primitive or HTML element props
2. Vanilla Extract styles with theme integration
3. Compound components expose subparts as static properties on the root component, e.g. `DropdownMenu.Trigger`
4. Base UI composition uses the standard `render` prop; do not add or preserve Radix-style `asChild`
5. Consistent size and variant prop patterns
6. Full TypeScript support with exported types

### Path Aliases

The project uses TypeScript path mapping:
- `~/components` → `src/components/index.ts`
- `~/form` → `src/form/index.ts`
- `~/utils` → `src/utils.ts`
- `~/theme` → `src/theme/index.ts`

### Build Configuration

- **Entry Point**: `src/index.ts` exports all components, form utilities, and theme
- **Output**: ESM format with TypeScript declarations
- **CSS**: Separate CSS bundle (`styles.css`) for easy import
- **Bundle**: Single bundled output for distribution

### Component Categories

- **Layout**: DashboardLayout, PageLayout, Card
- **Data Display**: DataGrid, DataList, Carousel, Typography, Badge
- **Input/Forms**: Input, TextField, Select, Checkbox, RadioGroup, DatePicker, etc.
- **Feedback**: Dialog, Tooltip, CircularProgress, ContentState
- **Navigation**: Breadcrumb, Tabs, Pagination, Accordion
- **Actions**: Button, ButtonGroup, ToggleGroup, ConfirmAction

### Creating New Components

When creating a new component, follow this structure:

1. **Create component folder** in `src/components/ComponentName/`
2. **Component file** (`ComponentName.tsx`):
   - Import primitive components from Base UI when wrapping accessible UI behavior
   - Import styles as a namespace: `import * as styles from './styles.css'`
   - Import props from `./types` when the component has several parts or complex prop types
   - Define the root component as a named `function ComponentName(...)`
   - Define compound subcomponents as short internal function names (`Trigger`, `Content`, `Item`) and attach them to the root (`ComponentName.Trigger = Trigger`)
   - Export the root component only for compound components (`export { ComponentName }`) instead of exporting each part as a separate top-level component
   - Use Base UI's `render` prop for element replacement/composition; do not introduce `asChild`
   - Use `data-slot` attributes on root and subparts for traceability and styling hooks
   - Use `data-*` attributes for local state/variant flags (`data-inset`, `data-variant`) instead of class toggles such as `{ inset }`
   - Merge classes directly with `clsx(styles.part, className)`; do not add custom className merge helpers unless there is a demonstrated need
3. **Styles file** (`componentName.css.ts` or `styles.css.ts`):
   - Use Vanilla Extract's `style()` and `styleVariants()` functions
   - Reference theme tokens: `theme.colors`, `theme.spacing`, `theme.fontSize`, etc.
   - Use `spacing()` and `negativeSpacing()` helpers from `~/utils` for dynamic spacing
4. **Types file** (`types.ts`) - use a namespace for component props when component has multiple parts:
   - Import primitive types from the concrete Base UI package, e.g. `import type { Menu } from '@base-ui/react/menu'`
   - Export `ComponentNameProps` as a namespace
   - Mirror each subpart with a type alias, e.g. `ComponentNameProps.Root`, `ComponentNameProps.Trigger`, `ComponentNameProps.Content`
   - Compose popup/content props from both popup and positioner props when needed, e.g. `Menu.Popup.Props & Pick<Menu.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>`
5. **Index file** (`index.ts`) - export the public component API; for compound components this is usually the root component and any public types, not every subpart as a top-level export
6. **Storybook story** in `stories/ComponentName.stories.tsx`
7. **Export component** in `src/components/index.ts`

Example component structure:
```typescript
// ComponentName.tsx
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { clsx } from 'clsx';
import * as styles from './styles.css';
import type { ComponentNameProps } from './types';

function ComponentName({ ...props }: ComponentNameProps.Root) {
  return <MenuPrimitive.Root data-slot="component-name" {...props} />;
}

function Trigger({ ...props }: ComponentNameProps.Trigger) {
  return <MenuPrimitive.Trigger data-slot="component-name-trigger" {...props} />;
}

function Content({ className, ...props }: ComponentNameProps.Content) {
  return (
    <MenuPrimitive.Popup
      data-slot="component-name-content"
      className={clsx(styles.content, className)}
      {...props}
    />
  );
}

ComponentName.Trigger = Trigger;
ComponentName.Content = Content;

export { ComponentName };
```

```typescript
// types.ts
import type { Menu } from '@base-ui/react/menu';

export namespace ComponentNameProps {
  export type Root = Menu.Root.Props;
  export type Trigger = Menu.Trigger.Props;
  export type Content = Menu.Popup.Props;
}
```

```typescript
// styles.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { theme } from '~/theme';
import { spacing } from '~/utils';

const base = style({
  padding: spacing(2, 4),
  borderRadius: theme.borderRadius.md,
  fontSize: theme.fontSize.base,
  color: theme.colors.text.primary,
});
```

When working with this codebase:
- Always use theme tokens instead of hardcoded values
- Use `spacing()` and `negativeSpacing()` from `~/utils` for padding/margins
- Follow the component folder structure pattern
- Ensure TypeScript types are properly exported
- Add corresponding Storybook stories for new components
- For compound components, stories should import only the root component and use the static API (`ComponentName.Trigger`, `ComponentName.Content`, etc.)
- Storybook examples should cover meaningful subparts and states, not only the simplest open/closed case
- Use Vanilla Extract for styling to maintain type safety

### Vanilla Extract Styling Rules

**CRITICAL**: Vanilla Extract has strict selector rules:
- **DO NOT** use child element selectors in `style()` selectors, e.g. `& a`, `& p`, `& > div`
- **DO** use `globalStyle()` for styling child elements within a component
- Selectors in `style()` must target the `&` character (current class) with modifiers only, e.g. `&:hover`, `&:focus-visible`, `&[data-state="open"]`
- For child element styling, use `globalStyle(\`${parentClass} child\`, { ... })` instead of `selectors: { '& child': { ... } }`

Example:
```typescript
// ❌ WRONG - will cause build error
const content = style({
  selectors: {
    '& a': { color: 'blue' },  // Invalid!
    '& p:not(:last-child)': { marginBottom: '1rem' }  // Invalid!
  }
});

// ✅ CORRECT - use globalStyle for child elements
const content = style({
  padding: spacing(2),
});

globalStyle(`${content} a`, {
  color: theme.colors.primary,
});

globalStyle(`${content} p:not(:last-child)`, {
  marginBottom: spacing(4),
});
```
