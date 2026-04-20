# Connect

An Expo / React Native port of the **Connect** dating app prototype ("For people who date slowly") from a `claude.ai/design` handoff bundle.

12 screens, editorial warm palette (terracotta + cream + deep ink), Instrument Serif display + Inter body.

## Run

```
npm install
npx expo start
```

Press `i` for the iOS simulator, `a` for Android.

## Structure

- `app/` — Expo Router file-based routes (12 screens)
- `components/` — shared primitives (icons, tab bar, screen header, etc.)
- `theme/tokens.ts` — color / font / spacing tokens (locked light · terracotta · serif · comfy)

## Navigation flow

Welcome → Intro → Onboarding (education → profile builder) → Prompt Library (modal) → Tabs (Discover / Likes / Profile) → Modals (Likes info · What Works · Preferences · Profile-Daisy variant)

## Source

Ported from `/tmp/design-bundle/hinge-1/` (design handoff, 2026-04-18).
