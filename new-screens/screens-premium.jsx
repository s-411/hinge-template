// screens-premium.jsx — Preferred paywall, subscription carousel, Rose upsell, Matches empty, Prompt Guide, Profile detail

function PreferredPaywallScreen({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <ScreenBody theme={theme}>
        <div style={{
          padding: '60px 28px 0', display: 'flex', justifyContent: 'center',
        }}>
          <PreferredIllo theme={theme} size={200}/>
        </div>
        <h1 style={{
          fontFamily: displayFontFor(theme), fontSize: 34, fontWeight: 600,
          color: theme.color.ink, textAlign: 'center', margin: '30px 28px 26px',
          letterSpacing: -0.3, lineHeight: 1.05,
        }}>Meet your person<br/>sooner with Preferred</h1>
        <div style={{ padding: '0 28px' }}>
          {['Send unlimited likes', 'See everyone who likes you', 'Set extra preferences', 'See 2× Standouts'].map((l, i, a) => (
            <div key={l} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 0',
              borderTop: i === 0 ? `0.5px solid ${theme.color.line}` : 'none',
              borderBottom: `0.5px solid ${theme.color.line}`,
              fontFamily: theme.fontSans, fontSize: 15, color: theme.color.ink,
            }}>
              {l}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.color.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-11"/></svg>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', padding: '30px 0 0', fontFamily: theme.fontSans, fontSize: 15, fontWeight: 600, color: theme.color.accent }}>Maybe later</div>
      </ScreenBody>
      <div style={{
        background: theme.color.accent, padding: '22px 0 36px',
        textAlign: 'center', fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600, color: '#fff',
      }}>Check it out</div>
    </div>
  );
}

function PreferredIllo({ theme, size = 180 }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 220 190">
      <circle cx="135" cy="78" r="62" fill={theme.color.accentSoft}/>
      {/* stack of papers */}
      <path d="M40 80 L150 75 L155 165 L50 170 Z" fill={theme.color.bgElev} stroke={theme.color.ink} strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M55 90 L145 85 L148 158 L62 162 Z" fill="none" stroke={theme.color.ink} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M70 72 L65 95 L75 92 Z" fill={theme.color.ink}/>
      <path d="M110 68 L105 92 L115 88 Z" fill={theme.color.ink}/>
      {/* face peek */}
      <circle cx="28" cy="60" r="10" fill="none" stroke={theme.color.ink} strokeWidth="2"/>
      <path d="M22 58q2 -1 4 0M30 58q2 -1 4 0" stroke={theme.color.ink} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M24 66q2 1 6 0" stroke={theme.color.ink} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M22 70q4 2 10 2" stroke={theme.color.ink} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function SubscriptionCarouselScreen({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${theme.color.bg} 0%, ${theme.color.accentSoft} 100%)` }}>
      <div style={{ padding: '70px 20px 0', fontFamily: theme.fontSans, fontSize: 11, color: theme.color.ink, lineHeight: 1.5 }}>
        <span style={{ fontWeight: 700 }}>Recurring billing, cancel anytime.</span><br/>
        By tapping Subscribe, your payment will be charged to your<br/>
        Connect account, and your subscription will automatically<br/>
        renew for the same package length at the same price until you<br/>
        cancel in settings. By tapping Subscribe you agree to our <span style={{ color: theme.color.accent, fontWeight: 600 }}>Terms</span>.
      </div>
      <div style={{
        margin: '14px 16px 0', background: theme.color.bgElev, borderRadius: 18,
        padding: '16px 20px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.accent, fontWeight: 600 }}>Restore subscription</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <PreferredIllo theme={theme} size={130}/>
        </div>
        <h2 style={{
          fontFamily: displayFontFor(theme), fontSize: 28, fontWeight: 600,
          color: theme.color.ink, margin: '0 0 6px', letterSpacing: -0.3, lineHeight: 1.1,
        }}>Preferred Members<br/>get twice as many<br/>dates.</h2>
        <div style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkSoft, marginBottom: 10 }}>Here's why…</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[true, false, false, false, false].map((a, i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: a ? theme.color.ink : theme.color.line }}/>
          ))}
        </div>
        {[
          { n: 1, unit: 'month', price: '$29.99', per: '', rec: false },
          { n: 3, unit: 'months', price: '$59.99', per: '($19.99/mo)', rec: true },
          { n: 6, unit: 'months', price: '$89.99', per: '($14.99/mo)', rec: false },
        ].map(o => (
          <div key={o.n} style={{
            display: 'flex', alignItems: 'center', padding: '14px 4px',
            borderTop: `0.5px solid ${theme.color.line}`, position: 'relative',
          }}>
            <div style={{ fontFamily: displayFontFor(theme), fontSize: 30, fontWeight: 500, color: theme.color.ink, marginRight: 10, letterSpacing: -0.5 }}>{o.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.ink }}>{o.unit}</div>
              <div style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkSoft }}>{o.price} {o.per}</div>
            </div>
            {o.rec && (
              <span style={{
                background: theme.color.accent, color: '#fff',
                padding: '5px 12px', borderRadius: 999,
                fontFamily: theme.fontSans, fontSize: 12, fontWeight: 600, marginRight: 8,
              }}>Recommended</span>
            )}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.color.inkMute} strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoveryPhotoScreen({ theme, onNavigate }) {
  return (
    <>
      <ScreenHeader theme={theme}
        left={<span/>} title=""
        right={
          <div style={{ display: 'flex', gap: 18 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9c0-2 2-4 4-4h8a4 4 0 014 4v6a4 4 0 01-4 4h-6M4 9l-2 2 2 2M4 9v4"/></svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h10M4 12h6M4 18h14"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="12" r="2"/></svg>
          </div>
        }
      />
      <ScreenBody theme={theme}>
        <div style={{ padding: '4px 22px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ fontFamily: displayFontFor(theme), fontSize: 30, fontWeight: 500, color: theme.color.ink, margin: 0, letterSpacing: -0.3 }}>Drew</h2>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: theme.color.sage, fontSize: 13, fontWeight: 500 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: theme.color.sage }}/>
            Active today
          </span>
          <div style={{ flex: 1 }}/>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={theme.color.ink}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
        </div>
        <div style={{
          margin: '0 22px', borderRadius: 16, overflow: 'hidden', position: 'relative',
          aspectRatio: '1 / 1.15',
          background: `linear-gradient(160deg, oklch(0.88 0.03 60) 0%, oklch(0.76 0.05 40) 100%)`,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0 4px, transparent 4px 10px)`,
          }}/>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.25)', fontSize: 11, letterSpacing: 1, fontFamily: 'ui-monospace, Menlo, monospace' }}>PORTRAIT PLACEHOLDER</div>
          <button style={{
            position: 'absolute', right: 14, bottom: 14,
            width: 44, height: 44, borderRadius: 999,
            background: theme.color.bgElev, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.color.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>
          </button>
        </div>
        <div style={{ margin: '16px 22px 0', background: theme.color.bgCard, borderRadius: 16, padding: '22px 22px 30px' }}>
          <div style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.ink }}>The hallmark of a good relationship is</div>
          <div style={{ fontFamily: displayFontFor(theme), fontSize: 28, fontWeight: 500, color: theme.color.ink, marginTop: 10, lineHeight: 1.1, letterSpacing: -0.3 }}>A good flirt to roast ratio</div>
        </div>
        <div style={{ height: 120 }}/>
        <button style={{
          position: 'absolute', left: 22, bottom: 104,
          width: 48, height: 48, borderRadius: 999, background: theme.color.bgElev,
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </ScreenBody>
      <TabBar theme={theme} active="discover" onNavigate={onNavigate}/>
    </>
  );
}

function RoseUpsellScreen({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(100,85,70,0.3)', filter: 'blur(2px)' }}/>
      <div style={{
        position: 'absolute', left: 22, right: 22, top: 150, padding: 20,
        background: theme.color.bgCard, borderRadius: 16, opacity: 0.6,
      }}>
        <div style={{ fontFamily: displayFontFor(theme), fontSize: 32, fontWeight: 500, color: theme.color.ink }}>Zlata</div>
        <div style={{ background: theme.color.bg, borderRadius: 12, padding: 16, marginTop: 16 }}>
          <div style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.ink }}>The way to win m…</div>
        </div>
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: theme.color.bgElev,
        borderRadius: '28px 28px 0 0', padding: '44px 28px 46px', textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)',
          width: 64, height: 64, borderRadius: 999,
          background: theme.color.accentSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={theme.color.accentDeep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14v7"/><path d="M12 14c-4 0-7-3-7-7 4 0 7 3 7 7z"/><path d="M12 14c4 0 7-3 7-7-4 0-7 3-7 7z"/></svg>
        </div>
        <h2 style={{ fontFamily: displayFontFor(theme), fontSize: 32, fontWeight: 600, color: theme.color.ink, margin: '0 0 12px', letterSpacing: -0.3 }}>Send a Bloom instead?</h2>
        <p style={{ fontFamily: theme.fontSans, fontSize: 15, color: theme.color.inkSoft, lineHeight: 1.4, margin: '0 0 28px' }}>Upgrade your Like to a Bloom to be<br/>seen first and increase your chance<br/>of a match.</p>
        <button style={{
          width: '100%', padding: '18px 22px', borderRadius: 999,
          background: theme.color.accent, color: '#fff', border: 'none',
          fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600, cursor: 'pointer',
          marginBottom: 18,
        }}>Send a Bloom</button>
        <div style={{ fontFamily: theme.fontSans, fontSize: 15, fontWeight: 600, color: theme.color.accent }}>Send Like anyway</div>
      </div>
    </div>
  );
}

function MatchesEmptyScreen({ theme, onNavigate }) {
  return (
    <>
      <ScreenHeader theme={theme}
        left={<h1 style={{ fontFamily: displayFontFor(theme), fontSize: 30, fontWeight: 500, color: theme.color.ink, margin: 0, letterSpacing: -0.3 }}>Matches</h1>}
        title="" right={<span/>}
      />
      <ScreenBody theme={theme}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 40px 0' }}>
          <svg width="180" height="130" viewBox="0 0 180 130">
            <path d="M20 28 L110 22 L115 88 L50 92 L35 104 L32 90 L22 90 Z" fill="none" stroke={theme.color.ink} strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M70 42 L118 38 L120 100 L108 110 L108 98 L160 92 L158 50 L114 54" fill={theme.color.sageSoft} fillOpacity="0.8" stroke={theme.color.ink} strokeWidth="2.5" strokeLinejoin="round"/>
            <path d="M30 42h50M30 52h60M30 62h45M80 56h60M80 66h70M80 76h50" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <div style={{ fontFamily: theme.fontSans, fontSize: 17, fontWeight: 600, color: theme.color.ink, marginTop: 28, textAlign: 'center' }}>You're new here! No matches yet.</div>
          <div style={{ fontFamily: theme.fontSans, fontSize: 15, color: theme.color.inkSoft, marginTop: 10, textAlign: 'center', lineHeight: 1.4 }}>When a Like turns into a connection, you can<br/>chat here.</div>
          <button style={{
            marginTop: 30, padding: '16px 26px', borderRadius: 999,
            background: theme.color.sage, color: '#fff', border: 'none',
            fontFamily: theme.fontSans, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>Try boosting your profile</button>
        </div>
      </ScreenBody>
      <TabBar theme={theme} active="chats" onNavigate={onNavigate}/>
    </>
  );
}

function PromptGuideScreen({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <ScreenHeader theme={theme}
        left={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>}
        title="Prompt Guide" center right={<span/>} borderBottom
      />
      <ScreenBody theme={theme}>
        <div style={{
          background: theme.color.placeholder, padding: '30px 28px 42px', textAlign: 'center',
        }}>
          <svg width="150" height="110" viewBox="0 0 150 110" style={{ margin: '0 auto' }}>
            <path d="M15 22 L80 18 L82 68 L38 72 L28 80 L26 70 L17 70 Z" fill="none" stroke={theme.color.ink} strokeWidth="2" strokeLinejoin="round"/>
            <path d="M28 34h40M28 44h45M28 54h30" stroke={theme.color.ink} strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M85 50 L118 46 L120 78 L100 82 L95 92 L92 80 L86 80z" fill="none" stroke={theme.color.ink} strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="115" cy="34" r="14" fill={theme.color.bg} stroke={theme.color.ink} strokeWidth="2"/>
            <path d="M105 34q5 -4 20 0" stroke={theme.color.ink} strokeWidth="2" fill="none"/>
            <path d="M110 36q0 2 1 3M120 36q0 2 1 3" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M108 40q6 3 14 0" stroke={theme.color.ink} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            <path d="M100 50q14 4 30 0" stroke={theme.color.ink} strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
          <h2 style={{ fontFamily: displayFontFor(theme), fontSize: 26, fontWeight: 600, color: theme.color.ink, margin: '18px 0 10px' }}>Prompt Guide</h2>
          <p style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkSoft, lineHeight: 1.45, margin: 0 }}>Put your best foot forward by creating a<br/>profile that brings out the real you.</p>
        </div>
        <div style={{
          margin: '16px 22px', background: theme.color.bgElev,
          borderRadius: 16, padding: '24px 24px 28px', textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontFamily: theme.fontSans, fontSize: 11, fontWeight: 700, color: theme.color.inkMute, letterSpacing: 1.5 }}>TIP 1/3</div>
          <h3 style={{ fontFamily: displayFontFor(theme), fontSize: 26, fontWeight: 600, color: theme.color.ink, margin: '12px 0', lineHeight: 1.1 }}>Choose a range of<br/>prompt questions</h3>
          <p style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkSoft, lineHeight: 1.45, margin: 0 }}>Highlight your personality and dating<br/>intentions by answering different<br/>prompt themes.</p>
        </div>
      </ScreenBody>
      <div style={{
        background: theme.color.accent, padding: '22px 0 36px',
        textAlign: 'center', fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600, color: '#fff',
      }}>Update Prompts</div>
    </div>
  );
}

function ProfileDetailScreen({ theme }) {
  return (
    <>
      <ScreenHeader theme={theme}
        left={<span/>} title="Bridget" center
        right={<svg width="22" height="22" viewBox="0 0 24 24" fill={theme.color.ink}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>}
        borderBottom
      />
      <ScreenBody theme={theme}>
        {/* photo top */}
        <div style={{
          margin: '0 22px', borderRadius: 16, overflow: 'hidden',
          height: 110, position: 'relative',
          background: `linear-gradient(160deg, oklch(0.85 0.04 210) 0%, oklch(0.72 0.06 220) 100%)`,
        }}>
          <button style={{
            position: 'absolute', right: 12, bottom: 12,
            width: 40, height: 40, borderRadius: 999, background: theme.color.bgElev, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>
          </button>
        </div>
        {/* prompt card */}
        <div style={{ margin: '12px 22px', background: theme.color.bgCard, borderRadius: 16, padding: '20px 20px 24px', position: 'relative' }}>
          <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.ink }}>My greatest strength</div>
          <div style={{ fontFamily: displayFontFor(theme), fontSize: 36, fontWeight: 500, color: theme.color.ink, marginTop: 10, letterSpacing: -0.5, lineHeight: 1 }}>positivity</div>
          <button style={{
            position: 'absolute', right: 14, bottom: 14,
            width: 36, height: 36, borderRadius: 999, background: theme.color.bgElev,
            border: `0.5px solid ${theme.color.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.color.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>
          </button>
        </div>
        {/* stats row */}
        <div style={{
          margin: '12px 22px', background: theme.color.bgCard, borderRadius: 16,
          padding: '14px 4px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          borderBottom: `0.5px solid ${theme.color.line}`,
        }}>
          {[
            { i: <svg width="16" height="16" viewBox="0 0 24 24" fill={theme.color.ink}><circle cx="12" cy="6" r="3"/><path d="M6 19c0-4 3-7 6-7s6 3 6 7"/></svg>, l: '25' },
            { i: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6"><rect x="9" y="3" width="6" height="18" rx="1"/></svg>, l: `5' 8"` },
            { i: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2"/></svg>, l: 'Lower East Side' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: theme.fontSans, fontSize: 14, color: theme.color.ink }}>
              {c.i}{c.l}
            </div>
          ))}
        </div>
        {/* facts list */}
        <div style={{ margin: '0 22px', background: theme.color.bgCard, borderRadius: 16 }}>
          {[
            { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2"/></svg>, l: 'Personal Trainer' },
            { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l10 4-10 4-10-4 10-4zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>, l: 'University of Minnesota - Twin\nCities Campus' },
            { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l10 4-10 4-10-4 10-4zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>, l: 'Institute of Culinary Education' },
            { i: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z"/></svg>, l: 'Lake Geneva, WI' },
          ].map((row, i, a) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              padding: '16px 20px',
              borderBottom: i < a.length - 1 ? `0.5px solid ${theme.color.line}` : 'none',
              fontFamily: theme.fontSans, fontSize: 15, color: theme.color.ink, whiteSpace: 'pre-line', lineHeight: 1.35,
            }}>
              <div style={{ paddingTop: 2 }}>{row.i}</div>
              {row.l}
            </div>
          ))}
        </div>
        <div style={{ height: 20 }}/>
        <div style={{
          margin: '0 22px', borderRadius: 16, overflow: 'hidden',
          height: 100, position: 'relative',
          background: `linear-gradient(160deg, oklch(0.85 0.08 220) 0%, oklch(0.75 0.1 230) 100%)`,
        }}/>
        <div style={{ height: 80 }}/>
        <button style={{
          position: 'absolute', left: 22, bottom: 30,
          width: 48, height: 48, borderRadius: 999, background: theme.color.bgElev, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </ScreenBody>
    </>
  );
}

Object.assign(window, {
  PreferredPaywallScreen, PreferredIllo, SubscriptionCarouselScreen,
  DiscoveryPhotoScreen, RoseUpsellScreen, MatchesEmptyScreen,
  PromptGuideScreen, ProfileDetailScreen,
});
