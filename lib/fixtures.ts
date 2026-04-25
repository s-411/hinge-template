// Demo content fixtures.
//
// Sample profile names, prompt answers, paywall benefit lists — every piece
// of "this is what shows on screen for the demo content" lives here so a
// fork can rebrand the visible content by editing one file.
//
// What's NOT here: tokens (theme/tokens.ts), brand identity strings
// (lib/brand.ts), the prompt library (lib/prompts.ts).

// -----------------------------------------------------------------------------
// Demo profile data — names, facts, sample prompts shown on Discover, profile
// detail, self profile, modal variant.
// -----------------------------------------------------------------------------

export type DemoFact = {
  kind: 'work' | 'school' | 'home';
  label: string;
};

export const demoProfiles = {
  // Profile shown on the main Discover feed.
  feed: {
    name: 'Kris',
    activeStatus: 'Active today',
    photoLabel: 'PHOTO 1 / 6',
    prompt: {
      label: 'My most irrational fear',
      answer: 'Talking to a live bard after 11pm.',
    },
  },
  // Default profile shown at /profile/[id] when no real data is loaded
  // (id === 'demo' or unset).
  detail: {
    defaultName: 'Bridget',
    age: '25',
    height: `5' 8"`,
    location: 'Lower East Side',
    prompt: {
      label: 'My greatest strength',
      answer: 'positivity',
    },
    facts: [
      { kind: 'work', label: 'Personal Trainer' },
      { kind: 'school', label: 'University of Minnesota - Twin\nCities Campus' },
      { kind: 'school', label: 'Institute of Culinary Education' },
      { kind: 'home', label: 'Lake Geneva, WI' },
    ] as DemoFact[],
  },
  // Self / logged-in user persona.
  self: {
    name: 'Sarah',
  },
  // Modal variant (shown via /modal/profile-daisy).
  modal: {
    name: 'Daisy',
  },
} as const;

// -----------------------------------------------------------------------------
// Paywall benefit lists. Three tiers; the icon `kind` and `swatch` keys must
// stay in sync with components/PaywallBody.tsx (PlusFeatureIcon switch and
// ProFeatureThumb defs respectively).
// -----------------------------------------------------------------------------

export const paywallBenefits = {
  // Simple flat list rendered on the Preferred paywall (24).
  preferred: [
    'Send unlimited likes',
    'See everyone who likes you',
    'Set extra preferences',
    'See 2× Standouts',
  ] as const,

  // Plus tier benefits (light paywall, screen 26).
  plus: [
    { kind: 'inf', title: 'Send unlimited likes*' },
    { kind: 'person', title: 'See everyone who likes you' },
    { kind: 'prefs', title: 'Set more dating preferences' },
    { kind: 'star', title: 'See 2× Standouts daily' },
    { kind: 'sort', title: 'Sort all incoming likes' },
  ] as const,

  // Pro tier benefits (dark paywall, screen 27).
  pro: [
    { swatch: 'a', title: 'Enhanced recommendations', subtitle: 'Access to your type' },
    { swatch: 'b', title: 'Skip the line', subtitle: 'Get recommended to matches sooner' },
    { swatch: 'c', title: 'Priority likes', subtitle: 'Your likes stay at the top of their list' },
  ] as const,
};

// -----------------------------------------------------------------------------
// Subscription pricing — Preferred plans modal and Plus/Pro tier carousels.
// All prices are demo data; forks should swap to their real RevenueCat /
// StoreKit pricing.
// -----------------------------------------------------------------------------

export const preferredPlans = [
  { n: 1, unit: 'month', price: '$29.99', per: '', rec: false },
  { n: 3, unit: 'months', price: '$59.99', per: '($19.99/mo)', rec: true },
  { n: 6, unit: 'months', price: '$89.99', per: '($14.99/mo)', rec: false },
] as const;

export const tierPlans = {
  plus: [
    { tag: 'New', dur: '1 week', price: '$19.99/wk', selected: false },
    { tag: 'Save 42%', dur: '1 month', price: '$11.66/wk', selected: false },
    { tag: 'Save 65%', dur: '3 months', price: '$6.99/wk', selected: true },
    { tag: 'Save 71%', dur: '6 months', price: '$5.83/wk', selected: false },
  ],
  pro: [
    { tag: 'New', dur: '1 week', price: '$29.99/wk', selected: false },
    { tag: 'Save 53%', dur: '1 month', price: '$13.99/wk', selected: false },
    { tag: 'Save 74%', dur: '3 months', price: '$7.77/wk', selected: true },
    { tag: 'Save 77%', dur: '6 months', price: '$6.99/wk', selected: false },
  ],
} as const;

// -----------------------------------------------------------------------------
// "What Works" 4-card editorial grid (modal/what-works).
// -----------------------------------------------------------------------------

export type WhatWorksIlloKind = 'camera' | 'quote' | 'sun' | 'chat';

export const whatWorksCards: { t: string; s: string; ill: WhatWorksIlloKind }[] = [
  { t: 'Photos', s: 'How to pick your best 6 photos.', ill: 'camera' },
  { t: 'Prompts', s: 'Show your personality with unique answers.', ill: 'quote' },
  { t: 'Matching', s: 'Every match starts with a like — make it count.', ill: 'sun' },
  { t: 'Conversation', s: 'Learn how to move your convos to a date.', ill: 'chat' },
];

export const whatWorksIntroLead = 'Expert dating guides to help you along your';
