// Tiny stroke-icon set — hand-tuned, no lib.
// All icons take {size, color, stroke} and render at viewBox 24.

const Icon = ({ size = 24, color = 'currentColor', stroke = 1.6, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
    style={style}>
    {children}
  </svg>
);

const IconX       = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>;
const IconChev    = (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>;
const IconChevL   = (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>;
const IconChevD   = (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>;
const IconPlus    = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconPencil  = (p) => <Icon {...p}><path d="M4 20h4L20 8l-4-4L4 16v4z"/></Icon>;
const IconHeart   = (p) => <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></Icon>;
const IconStar    = (p) => <Icon {...p}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/></Icon>;
const IconChat    = (p) => <Icon {...p}><path d="M4 5h16v11H9l-5 4V5z"/></Icon>;
const IconSliders = (p) => <Icon {...p}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h14M20 18h0M14 6a2 2 0 100 .1M10 12a2 2 0 100 .1M18 18a2 2 0 100 .1"/></Icon>;
const IconGear    = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.5-2.3.9a7 7 0 00-2-1.2L14 3h-4l-.6 2.5a7 7 0 00-2 1.2l-2.3-.9-2 3.5 2 1.5a7 7 0 000 2.4l-2 1.5 2 3.5 2.3-.9a7 7 0 002 1.2L10 21h4l.6-2.5a7 7 0 002-1.2l2.3.9 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z"/></Icon>;
const IconBulb    = (p) => <Icon {...p}><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0012 3z"/></Icon>;
const IconBolt    = (p) => <Icon {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" fill={p.fill || 'none'}/></Icon>;
const IconList    = (p) => <Icon {...p}><path d="M8 6h12M8 12h12M8 18h12M4 6h0M4 12h0M4 18h0"/></Icon>;
const IconQuote   = (p) => <Icon {...p}><path d="M7 17s-1-1-1-3c0-3 2-4.5 4-5M15 17s-1-1-1-3c0-3 2-4.5 4-5"/></Icon>;
const IconCap     = (p) => <Icon {...p}><path d="M12 5l10 4-10 4-10-4 10-4zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></Icon>;
const IconEyeOff  = (p) => <Icon {...p}><path d="M3 3l18 18M10.5 10.5A2 2 0 0013.5 13.5M6.5 6.6C4 8 2 12 2 12s3 6 10 6c1.7 0 3.1-.4 4.3-.9M9.5 5.2A10 10 0 0112 5c7 0 10 6 10 6s-.8 1.7-2.5 3.4"/></Icon>;
const IconLock    = (p) => <Icon {...p}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></Icon>;
const IconRewind  = (p) => <Icon {...p}><path d="M4 9c0-2 2-4 4-4h8a4 4 0 014 4v6a4 4 0 01-4 4h-6M4 9l-2 2 2 2M4 9v4"/></Icon>;
const IconDots    = (p) => <Icon {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></Icon>;
const IconCheck   = (p) => <Icon {...p}><path d="M5 12l5 5 9-11"/></Icon>;
const IconBadge   = (p) => <Icon {...p}><path d="M12 3l2 2 3-.5.5 3 2 2-2 2-.5 3-3-.5-2 2-2-2-3 .5-.5-3-2-2 2-2 .5-3 3 .5 2-2z"/><path d="M9 12l2 2 4-4" stroke={p.color || 'currentColor'}/></Icon>;
const IconSearch  = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></Icon>;
const IconArrow   = (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>;

Object.assign(window, {
  Icon, IconX, IconChev, IconChevL, IconChevD, IconPlus, IconPencil, IconHeart,
  IconStar, IconChat, IconSliders, IconGear, IconBulb, IconBolt, IconList,
  IconQuote, IconCap, IconEyeOff, IconLock, IconRewind, IconDots, IconCheck,
  IconBadge, IconSearch, IconArrow,
});
