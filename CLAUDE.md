# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **For incoming agents: read this file first.**
> **If this repo is a clone of the template, read `TEMPLATE_FORK.md` next — you skip stages 2–8.**
> **Otherwise read `PROCESS_GUIDE.md`. Then act.**

---

## This app

- **Name:** Hinge Template (design-complete template repo); package name `hinge-template`, slug `hinge-template`
- **Purpose:** Tokenized, theme-aware RN/Expo template with 35+ screens. Forked per-app via `TEMPLATE_FORK.md` (`npx degit s-411/hinge-template --force`). Each fork keeps the design + tokenisation identical and adapts content, brand strings, and router wiring.
- **Bundle ID (template default):** `com.astrum.themepicker` — forks reserve their own. EAS project `a4606b2e-ffc2-4070-8729-01de10e27aa4`, owner `s-411`
- **Stack:** Expo SDK 54, React Native 0.81, React 19, TypeScript (strict), Expo Router 6 (file-based), New Architecture enabled
- **Stack Profile:** Local — no real auth, backend, or payments in the template
- **Status:** TEMPLATE — canonical source for forks. No App Store submission planned for this repo itself.

---

## Commands

```bash
npm install                      # install deps
npx expo start                   # dev server; press i for iOS sim, a for Android, w for web
npm run ios                      # expo start --ios
npm run android                  # expo start --android
npm run web                      # expo start --web

npx tsc --noEmit                 # typecheck (the only correctness gate — strict mode)

# EAS — see TESTFLIGHT.md and PROCESS_GUIDE.md
eas build --profile production --platform ios
eas submit --platform ios
```

There are **no lint or test scripts** wired up. Trust strict TypeScript; verify UI changes by running the app in a simulator. `eas.json` uses `appVersionSource: remote` — do NOT bump `ios.buildNumber` in `app.json`; EAS manages it.

---

## Architecture

### Routing — Expo Router (file-based, in `app/`)

`app/_layout.tsx` is the root: it loads fonts (`useFonts`), gates rendering on font load, mounts `<ThemeProvider>`, the navigator (`<Stack>`), and a single global `<KeyboardHideButton/>`. Every route is registered explicitly with its presentation/animation options (modal vs transparentModal vs default push). When adding a screen, create the file under `app/...` AND add a `<Stack.Screen name="..."/>` entry in `_layout.tsx`. Tab bar lives at `app/(tabs)/_layout.tsx`.

### Theming — `theme/` is the single source of truth for visual style

Three layers, evaluated runtime via React context:

1. **Primitives** (`theme/tokens.ts` → `colors`, `colorsDark`, `fonts`, `palette`, `space`, `radius`, `shadow`, `border`, `opacity`, `gradient`, `size`, `type`, `illustration`). Raw hex / family / scale values. `palette` is a *named bank* (midnight, aubergine, lilac, mauve, mist, sand, pebble, stone, forest, kelp, coral) referenced conversationally — agents look up names → hexes and drop them into `colors.*`.
2. **Semantic roles** (`role` object + `resolveRole(mode, overrides)` function). Screens consume `role.primary`, `role.surfaceCard`, `role.textPrimary`, etc. — **never** raw `colors.*` directly. `resolveRole` flips primitives based on mode (light/dark) and merges in user-selected overrides.
3. **Runtime context** (`theme/ThemeProvider.tsx` → `<ThemeProvider>` + `useTheme()`). Persists `mode` ('system'|'light'|'dark'), `primaryHue`, `secondaryHue`, `pageBgHex`, `cardBgHex` to AsyncStorage under `connect.*` keys. Hydrates on mount; updates re-render every consumer.

Helpers in `theme/color.ts`: `parseHex`, `hexToHsl`, `hexToHsv`, `hsvToHex`, `hslToHex`, `hexToRgba`, `isHexDark`, `deriveRoleOverrides` (the last derives Soft / Deep / Tint variants from a user-selected primary/secondary).

### Pattern every themed screen follows

```tsx
const { role } = useTheme();
const styles = useMemo(
  () => StyleSheet.create({ card: { backgroundColor: role.surfaceCard, ... } }),
  [role],
);
```

`StyleSheet.create` MUST be inside `useMemo(..., [role])` so styles regenerate on theme change. Mode-independent tokens (`space`, `radius`, `type`, `shadow`, `size`) are imported statically from `theme/tokens.ts`.

### Status bar

`RootNav` in `app/_layout.tsx` sets the status bar style based on `isHexDark(role.surfacePage)`. Screens with their own dark hero (e.g. `app/index.tsx`) override on focus via `setStatusBarStyle('light')` and restore on blur — match this pattern when adding hero/dark screens.

### Path alias

`@/*` → repo root (see `tsconfig.json`). Use `@/theme/tokens`, `@/components/Foo`, etc.

### Fonts

Custom `.otf`/`.ttf` files live in `assets/fonts/`. They are bundled via `metro.config.js` (asset extension allowlist) and registered in `app/_layout.tsx`'s `useFonts(...)` call. Family name keys there must match the strings in `tokens.ts` `fonts.*`.

### Reference / scratch directory

`new-screens/` holds the original design-bundle handoff (HTML + JSX exports from `claude.ai/design`). It is **not part of the runtime app** — don't import from it; treat it as read-only design reference.

---

## How to work in this repo

1. **Run `BOOTSTRAP.md` first** if this is your first session in this repo, or if anything seems off (missing skills, build errors, missing files). It's a 5-minute verification that catches problems before they cascade.
2. **Read `PROCESS_GUIDE.md`.** It defines all 16 stages with skip conditions.
3. **Find the current stage above.** Do only that stage's work. Do not get ahead.
4. **Use the prompt from `PROMPTS.md`** for the current stage.
5. **Self-check after every phase.** Invoke `/skill self-check` before claiming any phase done.
6. **Park scope creep in `LATER.md`.** Never expand scope inside the current stage.
7. **Read context first. Plan mode before building.** No code without a plan I've approved.

---

## Source-of-truth files

| File | What it is |
|------|-----------|
| `TEMPLATE_FORK.md` | **Per-fork checklist when cloning this codebase as a template.** Skip stages 2–8; resume at stage 9. |
| `BOOTSTRAP.md` | Per-repo setup verification — run first, every time. |
| `PROCESS_GUIDE.md` | The 16-stage pipeline. Authoritative. |
| `lib/brand.ts` | Brand identity strings (name, tagline, tier names). One-file rebrand surface. |
| `lib/fixtures.ts` | Demo sample data (profile names, paywall benefits, pricing). One-file content swap. |
| `lib/prompts.ts` | Prompt library data — heavily domain-specific; rewrite per vertical. |
| `STACK_PROFILES.md` | Architecture decision (Local / Convex). Picked at Stage 0. |
| `REF_DOCS_INDEX.md` | Map of stages → which file to read in the ref-docs library. |
| `ONBOARDING_PATTERNS.md` | Menu of 12 onboarding screen patterns. Pick 5-8 at Stage 4. |
| `AI_IMAGERY.md` | Prompt library + Gemini MCP workflow for Stage 7b image replacement. |
| `~/Documents/GitHub/ref-docs/` | Tech stack reference library at apps root (~/Documents/GitHub/) (NOT per-repo). Convex, Sentry, RevenueCat, Stripe official docs. |
| `PROMPTS.md` | Copy-paste prompts indexed by stage. |
| `BUNDLE_IDS.md` | Cross-app tracker (lives in apps-root, not per-repo). |
| `EXPO_SKILLS.md` | Reference for the official Expo skills. |
| `APP_LANDING_PAGE.md` | applanding.co workflow for Stage 8a (legal URLs) and Stage 8b (branded page). |
| `convex-auth-setup.md` | Convex Auth (`@convex-dev/auth`) setup, sign-in patterns, account deletion. Read for Convex profile apps. |
| `convex-react-client.md` | Convex queries/mutations/actions reference. Read at Stage 6 for Convex profile apps. |
| `nextjs-bridge.md` | When/how to add a Next.js companion to a Convex-backed app. |
| `legal/privacy.template.md` | Privacy policy template — filled at Stage 8a. |
| `legal/terms.template.md` | Terms of use template — filled at Stage 8a. |
| `SCREENSHOT_WORKFLOW.md` | App Store screenshot tool workflow for Stage 14. |
| `TESTFLIGHT.md` | Internal + External tester setup, ASC group creation, troubleshooting. Stage 13. |
| `LATER.md` | Everything out of scope for v1. Keeps current stages clean. |
| `BUILD_PLAN.md` | (created at Stage 5) phased plan for the main app build. |
| `asc-metadata.md` | (created at Stage 15) App Store Connect copy-paste content. |

---

## Hard constraints

- **No inline hex / rgba colors in screens.** Pull from `useTheme().role` (preferred) or `theme/tokens.ts` `colors.*` / `gradient.*` / `illustration.*`.
- **No magic spacing values.** Use the `space` scale from `theme/tokens.ts` (`xxxs:2, xxs:3, xs:6, sm:10, md:16, lg:22, xl:30, xxl:44`). Don't invent values; if the scale is missing one, add it there.
- **No inline font families or font sizes.** Spread `...type.h1` / `...type.body` etc. from `theme/tokens.ts` — never set `fontFamily`/`fontSize`/`lineHeight`/`letterSpacing` individually.
- **No inline radius / shadow / border values.** Pick from `radius`, `shadow`, `border` in `tokens.ts`. Add a new preset rather than assemble inline.
- **Wrap themed `StyleSheet.create` in `useMemo(..., [role])`.** Otherwise styles freeze and dark-mode/hue switches won't re-render.
- **Add new screens to `app/_layout.tsx`'s `<Stack>`** — Expo Router still requires the `<Stack.Screen name="..."/>` declaration to control presentation/animation.
- **For Local profile:** no real auth, no real backend, no real payments in v1.
- **For Convex profile:** Convex DB IS the v1 backend. Real payments still parked in `LATER.md`. Auth via @convex-dev/auth — anonymous by default, accounts when needed. See `convex-auth-setup.md`.
- **One agent per repo at a time.** If another agent is already working here, stop.
- **Global keyboard dismiss button required.** A `KeyboardHideButton` component must be mounted once at the app root (after the navigator). Appears above any keyboard/number pad, right-aligned, themed to match the app. One mount covers every screen — do not add per-screen.
- **Don't bump `ios.buildNumber` in `app.json`.** `eas.json` uses remote `appVersionSource`; EAS owns the build number.

---

## When in doubt

Stop. Ask. Don't guess. The cost of asking is 30 seconds; the cost of guessing wrong is undoing 2 hours of work.

---

## Stage history (update as you progress)

| Stage | Completed | Notes |
|-------|:-:|-------|
| 0. Triage | ☐ | |
| 1. Repo spin-up | ☐ | |
| 2. Onboarding clone & build | ☐ | |
| 3. Brand lock / tokenize | ☐ | |
| 4. Onboarding hardening | ☐ | |
| 5. Main app plan | ☐ | |
| 6. Main app build | ☐ | |
| 7. Polish audit | ☐ | |
| 8a. Legal URLs wired | ☐ | |
| 9. Analytics + Sentry | ☐ | |
| 10. Self-check gate | ☐ | |
| 11. App Store audit | ☐ | |
| 12. EAS build | ☐ | |
| 13. TestFlight + smoke test | ☐ | |
| 14. Screenshots | ☐ | |
| 15. Metadata generation | ☐ | |
| 8b. Landing page build | ☐ | (MANDATORY — after Stage 15, before Stage 16) |
| 16. ASC submission | ☐ | |
