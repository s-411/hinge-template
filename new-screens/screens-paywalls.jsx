// screens-paywalls.jsx — Two tabbed paywall variants: Connect+ (light) & Connect Pro (dark)

function PaywallPlusScreen({ theme }) {
  return <PaywallVariant theme={theme} tier="plus"/>;
}
function PaywallProScreen({ theme }) {
  return <PaywallVariant theme={theme} tier="pro"/>;
}

function PaywallVariant({ theme, tier }) {
  const pro = tier === 'pro';
  const bg = pro ? '#0f0d0b' : theme.color.bg;
  const cardBg = pro ? '#1a1715' : theme.color.bgElev;
  const ink = pro ? '#f2ede4' : theme.color.ink;
  const inkSoft = pro ? 'rgba(242,237,228,0.6)' : theme.color.inkSoft;
  const line = pro ? 'rgba(242,237,228,0.12)' : theme.color.line;

  const plans = pro
    ? [
        { tag: 'New', sav: null,       dur: '1 week',   price: '$29.99/wk' },
        { tag: 'Save 53%', sav: 53,    dur: '1 month',  price: '$13.99/wk' },
        { tag: 'Save 74%', sav: 74,    dur: '3 months', price: '$7.77/wk', selected: true },
        { tag: 'Save 77%', sav: 77,    dur: '6 months', price: '$6.99/wk' },
      ]
    : [
        { tag: 'New', sav: null,       dur: '1 week',   price: '$19.99/wk' },
        { tag: 'Save 42%', sav: 42,    dur: '1 month',  price: '$11.66/wk' },
        { tag: 'Save 65%', sav: 65,    dur: '3 months', price: '$6.99/wk', selected: true },
        { tag: 'Save 71%', sav: 71,    dur: '6 months', price: '$5.83/wk' },
      ];

  const heroTitle = pro
    ? 'Get noticed sooner and go on\n3× as many dates'
    : 'Filter by height, dating\nintentions and more';

  const plusFeatures = [
    { i: 'inf',     t: 'Send unlimited likes*', s: null },
    { i: 'person',  t: 'See everyone who likes you', s: null },
    { i: 'prefs',   t: 'Set more dating preferences', s: null },
    { i: 'star',    t: 'See 2× Standouts daily', s: null },
    { i: 'sort',    t: 'Sort all incoming likes', s: null },
  ];
  const proFeatures = [
    { swatch: 'a', t: 'Enhanced recommendations', s: 'Access to your type' },
    { swatch: 'b', t: 'Skip the line',            s: 'Get recommended to matches sooner' },
    { swatch: 'c', t: 'Priority likes',           s: 'Your likes stay at the top of their list' },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: bg, color: ink,
      overflowY: 'auto', overflowX: 'hidden',
    }}>
      <div style={{ paddingTop: 58 }}/>
      {/* close X */}
      <div style={{ padding: '6px 22px', display: 'flex', justifyContent: 'flex-end' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </div>

      {/* tabs */}
      <div style={{
        display: 'flex', padding: '0 24px', borderBottom: `1px solid ${line}`,
      }}>
        <TierTab theme={theme} label="Connect+" active={!pro} variant={tier} serifAmpersand/>
        <TierTab theme={theme} label="Connect Pro" active={pro} variant={tier}/>
      </div>

      {/* hero image */}
      <div style={{
        margin: '20px 22px 0', borderRadius: 18, overflow: 'hidden',
        height: 170, position: 'relative',
        background: pro
          ? `linear-gradient(160deg, #3a2a24 0%, #141010 100%)`
          : `linear-gradient(160deg, oklch(0.68 0.06 230) 0%, oklch(0.48 0.09 260) 100%)`,
      }}>
        {/* textured overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 4px, transparent 4px 10px)`,
        }}/>
        {/* silhouette suggestion */}
        <svg style={{ position: 'absolute', inset: 0, opacity: pro ? 0.5 : 0.3 }} viewBox="0 0 390 170" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id={`g-${tier}`} cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor={pro ? '#2a2018' : '#6b5a4a'} stopOpacity="0.9"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          <rect width="390" height="170" fill={`url(#g-${tier})`}/>
          <circle cx="195" cy="180" r="100" fill={pro ? '#0d0a08' : '#1a1410'} opacity="0.4"/>
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 30px',
          fontFamily: displayFontFor(theme), fontSize: 24, fontWeight: 500,
          color: '#fff', textAlign: 'center', lineHeight: 1.15,
          letterSpacing: -0.2, whiteSpace: 'pre-line',
        }}>{heroTitle}</div>
      </div>

      {/* plan pills */}
      <div style={{
        display: 'flex', gap: 10, padding: '18px 22px 6px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {plans.map((p, i) => (
          <PlanCard key={i} plan={p} theme={theme} pro={pro} cardBg={cardBg} ink={ink} inkSoft={inkSoft} line={line}/>
        ))}
        {/* partial peek card */}
      </div>

      {/* features */}
      <div style={{ padding: '24px 22px 10px' }}>
        {pro
          ? proFeatures.map((f, i, a) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 0',
                borderBottom: i < a.length - 1 ? `0.5px solid ${line}` : 'none',
              }}>
                <ProFeatureThumb swatch={f.swatch} theme={theme}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600, color: ink }}>{f.t}</div>
                  <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: inkSoft, marginTop: 2 }}>{f.s}</div>
                </div>
              </div>
            ))
          : plusFeatures.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 999,
                  background: pro ? 'rgba(242,237,228,0.08)' : theme.color.placeholder,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <PlusFeatureIcon kind={f.i} color={ink}/>
                </div>
                <div style={{ fontFamily: theme.fontSans, fontSize: 16, color: ink }}>{f.t}</div>
              </div>
            ))}
      </div>

      {/* legal */}
      <div style={{ padding: '12px 22px 8px' }}>
        {!pro && (
          <>
            <div style={{ fontFamily: theme.fontSans, fontSize: 11, color: inkSoft, lineHeight: 1.4, textAlign: 'center' }}>
              *To send unlimited Likes, you may need to reply or end the chat where it's your turn.
              <div><span style={{ textDecoration: 'underline' }}>Learn more</span></div>
            </div>
            <div style={{ height: 1, background: line, margin: '14px 0' }}/>
          </>
        )}
        <div style={{ fontFamily: theme.fontSans, fontSize: 11, color: inkSoft, lineHeight: 1.5, textAlign: 'center' }}>
          *To send unlimited likes, you may need to reply or end the chat where it's your turn.<br/>
          <span style={{ textDecoration: 'underline' }}>Learn more</span> | You will be charged, your subscription will auto-renew for the same price and package length until you cancel via App Store settings, and you agree to our <span style={{ textDecoration: 'underline' }}>Terms</span>.
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '14px 22px 100px' }}>
        <button style={{
          width: '100%', padding: '18px 22px', borderRadius: 999,
          background: pro ? '#fff' : theme.color.accent,
          color: pro ? '#1a1612' : '#fff',
          border: 'none',
          fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600, cursor: 'pointer',
        }}>Get 3 months for {pro ? '$99.99' : '$89.99'}</button>
      </div>
    </div>
  );
}

function TierTab({ theme, label, active, variant, serifAmpersand }) {
  const pro = variant === 'pro';
  const activeCol = pro ? '#fff' : theme.color.accent;
  const muted = pro ? 'rgba(242,237,228,0.45)' : theme.color.inkSoft;
  return (
    <div style={{
      flex: 1, textAlign: 'center', padding: '14px 0 12px',
      position: 'relative',
      fontFamily: displayFontFor(theme), fontSize: 20, fontWeight: 500,
      color: active ? activeCol : muted,
      letterSpacing: -0.2,
    }}>
      {label}
      {active && (
        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: 2,
          background: activeCol,
        }}/>
      )}
    </div>
  );
}

function PlanCard({ plan, theme, pro, cardBg, ink, inkSoft, line }) {
  const selected = plan.selected;
  const accent = pro ? '#fff' : theme.color.accent;
  return (
    <div style={{
      flex: '0 0 23%', minWidth: 98, maxWidth: 108,
      borderRadius: 12, overflow: 'hidden',
      border: selected ? `2px solid ${accent}` : `1px solid ${line}`,
      background: cardBg,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '5px 0', textAlign: 'center',
        background: selected ? accent : (pro ? 'rgba(242,237,228,0.08)' : theme.color.placeholder),
        color: selected ? (pro ? '#1a1612' : '#fff') : (pro ? '#fff' : theme.color.ink),
        fontFamily: theme.fontSans, fontSize: 12, fontWeight: 600,
      }}>{plan.tag}</div>
      <div style={{
        flex: 1, padding: '10px 6px 12px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: theme.fontSans, fontSize: 14, fontWeight: 500, color: ink }}>{plan.dur}</div>
        <div style={{ fontFamily: theme.fontSans, fontSize: 12, color: inkSoft, marginTop: 4 }}>{plan.price}</div>
      </div>
    </div>
  );
}

function PlusFeatureIcon({ kind, color }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'inf')     return <svg {...common}><path d="M8 8a4 4 0 014 4 4 4 0 008 0 4 4 0 00-8 0 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4z"/></svg>;
  if (kind === 'person')  return <svg {...common}><circle cx="12" cy="8" r="3"/><path d="M6 20c0-3 3-6 6-6s6 3 6 6"/></svg>;
  if (kind === 'prefs')   return <svg {...common}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h14M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
  if (kind === 'star')    return <svg {...common}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/></svg>;
  if (kind === 'sort')    return <svg {...common}><path d="M5 7h14M7 12h10M9 17h6"/></svg>;
  return null;
}

function ProFeatureThumb({ swatch, theme }) {
  // warm toned gradient chips, each with a small glyph badge bottom-left
  const defs = {
    a: { g: `linear-gradient(140deg, oklch(0.62 0.08 40) 0%, oklch(0.4 0.07 30) 100%)`, glyph: 'sparkle' },
    b: { g: `linear-gradient(140deg, oklch(0.6 0.08 55) 0%, oklch(0.38 0.06 30) 100%)`, glyph: 'skip' },
    c: { g: `linear-gradient(140deg, oklch(0.58 0.09 60) 0%, oklch(0.35 0.07 45) 100%)`, glyph: 'heart' },
  };
  const d = defs[swatch];
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 999, overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      background: d.g,
    }}>
      <div style={{
        position: 'absolute', left: 3, bottom: 3,
        width: 20, height: 20, borderRadius: 999,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ProGlyph kind={d.glyph}/>
      </div>
    </div>
  );
}

function ProGlyph({ kind }) {
  const common = { width: 10, height: 10, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'sparkle') return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/></svg>;
  if (kind === 'skip')    return <svg {...common}><path d="M6 6l6 6-6 6M13 6l6 6-6 6"/></svg>;
  if (kind === 'heart')   return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>;
  return null;
}

Object.assign(window, { PaywallPlusScreen, PaywallProScreen });
