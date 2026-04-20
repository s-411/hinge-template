# Custom fonts

Drop a font family into its own folder here. Expo's bundler picks up anything
under `assets/`; this README documents the convention so future agents know
where to find a family and how to register it.

## Folder convention

```
assets/fonts/
├── README.md                ← this file
├── TMPos/                   ← one folder per font family, UpperCamelCase
│   ├── TMPos-Regular.ttf
│   ├── TMPos-Medium.ttf
│   ├── TMPos-SemiBold.ttf
│   └── TMPos-Bold.ttf
└── SomeOtherFamily/
    └── SomeOtherFamily-Regular.otf
```

- Folder name = font family name (e.g. `TMPos`, `PlayfairDisplay`).
- File name = `<Family>-<Weight>[.Italic].ttf|otf`. Stick to this pattern so a
  glance at the folder tells you what's loadable.

## How to switch a font family to a custom drop-in

Three edits, in this order:

**1. `app/_layout.tsx` — register the files with `useFonts`:**

```ts
const [loaded] = useFonts({
  TMPos_400Regular: require('../assets/fonts/TMPos/TMPos-Regular.ttf'),
  TMPos_500Medium:  require('../assets/fonts/TMPos/TMPos-Medium.ttf'),
  TMPos_600SemiBold: require('../assets/fonts/TMPos/TMPos-SemiBold.ttf'),
  TMPos_700Bold:    require('../assets/fonts/TMPos/TMPos-Bold.ttf'),
  // …existing fonts stay
});
```

Use the same `FamilyName_WeightName` shape that `@expo-google-fonts/*` uses, so
every call site in `theme/tokens.ts` looks the same whether the font came from
Google Fonts or this folder.

**2. `theme/tokens.ts` — point the role at the new family:**

```ts
export const fonts = {
  display:       'TMPos_400Regular',       // ← heading font
  displayItalic: 'TMPos_400Regular_Italic',
  sans:          'Inter_400Regular',
  sansMedium:    'Inter_500Medium',
  sansSemibold:  'Inter_600SemiBold',
  sansBold:      'Inter_700Bold',
  mono:          'Menlo',
};
```

**3. Uninstall the replaced Google Font package (optional cleanup):**

```
npm uninstall --legacy-peer-deps @expo-google-fonts/playfair-display
```

That's it — every heading/h1–h5/wordmark/prompt answer retargets.

## Which role to swap

- **Heading font** → edit `fonts.display` (+ `fonts.displayItalic` if an italic
  variant is shipped).
- **Body font** → edit `fonts.sans` and its three weight siblings
  (`sansMedium`, `sansSemibold`, `sansBold`). Load all four weights; many
  screens use specific weights.

## Notes for future agents

- Licence files live alongside the font files. Don't delete them.
- If a family only ships one weight, alias the sans siblings to the same key
  so typography bundles still resolve:
  ```ts
  sans: 'TMPos_400Regular',
  sansMedium: 'TMPos_400Regular',  // no medium shipped → reuse regular
  sansSemibold: 'TMPos_400Regular',
  sansBold: 'TMPos_400Regular',
  ```
  (Ugly but safe. Prefer shipping all four weights.)
- Expo bundles any file under `assets/`, no extra config needed.
- The `expo-font` plugin is already registered in `app.json` → do not remove it.
