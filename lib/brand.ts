// Brand identity strings for the demo content shipped on top of this template.
//
// Per fork:
//   1. Change `name` to your app's brand name (e.g. 'Acme').
//   2. Decide whether the *Name fields below should follow the same brand or
//      diverge (some forks may want 'Acme Premium' instead of 'Acme+').
//   3. Rephrase `tagline` to your fork's positioning.
//
// Every screen that needs to display a brand-specific string imports from here
// rather than hardcoding. Adding a new brand-specific string? Add it here and
// reference it via `brand.<key>`.

export const brand = {
  name: 'Connect',
  tagline: 'For people who date slowly.',

  // Member badge — case differs by screen; keep both variants explicit so
  // forks can tune them independently (e.g. one screen uses Title Case, another
  // sentence case).
  memberLabel: 'Connect Member',
  memberLabelLower: 'Connect member',

  // Premium tier names. Forks may rename these without changing `name`.
  plusName: 'Connect+',
  proName: 'Connect Pro',

  // Used in legal copy on the subscription plans screen.
  accountName: 'Connect account',
} as const;
