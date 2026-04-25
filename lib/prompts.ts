// Prompt library — the question bank shown on /prompts/library.
//
// Heavily domain-specific (dating). Forks for non-dating verticals should
// rewrite the categories and questions appropriate to their domain. The
// shape (Record<Category, string[]>) and category list are used by the
// screen — keep them as a non-empty array of categories and at least one
// prompt per category.
//
// First entry of `promptCategories` is shown as "NEW" in the UI; reorder
// or rename to control which category gets the badge.

export const promptCategories = [
  'Self-care',
  'About me',
  "Let's chat about",
  'My type',
  'Dating me',
] as const;

export type PromptCategory = (typeof promptCategories)[number];

export const promptsByCategory: Record<PromptCategory, string[]> = {
  'Self-care': [
    'I feel most supported when',
    'My cry-in-the-car song is',
    'Therapy recently taught me',
    'When I need advice, I go to',
    'I hype myself up by',
    'My friends ask me for advice about',
    'My self-care routine is',
    'My therapist would say I',
    'I get myself out of a funk by',
    'A boundary of mine is',
    'My happy place is',
    'To me, relaxation is',
  ],
  'About me': [
    'A shower thought I recently had',
    "I'm looking for",
    'My simple pleasures',
    'A life goal of mine',
    'The way to win me over is',
    'Weekends are for',
    'I geek out on',
  ],
  "Let's chat about": [
    'The last book that moved me',
    'An unpopular opinion I hold',
    'A hill I will die on',
    'Something I want to learn',
    'The soundtrack of my week',
  ],
  'My type': [
    "I'm weirdly attracted to",
    'Green flags I look for',
    "We'll get along if",
    'The first date I want is',
  ],
  'Dating me': [
    'Dating me is like',
    'The key to my heart is',
    'My love language is',
    "Let's make sure we're on the same page about",
  ],
};
