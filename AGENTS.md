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
- **UI Primitives**: Radix UI for accessible base components
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
1. TypeScript component with typed props extending HTML element props
2. Vanilla Extract styles with theme integration
3. Support for `asChild` pattern via Radix Slot when applicable
4. Consistent size and variant prop patterns
5. Full TypeScript support with exported types

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
- **Navigation**: Tabs, Pagination, Accordion
- **Actions**: Button, ButtonGroup, ConfirmAction

### Creating New Components

When creating a new component, follow this structure:

1. **Create component folder** in `src/components/ComponentName/`
2. **Component file** (`ComponentName.tsx`):
   - Import theme from `~/theme`
   - Use theme tokens for all styling values (colors, spacing, typography, etc.)
   - Extend appropriate HTML element props for type safety
   - Export component and its types
3. **Styles file** (`componentName.css.ts` or `styles.css.ts`):
   - Use Vanilla Extract's `style()` and `styleVariants()` functions
   - Reference theme tokens: `theme.colors`, `theme.spacing`, `theme.fontSize`, etc.
   - Use `spacing()` and `negativeSpacing()` helpers from `~/utils` for dynamic spacing
4. **Types file** (`types.ts`) - if component has complex type definitions
5. **Index file** (`index.ts`) - export all public APIs
6. **Storybook story** in `stories/ComponentName.stories.tsx`
7. **Export component** in `src/components/index.ts`

Example component structure:
```typescript
// ComponentName.tsx
import { theme } from '~/theme';
import { spacing } from '~/utils';
import styles from './styles.css';

export type ComponentProps = React.ComponentProps<'div'> & {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

export const Component = ({ variant = 'default', size = 'md', ...props }: ComponentProps) => {
  // implementation
};
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
- Use Vanilla Extract for styling to maintain type safety
