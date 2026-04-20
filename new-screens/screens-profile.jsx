// screens-profile.jsx — profile, preferences, discovery, boost, likes, what-works

function ProfileScreen({ theme, onNavigate }) {
  return (
    <>
      <ScreenHeader theme={theme}
        title=""
        left={<h1 style={{
          fontFamily: displayFontFor(theme), fontSize: 32, fontWeight: 500,
          color: theme.color.ink, margin: 0, letterSpacing: -0.3,
        }}>Profile</h1>}
        right={<BoostPill theme={theme}/>}
        borderBottom
      />
      <ScreenBody theme={theme}>
        <div style={{ padding: '36px 0 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 140, height: 140, borderRadius: 999,
            border: `2px solid ${theme.color.accent}`,
            padding: 5, background: theme.color.bg,
            position: 'relative',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 999,
              background: `linear-gradient(160deg, oklch(0.85 0.05 35) 0%, oklch(0.65 0.08 30) 100%)`,
              position: 'relative', overflow: 'hidden',
            }}>
              <ProfileAvatar size={130} seed="sarah"/>
            </div>
            <span style={{
              position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
              width: 36, height: 36, borderRadius: 999,
              background: theme.color.bgElev,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}>
              <IconPencil size={16} color={theme.color.ink} stroke={1.6}/>
            </span>
          </div>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 22, fontWeight: 600,
            color: theme.color.ink, marginTop: 28,
          }}>Sarah</div>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkSoft,
            marginTop: 4, display: 'flex', alignItems: 'center', gap: 5,
          }}>
            Connect Member
            <svg width="14" height="14" viewBox="0 0 24 24" fill={theme.color.sage}>
              <path d="M12 2l2 2 3-.5.5 3 2 2-2 2-.5 3-3-.5-2 2-2-2-3 .5-.5-3-2-2 2-2 .5-3 3 .5 2-2z"/>
              <path d="M8 12l3 3 5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ margin: '14px 22px 0' }}>
          {[
            { label: 'Dating Preferences', icon: <IconSliders size={22} color={theme.color.ink} stroke={1.6}/>, go: 'preferences' },
            { label: 'Settings', icon: <IconGear size={22} color={theme.color.ink} stroke={1.6}/> },
            { label: 'What Works', icon: <IconBulb size={22} color={theme.color.ink} stroke={1.6}/>, go: 'whatworks' },
          ].map((row, i, arr) => (
            <button key={row.label} onClick={() => row.go && onNavigate?.(row.go)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '22px 0', background: 'none', border: 'none',
              borderBottom: i < arr.length - 1 ? `0.5px solid ${theme.color.line}` : 'none',
              cursor: 'pointer', fontFamily: theme.fontSans,
              fontSize: 17, color: theme.color.ink,
            }}>
              {row.label}
              {row.icon}
            </button>
          ))}
        </div>
        {/* Upsell bar */}
        <div style={{
          margin: '28px 22px 110px', padding: '14px 16px',
          background: theme.color.bgElev,
          borderRadius: 999,
          display: 'flex', alignItems: 'center', gap: 14,
          border: `0.5px solid ${theme.color.line}`,
        }}>
          <button style={{
            background: theme.color.ink, color: theme.color.bg,
            padding: '10px 18px', borderRadius: 999, border: 'none',
            fontFamily: theme.fontSans, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', flexShrink: 0,
          }}>Learn more</button>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 13, color: theme.color.ink, lineHeight: 1.35,
          }}>Preferred Members go on twice as many dates.</div>
        </div>
      </ScreenBody>
      <TabBar theme={theme} active="profile" onNavigate={onNavigate} badges={{ likes: 3, chats: 1 }}/>
    </>
  );
}

function BoostPill({ theme }) {
  return (
    <button style={{
      background: theme.color.sageSoft, border: 'none',
      padding: '9px 16px', borderRadius: 999,
      display: 'flex', alignItems: 'center', gap: 6,
      fontFamily: theme.fontSans, fontSize: 14, fontWeight: 600,
      color: theme.color.ink, cursor: 'pointer',
    }}>
      <IconBolt size={15} color={theme.color.sage} fill={theme.color.sage} stroke={1.5}/>
      Boost
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Dating preferences
// ─────────────────────────────────────────────────────────────
function PreferencesScreen({ theme, onNavigate }) {
  return (
    <>
      <ScreenHeader theme={theme}
        title="Dating Preferences"
        left={<span/>}
        right={<IconX size={22} color={theme.color.ink} stroke={1.6}/>}
        center borderBottom
      />
      <ScreenBody theme={theme}>
        <div style={{ padding: '22px 22px 10px' }}>
          <SectionLabel theme={theme}>Member Preferences</SectionLabel>
          <PrefRow theme={theme} label="I'm interested in" detail="Men"/>
          <PrefRow theme={theme} label="My neighborhood" detail="Brighton"/>
          <PrefRow theme={theme} label="Maximum distance" detail="80 mi"/>
          <PrefRow theme={theme} label="Age range" detail="28 – 51" trailingLabel="Dealbreaker"/>
          <PrefRow theme={theme} label="Ethnicity" detail="Open to all"/>
          <PrefRow theme={theme} label="Religion" detail="Open to all" last/>
        </div>
        <div style={{ padding: '18px 22px 8px' }}>
          <SectionLabel theme={theme}>Subscriber Preferences</SectionLabel>
          <div style={{
            background: theme.color.accentSoft, borderRadius: 14,
            padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
            marginTop: 10, marginBottom: 10,
          }}>
            <button style={{
              background: theme.color.bgElev, color: theme.color.accent,
              padding: '8px 16px', borderRadius: 999, border: 'none',
              fontFamily: theme.fontSans, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', flexShrink: 0,
            }}>Upgrade</button>
            <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.ink, lineHeight: 1.35 }}>
              Fine tune your preferences with a subscription.
            </div>
          </div>
          <PrefRow theme={theme} label="Height" detail={`3' 0" — 7' 0"`} locked/>
          <PrefRow theme={theme} label="Children" detail="Open to all" locked last/>
        </div>
        <div style={{ height: 60 }}/>
      </ScreenBody>
    </>
  );
}

function SectionLabel({ theme, children }) {
  return (
    <div style={{
      fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkMute,
      padding: '8px 0 12px', fontWeight: 500, letterSpacing: 0.1,
    }}>{children}</div>
  );
}

function PrefRow({ theme, label, detail, locked, trailingLabel, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '16px 0',
      borderBottom: last ? 'none' : `0.5px solid ${theme.color.line}`,
      gap: 10,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: theme.fontSans, fontSize: 17, fontWeight: 500, color: theme.color.ink,
        }}>{label}</div>
        <div style={{
          fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkSoft, marginTop: 3,
        }}>{detail}</div>
      </div>
      {trailingLabel && (
        <span style={{
          fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkMute, marginRight: 4,
        }}>{trailingLabel}</span>
      )}
      {locked ? <IconLock size={18} color={theme.color.ink} stroke={1.6}/>
              : <IconChev size={16} color={theme.color.inkMute} stroke={2}/>}
    </div>
  );
}

Object.assign(window, { ProfileScreen, BoostPill, PreferencesScreen });
