# Connect theme — template switch surface

> **Reskin the whole app in one prompt.**

> https://hinge-preview.vercel.app/brand
>
> **Colours:** _"Change the app colours: primary = forest, secondary = mauve, background = pebble, text = stone"_ — agent maps names → hexes → `colors.*` primitives in one edit and the whole tokenized app retargets.
>
> **Fonts:** _"Change the fonts: heading = Tiempos Headline, body = Modern Era Medium, labels = Modern Era Regular, captions = Modern Era Medium, buttons = Modern Era Bold"_ — agent registers any missing font files, updates `fonts.heading` / `fonts.body` / `fonts.label` / `fonts.caption` / `fonts.button`, and the whole tokenized app retypes.

`theme/tokens.ts` is the **only file** you edit to reskin the app. Every screen
pulls from its exports; every hex/rgba/font-size in the app lives here.

---

## Terminology (use these words in prompts)

| Token group | What it controls |
|---|---|
| **Primary color** | The accent — CTAs, active states, pills, progress dots, the terracotta-on-anything feeling. Edit `colors.accent` + its three siblings. |
| **Secondary color** | The supporting hue — sage green today, but the slot is named `secondary` so you can rebrand to any hue. Used for wellness affordances, the Superboost button, and recommended-plan badges. Edit `colors.secondary` + `colors.secondarySoft`. |
| **Success color** | Positive / confirm / approve state. "Yes", good, check marks, green-flag-style affirmations. Kelp (`#097270`) by default. Edit `colors.success` + `colors.successSoft`. |
| **Danger color** | Negative / warn / destructive state. "No", bad, error toasts, red-flag-style warnings. Coral (`#D45847`) by default. Edit `colors.danger` + `colors.dangerSoft`. |
| **Heading font** | Every display/serif headline — wordmarks, hero titles, prompt answers, h1–h5. Edit `fonts.heading`. |
| **Body font** | Paragraphs and page titles. Edit `fonts.body`. |
| **Label font** | Form labels and list row labels. Edit `fonts.label`. |
| **Caption font** | Small supporting copy (legal, hints, badges). Edit `fonts.caption`. |
| **Button font** | CTA labels, pill buttons, badge numbers. Edit `fonts.button`. |
| **Background family** | The page canvas, elevated surfaces, and cards. Edit `colors.bg`, `colors.bgElev`, `colors.bgCard`, `colors.placeholder`. |
| **Text family** | Primary / secondary / muted text colors. Edit `colors.ink`, `colors.inkSoft`, `colors.inkMute`. |
| **Border family** | Hairlines and soft dividers. Edit `colors.line`, `colors.lineSoft`. |
| **Corner radii** | Card roundness, chip roundness, sheet roundness. Edit `radius.card`, `radius.chip`, `radius.sheet`. |
| **Shadow presets** | Card lift, FAB lift, modal lift. Edit `shadow.card`, `shadow.fab`, `shadow.modal`. |
| **Typography scale** | Every size bundle (h1, body, caption, etc.). Edit individual entries in `type`. |
| **Gradients** | Named two-stop pairs for photo placeholders, paywall heros, avatar tiles. Edit `gradient.*`. |
| **Illustration palette** | Decorative SVG colours (e.g. the schematic map on the Location screen). Edit `illustration.*`. |

---

## One-line edits for the common changes

### Change the **primary color** to `#994EA8`

```ts
// theme/tokens.ts
export const colors = {
  // ...
  accent:     '#994EA8',   // ← primary
  accentInk:  '#ffffff',   // text on top of primary (keep white if primary stays dark)
  accentSoft: '#e8d4ef',   // light tint for backgrounds & halos
  accentDeep: '#6e3878',   // deeper variant for pressed/emphasis
  // ...
};
```
Then update the accent-tinted rgba values that can't reference hex:
```ts
role.primaryTint:  'rgba(153,78,168,0.18)',   // = accent RGB @ 18% alpha
gradient.accentGlow: ['rgba(153,78,168,0.45)', 'rgba(153,78,168,0)'] as const,
```

### Change the **heading font**

```ts
export const fonts = {
  heading:       'YourSerif_400Regular',   // ← swap here
  headingItalic: 'YourSerif_400RegularItalic',
  // ...
};
```
Every h1–h5, wordmark, and prompt answer rerenders.

> Custom (non-Google Fonts) families live in [`assets/fonts/`](../assets/fonts/README.md).
> Drop the family into its own folder there, register it in `app/_layout.tsx`,
> then set `fonts.heading` to the loaded name.

### Change a specific sans role

Five semantic slots — each can point at a different family. Body, label,
caption, and button are **separate tokens by design** so brand guidelines that
assign a distinct font (or weight) to each can be honoured in one edit per
role.

```ts
export const fonts = {
  body:    'ModernEra_500Medium',    // paragraphs & page titles
  label:   'ModernEra_400Regular',   // form labels, row labels
  caption: 'ModernEra_500Medium',    // small supporting copy
  button:  'ModernEra_700Bold',      // CTAs, pill buttons
  // ...
};
```

Want buttons in a different family entirely (e.g. a display sans)? Change
only `fonts.button`:

```ts
button: 'Grotesk_700Bold',
```
Every CTA switches; nothing else moves.

### Weight fallback

When only one weight of a family is bundled, the `type.*` bundles include a
`fontWeight` override so iOS synthesises Medium / Bold. When the full weight
family ships, the `fontFamily` name (e.g. `ModernEra_500Medium`) encodes the
weight and the override becomes redundant.

### Change **card corner radius**

```ts
export const radius = {
  // ...
  card: 20,   // was 16 — now every prompt card, stat strip, facts list uses 20
};
```

### Change **background**

```ts
export const colors = {
  bg:     '#faf7f2',   // page canvas
  bgElev: '#ffffff',   // elevated (modals, headers)
  bgCard: '#ffffff',   // cards
};
```

---

## Named reference palette

`theme/tokens.ts` also exports a `palette` object — a **reference bank** of
hand-picked named hues. Not consumed by screens; it's there so you can say
things like:

> _"Change primary to forest, secondary to mauve, background to pebble, text to stone."_

…and the agent looks up each name in `palette`, then drops the hex into the
matching `colors.*` primitive.

**Current bank** (Hinge-inspired):

| Name | Hex | Typical role |
|---|---|---|
| Midnight | `#3E1768` | Deep primary, bold accents |
| Aubergine | `#67295F` | Rich primary |
| Lilac | `#75457D` | Primary / accent (current app) |
| Mauve | `#9F81A5` | Soft primary, muted accents |
| Mist | `#C7C7E5` | Cool neutral, soft surfaces |
| Sand | `#CCAC9F` | Warm neutral, card surfaces |
| Pebble | `#EEE1DB` | Page background, light neutral |
| Stone | `#484848` | Text, dark surfaces |
| Forest | `#025656` | Deep secondary, success-adjacent |
| Kelp | `#097270` | Success (already wired) |
| Coral | `#D45847` | Danger (already wired) |
| Bright White | `#FFFFFF` | OS chrome only |

### Example workflow

User: _"For this app, primary = aubergine, secondary = mist, background = pebble, text = stone."_

Agent edits `colors`:
```ts
export const colors = {
  bg:     '#EEE1DB',   // pebble
  bgElev: '#EEE1DB',
  bgCard: '#FFFFFF',

  ink:     '#484848',  // stone
  inkSoft: '#6b6258',
  inkMute: '#9a9187',

  accent:     '#67295F',   // aubergine
  accentSoft: '#<tint>',   // derive a lighter aubergine
  accentDeep: '#<deep>',
  accentInk:  '#FFFFFF',

  secondary:     '#C7C7E5',   // mist
  secondarySoft: '#<tint>',
};
```

Reload Expo — whole app rebrands in seconds. Don't like it? Swap one name
(`aubergine` → `forest`) and reload again.

### Adding names to the palette

A client with their own brand colors? Extend `palette` in `tokens.ts`:
```ts
export const palette = {
  // existing entries…
  clayRed: '#b34430',
  oatMilk: '#f4ecdf',
};
```
Then reference them by name in future instructions.

---

## Dark mode

The template ships with full runtime dark mode, exposed via a Settings screen
at [`app/settings.tsx`](../app/settings.tsx) (linked from Profile > Settings).
Three modes: **System** (follow the OS), **Light**, **Dark** — persisted to
AsyncStorage so the user's choice survives relaunches.

### How it works

- [`theme/ThemeProvider.tsx`](./ThemeProvider.tsx) exposes `useTheme()` which
  returns `{ role, gradient, mode, resolvedMode, setMode }`.
- `tokens.ts` defines both `colors` (light primitives) and `colorsDark` (dark
  primitives). A `resolveRole(mode)` function maps each semantic role to the
  right primitive for the current mode.
- Every screen/component reads from `useTheme()` and wraps its `StyleSheet.create`
  in `useMemo(() => ..., [role])`. When mode changes, styles regenerate and
  the whole tree re-renders with the new palette.

### Adding a new screen that participates in dark mode

```tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radius, space, type } from '@/theme/tokens';
import { useTheme } from '@/theme/ThemeProvider';

export default function MyScreen() {
  const { role } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
      card: {
        backgroundColor: role.surfaceCard,
        borderRadius: radius.card,
        padding: space.md,
      },
      title: { ...type.h2, color: role.textPrimary },
    }),
    [role],
  );
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Hello</Text>
    </View>
  );
}
```

Rules of thumb:
- Pull colours from `role.*` via the hook — never from `colors.*` directly.
- Put `StyleSheet.create` inside `useMemo(() => ..., [role])` so styles
  rebuild on mode switch.
- Size/space/radius/type/shadow tokens are mode-independent — import them
  statically from `tokens.ts`.

### Adding a new role

If you need a new semantic slot (e.g. `role.warning`):
1. Add `warning` + `warningSoft` to `colors` and `colorsDark` in `tokens.ts`.
2. Add `warning`, `warningSoft` to both the static `role` object (light) and
   the dark branch inside `resolveRole(mode)`.
3. Add them to the `Role` type if the mapped type doesn't pick them up
   automatically.

### Exceptions — things that stay constant across modes

- **Tab bar fill** (`role.chromeFill`) — dark in both modes by design
  (brand chrome strip, not a surface).
- **Connect Pro paywall** (screen 27) — always dark regardless of app theme;
  it's a premium visual statement. See `components/PaywallBody.tsx`.
- **Photo overlay text colours** (`role.textOnPhoto*`) — photos don't flip.
- **iOS system dialog chrome** (`role.iosSheet*`, `role.iosAction`) — mimics
  native iOS which is mode-independent within our render.

---

## File structure

```
theme/
├── tokens.ts           ← primitives, roles, type, spacing, radii, etc.
├── ThemeProvider.tsx   ← runtime theme + dark-mode hook
└── README.md           ← this file
```

### Inside `tokens.ts`

| Export        | Purpose                                               |
|---------------|-------------------------------------------------------|
| `colors`      | Raw light palette (primitive hex values).             |
| `colorsDark`  | Raw dark palette — only the Connect Pro paywall uses this. Light mode everywhere else. |
| `fonts`       | Font family names (must match `useFonts()` loader).   |
| `role`        | **Semantic** color aliases layered over `colors`. Screens reach for `role.primary`, `role.textPrimary`, etc. |
| `type`        | Typography bundles — spread into Text styles (`...type.h1`). |
| `space`       | Padding / margin / gap scale (`xxxs` 2 → `xxl` 44).   |
| `radius`      | Corner radius scale — ordinal (`sm/md/lg/xl/pill`) + semantic (`chip/card/sheet`). |
| `shadow`      | 10 elevation presets (`subtle`, `card`, `fab`, `modal`, …). Spread into style objects. |
| `border`      | 5 border widths (`hairline` → `bold`).                |
| `opacity`     | 5-stop alpha ramp (`faint` 0.25 → `strong` 0.8).      |
| `gradient`    | 14 named two-stop pairs for photo heros, avatars, paywall banners. |
| `size`        | Fixed-dimension recipes (`fab`, `tabBar`, `stepAvatar`, `heroImage`, etc.). |
| `illustration`| SVG paint for decorative art (map schematic today).   |

---

## Golden rules

1. **Never hardcode a hex in a screen.** If the audit finds one, add a token and replace it.
2. **Prefer `role.*` over `colors.*` in new screens.** Roles are the layer that makes future themes clean — they describe intent ("surfaceCard"), not primitive ("bgCard"). The `colors` primitives remain as the one place to re-point the whole role layer.
3. **Typography as bundles, not properties.** Spread `...type.h1`; don't set `fontFamily`/`fontSize`/`lineHeight`/`letterSpacing` individually.
4. **Spacing from the scale only.** If you need a padding value not in `space`, add it to the scale and use the named constant.
5. **Shadows from presets.** Never assemble a shadow inline. Add a new preset if none of the 10 fit.
