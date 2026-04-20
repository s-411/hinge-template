// Phone — a thin wrapper around a warm-themed iOS frame.
// We don't use the starter's built-in title/nav; each screen draws its own header
// because this app's editorial style doesn't match the iOS large-title pattern.

function Phone({ theme, children, label, dark, scale = 1 }) {
  const d = dark ?? theme.dark;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {label && (
        <div style={{
          fontFamily: theme.fontSans, fontSize: 13, fontWeight: 500,
          color: 'rgba(60,50,40,0.75)', marginBottom: 12, letterSpacing: 0.2,
        }}>{label}</div>
      )}
      <div data-screen-label={label} style={{
        width: 390 * scale, height: 844 * scale,
        borderRadius: 56 * scale, padding: 6 * scale,
        background: d ? '#0b0a09' : '#1a1612',
        boxShadow: '0 40px 80px rgba(0,0,0,0.2), 0 2px 0 rgba(255,255,255,0.06) inset',
        position: 'relative', flexShrink: 0,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 50 * scale,
          overflow: 'hidden', background: theme.color.bg,
          position: 'relative',
          fontFamily: theme.fontSans,
          color: theme.color.ink,
        }}>
          {/* Dynamic island */}
          <div style={{
            position: 'absolute', top: 11 * scale, left: '50%',
            transform: 'translateX(-50%)',
            width: 120 * scale, height: 34 * scale, borderRadius: 22 * scale,
            background: '#000', zIndex: 60,
          }} />
          {/* Status bar */}
          <StatusBar theme={theme} dark={d} />
          <div style={{ height: '100%', position: 'relative' }}>
            {children}
          </div>
          {/* Home indicator */}
          <div style={{
            position: 'absolute', bottom: 8 * scale, left: '50%',
            transform: 'translateX(-50%)',
            width: 134 * scale, height: 5 * scale, borderRadius: 100,
            background: d ? 'rgba(255,255,255,0.7)' : 'rgba(26,22,18,0.3)',
            zIndex: 70, pointerEvents: 'none',
          }} />
        </div>
      </div>
    </div>
  );
}

function StatusBar({ theme, dark, time = '10:41' }) {
  const c = dark ? '#fff' : '#1a1612';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 32px 0', zIndex: 50, pointerEvents: 'none',
    }}>
      <div style={{
        fontFamily: '-apple-system, "SF Pro Text", system-ui',
        fontWeight: 600, fontSize: 16, color: c, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        {time}
        <svg width="13" height="13" viewBox="0 0 24 24" fill={c}>
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* signal */}
        <svg width="18" height="11" viewBox="0 0 18 11">
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={i * 4.5} y={8 - i * 2.5} width="3" height={3 + i * 2.5}
              rx="0.5" fill={c} opacity={i < 2 ? 1 : 0.25}/>
          ))}
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M8 3c2.3 0 4.4.9 5.9 2.4l1.1-1.1C13.2 2.5 10.7 1.3 8 1.3S2.8 2.5 1 4.3l1.1 1.1C3.6 3.9 5.7 3 8 3zM8 6.6c1.4 0 2.6.5 3.5 1.4l1.1-1.1C11.3 5.7 9.7 4.9 8 4.9s-3.3.8-4.6 2l1.1 1.1c.9-.9 2.1-1.4 3.5-1.4zM8 10.3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="19" height="8" rx="1.8" fill={c}/>
          <path d="M24 4v4c.8-.3 1.4-1 1.4-2s-.6-1.7-1.4-2z" fill={c} opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Layout primitives reused across screens
// ─────────────────────────────────────────────────────────────

function ScreenBody({ children, theme, pad = true, scroll = true }) {
  return (
    <div style={{
      position: 'absolute', top: 54, left: 0, right: 0, bottom: 0,
      overflow: scroll ? 'auto' : 'hidden',
      padding: pad ? '0' : 0,
      background: theme.color.bg,
    }}>
      {children}
    </div>
  );
}

function ScreenHeader({ theme, title, left, right, borderBottom, center }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 22px 18px', gap: 12,
      borderBottom: borderBottom ? `0.5px solid ${theme.color.line}` : 'none',
      minHeight: 56, boxSizing: 'border-box',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{left}</div>
      <div style={{
        flex: center ? 2 : 0, textAlign: 'center',
        fontFamily: theme.fontSans, fontSize: 17, fontWeight: 600,
        color: theme.color.ink, letterSpacing: -0.2,
      }}>{title}</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

// Big editorial display title with tracker dots above
function StepTitle({ theme, title, icon, step, total }) {
  return (
    <div style={{ padding: '28px 28px 24px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: 999, background: theme.color.ink,
          flexShrink: 0,
        }}/>
        <span style={{
          width: 44, height: 44, borderRadius: 999,
          border: `1.5px solid ${theme.color.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: theme.color.bg, color: theme.color.ink, flexShrink: 0,
        }}>{icon}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} style={{
              width: 5, height: 5, borderRadius: 999,
              background: i === step ? theme.color.ink : theme.color.inkMute,
              opacity: i === step ? 1 : 0.3,
            }} />
          ))}
        </div>
      </div>
      <h1 style={{
        fontFamily: displayFontFor(theme),
        fontSize: 38, lineHeight: 1.05, fontWeight: 500,
        color: theme.color.ink, letterSpacing: -0.5, margin: 0,
        textWrap: 'pretty',
      }}>{title}</h1>
    </div>
  );
}

// Bottom right circular nav arrow (forward)
function ArrowFAB({ theme, enabled = true, onClick, direction = 'right' }) {
  const bg = enabled ? theme.color.accent : theme.color.placeholder;
  const col = enabled ? '#fff' : theme.color.inkMute;
  return (
    <button onClick={onClick} style={{
      position: 'absolute', right: 24, bottom: 30,
      width: 60, height: 60, borderRadius: 999,
      background: bg, border: 'none', cursor: enabled ? 'pointer' : 'default',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: enabled ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
      transition: 'all 0.2s',
    }}>
      {direction === 'right'
        ? <IconChev size={22} color={col} stroke={2}/>
        : <IconChevL size={22} color={col} stroke={2}/>}
    </button>
  );
}

function TabBar({ theme, active = 'profile', onNavigate, badges = {} }) {
  const tabs = [
    { id: 'discover', icon: <Logo size={22} color={active === 'discover' ? '#fff' : theme.color.inkMute}/> },
    { id: 'standouts', icon: <IconStar size={22} color={active === 'standouts' ? '#fff' : theme.color.inkMute}/> },
    { id: 'likes', icon: <IconHeart size={22} color={active === 'likes' ? '#fff' : theme.color.inkMute}/> },
    { id: 'chats', icon: <IconChat size={22} color={active === 'chats' ? '#fff' : theme.color.inkMute}/> },
    { id: 'profile', icon: null },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 84,
      background: '#1a1612',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      paddingBottom: 24, zIndex: 40,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNavigate?.(t.id)} style={{
          background: 'none', border: 'none', padding: '10px 14px',
          cursor: 'pointer', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: active === t.id ? 1 : 0.6,
        }}>
          {t.id === 'profile' ? (
            <div style={{
              width: 30, height: 30, borderRadius: 999,
              border: active === 'profile' ? `2px solid #fff` : 'none',
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${theme.color.accentSoft} 0%, ${theme.color.accent} 100%)`,
            }}>
              <ProfileAvatar size={30} seed="sarah" />
            </div>
          ) : t.icon}
          {badges[t.id] && (
            <span style={{
              position: 'absolute', top: 6, right: 4,
              background: theme.color.accent, color: '#fff',
              fontSize: 11, fontWeight: 600,
              minWidth: 16, height: 16, borderRadius: 999,
              padding: '0 5px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{badges[t.id]}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// A wordmark made of geometric strokes. Original, not Hinge's.
function Logo({ size = 22, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4v16M20 4v16M4 12h16" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2.5" fill={color}/>
    </svg>
  );
}

// Illustrated avatar placeholder — warm tonal circle with geometric face
function ProfileAvatar({ size = 60, seed = 'a', variant = 'default' }) {
  const seedNum = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = (seedNum * 37) % 360;
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, overflow: 'hidden',
      background: `oklch(0.78 0.05 ${hue})`,
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(160deg, oklch(0.82 0.06 ${hue}) 0%, oklch(0.68 0.08 ${(hue + 20) % 360}) 100%)`,
      }}/>
      <div style={{
        position: 'absolute', left: '50%', top: '55%',
        transform: 'translate(-50%, -40%)',
        width: size * 0.5, height: size * 0.5, borderRadius: 999,
        background: `oklch(0.62 0.09 ${(hue + 15) % 360})`,
      }}/>
    </div>
  );
}

Object.assign(window, {
  Phone, StatusBar, ScreenBody, ScreenHeader, StepTitle, ArrowFAB, TabBar, Logo, ProfileAvatar,
});
