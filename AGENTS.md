# Expo HAS CHANGED

Read the exact versioned docs at <https://docs.expo.dev/versions/v57.0.0/> before writing any code.

When reporting information to me, be extremely concise and sacrifice grammar for sake of concision.

## Folder & File Conventions

- `src/app/` — expo-router routes only. One folder per route, e.g. `pricing/index.tsx` (not `pricing.tsx`).
- `src/components/` — small, generic, reusable UI primitives (button, input-form, etc.). Kebab-case filenames, **named exports**.
- `src/features/<feature>/` — page-level feature modules (e.g. `pricing/`):
  - `components/` — feature-specific components (e.g. `pricing-card.tsx`). Kebab-case, named exports.
  - `api/` — feature-specific API-call functions (axios calls), e.g. `pricing-api.ts` exporting `fetchPricing`, `fetchPricing`, `createPricing`, `updatePricing`, `deletePricing`. Envelope types come from the shared generics in `src/types/api-types.ts` (`ApiResponse<T>` / `ApiListResponse<T>`) — don't hand-roll per-feature response types.
  - `hooks/` — feature-specific hooks, incl. TanStack Query hooks. Split into `use-<feature>-queries.ts` (reads, e.g. `usePricingQuery`, `usePricingQuery`) and `use-<feature>-mutations.ts` (writes, e.g. `useCreatePricingMutation`) once a feature has both. Query-key factories root their keys from the `QueryKeys` enum in `api-types.ts` (e.g. `QueryKeys.PRICING`).
  - `types.ts` — feature-specific types (single file, not a folder).
  - `utils/` — feature-specific utils (only if needed).
  - `lib/` — feature-specific lib code, non-API (only if needed).
- `src/hooks/` — shared/global hooks used across features.
- `src/utils/` — shared/global utility functions.
- `src/lib/` — shared/global lib code (create only when needed).
- `src/types/` — shared/global types, e.g. `api-types.ts` for the generic `ApiResponse<T>` / `ApiListResponse<T>` response envelope, the shared `DEFAULT_PAGE_LIMIT`, and the `QueryKeys` enum (root query-key strings, one member per feature).
- `src/store/` — Zustand stores, one file per domain, e.g. `store/auth-store.ts` exporting `useAuthStore`.

**Naming rules:** all filenames kebab-case; all components/hooks/stores use **named exports** (no default exports); `.tsx` for files with JSX, `.ts` otherwise. Import via the `@/*` alias (maps to `src/*`).

## Styling Conventions

- Always use the theme color tokens (`bg-background`, `bg-primary`, `text-foreground`, `bg-muted`, etc. — defined in `src/global.css` / `tailwind.config.js`) instead of hardcoded raw colors (`bg-white`, `text-white`, `bg-gray-100`, ...). If a design needs a color with no existing token, add a new semantic token to `global.css`/`tailwind.config.js` rather than inlining the raw value.
- Font-family (`font-urbanist-medium` / `font-urbanist-bold`) belongs in the shared `Text`, `Button`, and `FormInput` component variants, not repeated inline per screen. If a new weight/style combination is needed in multiple places, extend the relevant shared component's variants instead of adding ad hoc `font-urbanist-*` classes at each call site.
- Icons: only use an existing icon library (`@expo/vector-icons`) glyph when it's a genuine visual match for the Figma design. If the exact icon isn't available in the project's icon libraries, export the real vector data from Figma (`download_assets`, per the `figma-design-to-code` skill) and build a small reusable component under `src/components/icons/` using `react-native-svg` — never hand-draw or approximate the path data.
- Prefer NativeWind pseudo-class variants (`disabled:`, `active:`, `focus:`, and `group-disabled:`/`group-active:` for styling a child based on a parent `Pressable`'s state) over JS-computed conditional `className` strings for interaction states. Custom extended color tokens combined with manual conditional class-swapping can be unreliable with `tailwind-merge`'s conflict resolution; pseudo-class variants compile to a single class with real CSS specificity and don't have that problem.

## Forms & Keyboard

Any screen with a `TextInput` must use `FormScreen` (`src/components/form-screen.tsx`) — never a bare `ScrollView`, a non-scrolling `flex-1 View`, or `KeyboardAvoidingView` (the keyboard covers the input and you type blind).

- Pass layout via `contentContainerClassName`; `bottomOffset`, `keyboardShouldPersistTaps`, and `keyboardDismissMode` are already set.
- The bottom-pinned primary button goes in the `footer` prop — never as a sibling `View`. `FormScreen` measures the footer and keeps the focused input above it; a sibling would land on top of the input. Use `footerClassName` if the footer needs its own spacing.

A `BottomSheetModal` containing an input needs `keyboardBehavior="interactive"`, `keyboardBlurBehavior="restore"`, `android_keyboardInputMode="adjustResize"`, and `BottomSheetTextInput` (see `SearchInput`) rather than a plain `TextInput`.

Any bottom sheet in the app must use `AppBottomSheetModal` (`src/components/app-bottom-sheet-modal.tsx`) instead of importing `BottomSheetModal` from `@gorhom/bottom-sheet` directly — it bakes in the themed background, drag handle, and backdrop (all previously copy-pasted per sheet and a source of light/dark-mode bugs) and still accepts every `BottomSheetModal` prop for overrides (`snapPoints`, keyboard behavior, a custom `handleIndicatorStyle`/`backgroundStyle`, etc.).

## Loading & Error States

- Any component/screen that fetches data via TanStack Query must handle all three states: loading, error, success — never let `data` be used while `undefined`/`isPending`.
- Loading: render a skeleton built from the shared `Skeleton` primitive (`src/components/skeleton.tsx`), shaped with `className` to match the real layout's dimensions. Colocate the skeleton as a `<ComponentName>Skeleton` named export next to the component it mirrors (same file for small components, a sibling `-skeleton.tsx` file for route/page-level components).
- Error: render `QueryErrorView` (`src/components/query-error-view.tsx`) with an `onRetry` wired to the query's `refetch`. Use `getErrorMessage` (`src/utils/get-error-message.ts`) to format the message — don't hand-roll axios error parsing.

## Verification

- This app targets **mobile only** (iOS/Android). `react-native-web` and the `expo start --web` script exist in the repo but are not a real product target — don't use the Browser pane / `expo-web` preview to verify UI changes, and don't spend effort getting a change to look right on web. Verify with `npx tsc --noEmit` / `expo lint`, and ask the user to check on a simulator/device (or describe what to check) instead of browser-based screenshots or click-testing.
