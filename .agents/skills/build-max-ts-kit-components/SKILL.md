---
name: build-max-ts-kit-components
description: Enforce the @max-ts/kit React component architecture when creating, migrating, refactoring, or reviewing code in src/components and src/stories. Use for component boundaries, useLogic extraction, nested components, local hooks and utilities, props and structural types, Base UI composition, Vanilla Extract styles, public exports, Storybook stories, and related tests.
---

# Build Max TS Kit Components

Read `../../../AGENTS.md` completely before changing component architecture.
Inspect the nearest existing components and treat user-corrected files as the
source of truth when they refine the documented pattern. For a stateful
multi-part example, inspect `src/components/FileUploader`.

## Workflow

1. Identify the public component and the nearest owner of every new piece of
   code.
2. Keep `Component.tsx` focused on props destructuring, calling `useLogic`, JSX,
   and composition.
3. Move state, effects, refs, subscriptions, non-trivial derived view data, and
   event handlers to `Component/useLogic/useLogic.ts`. Re-export it from
   `Component/useLogic/index.ts`.
4. Put hooks shared by the root and its nested components in the nearest
   `hooks/` directory. Keep pure transformations in the nearest `utils.ts`.
5. Give each independent nested component its own directory, `index.ts`,
   styles, and optional `useLogic` following the same rules.
6. Keep each component's styles with that component. A parent owns only the
   layout and spacing it imposes on children.
7. Add or update the public barrel, Storybook stories, and focused tests when
   the component API or behavior changes.
8. Run checks appropriate to the changed surface before finishing.

## Component Shape

- For ordinary non-compound components, refine the default in `AGENTS.md` by
  following the user-corrected pattern: export components and hooks as named
  arrow constants:
  `export const Component = (...) => ...` and
  `export const useLogic = (...) => ...`.
- Declare and export simple component props in the component `.tsx` file.
  Import them into `useLogic` with `import type` from the component file.
- Keep reusable structural types, discriminated public prop unions, and other
  complex API types in `types.ts`. Compound components may keep their public
  namespaced prop types there to preserve the established static API.
- Do not create empty `types.ts`, `hooks/`, `utils.ts`, or `useLogic` files.
- Let `useLogic` return data and handlers, never JSX.
- Keep small render-only helpers in the `.tsx`; extract an independent helper
  component once it needs its own logic, styles, or meaningful boundary.
- For compound Base UI wrappers, preserve the library's static subcomponent API
  and use the nearest compound component as the implementation reference.
  Function declarations remain acceptable there when they simplify static
  property assignment and public type inference.

## Ownership and Imports

- Keep code at its nearest common owner. Do not promote a hook or utility to a
  global location in anticipation of reuse.
- Use relative imports and local barrels inside one component tree.
- Inside `src/components`, import sibling components directly from their
  implementation files. Do not import through `~/components` or another
  component barrel because it can create cycles and load unrelated side
  effects. Continue using `~/theme` and `~/utils` for shared tokens and helpers.
- Keep `index.ts` files export-only. Export public types with `export type`.
- Export only the intended package API from `src/components/index.ts`; keep
  implementation-only nested components local.
- Preserve existing user changes and inspect the current checkout instead of
  relying on a remembered structure.

## Base UI and Markup

- Prefer Base UI for new accessible primitives.
- Use Base UI's `render` prop for element replacement and composition. Do not
  introduce or preserve `asChild`.
- Add `data-slot` to component roots and meaningful subparts. Represent local
  state and variants with `data-*` attributes.
- Preserve native semantics, keyboard behavior, focus management, ARIA names,
  refs, disabled state, and controlled/uncontrolled contracts.
- Merge consumer classes with `clsx(styles.part, className)`.

## Vanilla Extract

- Use theme tokens and the existing spacing helpers instead of hardcoded design
  values.
- Style every independent nested component in its own `styles.css.ts`.
- In `style()` selectors, target only the current class with modifiers such as
  `&:hover` or `&[data-state="open"]`.
- Use `globalStyle()` for child elements; never add child selectors such as
  `& > div`, `& svg`, or `& p` inside `style()`.

## Tests and Stories

- Test observable behavior and accessibility with React Testing Library.
- Test branching `useLogic`, upload/state orchestration, regressions, and pure
  utilities with focused unit tests. Do not require a separate test merely
  because `useLogic` exists.
- Keep stories in `src/stories/Component.stories.tsx`, import only the public
  API, and cover meaningful states rather than only the default render.
- For compound components, demonstrate the static API in stories.

## Validation

During iteration, run targeted tests and Biome checks. Before finishing, run:

```bash
pnpm lint:types
pnpm test
pnpm exec biome check <changed paths>
```

Also run `pnpm build` when public exports, types, or styles change, and
`pnpm build:storybook` when stories or Storybook-facing behavior change.
