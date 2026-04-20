// screens-onboarding-more.jsx — Name, DOB, Confirm, Notifications, Location, Height, Family

function NameScreen({ theme }) {
  return (
    <>
      <ScreenBody theme={theme} scroll={false}>
        <StepTitle theme={theme}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/></svg>}
          title="What's your name?" step={0} total={16}
        />
        <div style={{ padding: '14px 28px 0' }}>
          <div style={{
            borderBottom: `1px solid ${theme.color.ink}`,
            padding: '6px 0 8px', marginBottom: 26,
          }}>
            <div style={{
              fontFamily: displayFontFor(theme), fontSize: 22,
              fontStyle: 'italic', color: theme.color.inkMute, fontWeight: 400,
            }}>First name (required)</div>
          </div>
          <div style={{
            borderBottom: `1px solid ${theme.color.ink}`,
            padding: '6px 0 8px', marginBottom: 20,
          }}>
            <div style={{
              fontFamily: displayFontFor(theme), fontSize: 22,
              fontStyle: 'italic', color: theme.color.inkMute, fontWeight: 400,
            }}>Last name</div>
          </div>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkSoft, lineHeight: 1.5,
          }}>Last name is optional, and only shared with matches. <span style={{ color: theme.color.accent, fontWeight: 600 }}>Why?</span></div>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled={false}/>
    </>
  );
}

function DateOfBirthScreen({ theme }) {
  const months = ['Mar','Apr','May','Jun','Jul'];
  const days = [28, 29, 30, 31, '  '];
  const years = ['    ', '    ', 2022, 2021, 2020];
  const Col = ({ items, center = 2, width }) => (
    <div style={{ flex: 1, position: 'relative', height: 260 }}>
      {items.map((v, i) => {
        const dist = Math.abs(i - center);
        const op = dist === 0 ? 1 : dist === 1 ? 0.35 : 0.15;
        const sz = dist === 0 ? 28 : dist === 1 ? 22 : 18;
        return (
          <div key={i} style={{
            position: 'absolute', left: 0, right: 0, top: i * 52,
            textAlign: 'center',
            fontFamily: theme.fontSans, fontSize: sz, fontWeight: dist === 0 ? 600 : 400,
            color: theme.color.ink, opacity: op,
          }}>{v}</div>
        );
      })}
    </div>
  );
  return (
    <>
      <ScreenBody theme={theme} scroll={false}>
        <StepTitle theme={theme}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v4M10 8h4M8 10h8l-1 10H9L8 10z"/></svg>}
          title="What's your date of birth?" step={1} total={16}
        />
        <div style={{ padding: '10px 36px 0', position: 'relative' }}>
          {/* highlight band */}
          <div style={{
            position: 'absolute', left: 28, right: 28, top: 104, height: 52,
            background: theme.color.placeholder, borderRadius: 2,
            borderTop: `1px solid ${theme.color.accent}`,
            borderBottom: `1px solid ${theme.color.accent}`,
            opacity: 0.5,
          }}/>
          <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
            <Col items={months} />
            <Col items={days} />
            <Col items={years} />
          </div>
        </div>
        <div style={{
          padding: '20px 28px 0', borderTop: `0.5px solid ${theme.color.line}`,
          margin: '30px 28px 0', textAlign: 'center',
        }}>
          <div style={{ fontFamily: theme.fontSans, fontSize: 18, fontWeight: 600, color: theme.color.ink }}>Age 0</div>
          <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkMute, marginTop: 4 }}>This can't be changed later</div>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled={false}/>
    </>
  );
}

function ConfirmInfoScreen({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(180,172,160,0.6)', filter: 'blur(1px)' }}/>
      <div style={{
        position: 'absolute', left: 22, right: 22, top: '32%',
        background: theme.color.bgElev, borderRadius: 18,
        boxShadow: '0 20px 40px rgba(0,0,0,0.18)', overflow: 'hidden',
      }}>
        <div style={{ padding: '28px 28px 24px' }}>
          <h2 style={{
            fontFamily: displayFontFor(theme), fontSize: 30, fontWeight: 600,
            color: theme.color.ink, margin: 0, letterSpacing: -0.3, lineHeight: 1.1,
          }}>Please confirm<br/>your info</h2>
          <div style={{ marginTop: 22, fontFamily: theme.fontSans, fontSize: 16, color: theme.color.ink, lineHeight: 1.5 }}>
            27 years old<br/>Born March 28, 1995
          </div>
        </div>
        <div style={{ display: 'flex', borderTop: `0.5px solid ${theme.color.line}` }}>
          <div style={{
            flex: 1, textAlign: 'center', padding: '18px 0',
            fontFamily: theme.fontSans, fontSize: 16, color: theme.color.ink, fontWeight: 500,
            borderRight: `0.5px solid ${theme.color.line}`,
          }}>Edit</div>
          <div style={{
            flex: 1, textAlign: 'center', padding: '18px 0',
            fontFamily: theme.fontSans, fontSize: 16, color: theme.color.accent, fontWeight: 600,
          }}>Confirm</div>
        </div>
      </div>
    </div>
  );
}

function NotificationsScreen({ theme, dialog = false }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ScreenBody theme={theme} scroll={false}>
        <StepTitle theme={theme}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7c0-2 1-4 4-4h6c3 0 4 2 4 4v8a2 2 0 01-2 2h-9l-3 3V7z"/><circle cx="12" cy="11" r="1.2" fill={theme.color.ink}/></svg>}
          title={<>Never miss a message<br/>from someone great</>} step={1} total={16}
        />
        <div style={{ padding: '10px 28px', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <button style={{
            padding: '12px 24px', borderRadius: 999,
            background: dialog ? theme.color.accent : theme.color.placeholder,
            color: dialog ? '#fff' : theme.color.ink,
            border: 'none', fontFamily: theme.fontSans, fontSize: 15, fontWeight: 500, cursor: 'pointer',
          }}>Enable notifications</button>
          <button style={{
            padding: '12px 24px', borderRadius: 999,
            background: theme.color.placeholder, color: theme.color.ink,
            border: 'none', fontFamily: theme.fontSans, fontSize: 15, fontWeight: 500, cursor: 'pointer',
            opacity: dialog ? 0.6 : 1,
          }}>Disable notifications</button>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled={dialog}/>
      {dialog && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(40,30,25,0.3)' }}/>
          <div style={{
            position: 'absolute', left: 30, right: 30, top: 310,
            background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(20px)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 22px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: theme.fontSans, fontSize: 15, fontWeight: 600, color: theme.color.ink, marginBottom: 6 }}>"Connect" Would Like to Send You Notifications</div>
              <div style={{ fontFamily: theme.fontSans, fontSize: 12, color: theme.color.ink, lineHeight: 1.4 }}>Notifications may include alerts,<br/>sounds, and icon badges. These can<br/>be configured in Settings.</div>
            </div>
            <div style={{ display: 'flex', borderTop: `0.5px solid rgba(0,0,0,0.2)` }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', color: '#0A7AFF', fontFamily: theme.fontSans, fontSize: 16, borderRight: `0.5px solid rgba(0,0,0,0.2)` }}>Don't Allow</div>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px 0', color: '#0A7AFF', fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600 }}>Allow</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LocationScreen({ theme }) {
  return (
    <>
      <ScreenBody theme={theme} scroll={false}>
        <StepTitle theme={theme}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>}
          title="Where do you live?" step={2} total={16}
        />
        <div style={{ margin: '0 28px', borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '1 / 1.05' }}>
          {/* schematic map */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse at 80% 70%, #a8d4e8 0%, #a8d4e8 35%, transparent 36%),
              radial-gradient(ellipse at 20% 90%, #a8d4e8 0%, #a8d4e8 25%, transparent 26%),
              linear-gradient(180deg, #e8ebdd 0%, #dde4d2 100%)
            `,
          }}/>
          {/* roads */}
          <svg style={{ position: 'absolute', inset: 0 }} viewBox="0 0 300 320">
            {[30, 90, 150, 210, 260].map((y, i) => (
              <path key={'h' + i} d={`M0 ${y} Q 100 ${y - 10} 300 ${y + 5}`} stroke="#c9c4b8" strokeWidth="1" fill="none"/>
            ))}
            {[40, 120, 200, 260].map((x, i) => (
              <path key={'v' + i} d={`M${x} 0 Q ${x + 10} 160 ${x - 5} 320`} stroke="#c9c4b8" strokeWidth="1" fill="none"/>
            ))}
            <path d="M20 60 Q 120 80 280 100" stroke="#d8d3c5" strokeWidth="3" fill="none"/>
            <circle cx="130" cy="170" r="3" fill="#333"/>
          </svg>
          {/* neighborhood labels */}
          {[
            { t: 'Yonkers', l: '55%', tp: '15%', sz: 11 },
            { t: 'Paterson', l: '10%', tp: '20%', sz: 10 },
            { t: 'New York', l: '42%', tp: '52%', sz: 14, bold: true },
            { t: 'Brooklyn', l: '60%', tp: '65%', sz: 10 },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute', left: p.l, top: p.tp,
              fontFamily: theme.fontSans, fontSize: p.sz, fontWeight: p.bold ? 600 : 400,
              color: '#2a2a2a',
            }}>{p.t}</div>
          ))}
          {/* banner */}
          <div style={{
            position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
            background: theme.color.accent, color: '#fff', padding: '8px 18px', borderRadius: 999,
            fontFamily: theme.fontSans, fontSize: 13, fontWeight: 500,
          }}>Zoom in to your neighborhood</div>
          {/* current location button */}
          <div style={{
            position: 'absolute', left: 14, right: 14, bottom: 14,
            background: theme.color.bgElev, borderRadius: 999,
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: theme.fontSans, fontSize: 14, fontWeight: 600, color: theme.color.ink,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
            Go to current location
          </div>
        </div>
        <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkMute, textAlign: 'center', margin: '10px 0 0' }}>Only neighborhood name is shown</div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled={false}/>
    </>
  );
}

function HeightScreen({ theme }) {
  const heights = [`5' 3"`, `5' 4"`, `5' 5"`, `5' 6"`, `5' 7"`];
  return (
    <>
      <ScreenBody theme={theme} scroll={false}>
        <StepTitle theme={theme}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="3" width="8" height="18" rx="2"/><path d="M8 7h3M8 11h3M8 15h3M8 19h3"/></svg>}
          title="How tall are you?" step={3} total={16}
        />
        <div style={{ padding: '10px 28px 0', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 28, right: 28, top: 114, height: 56,
            background: theme.color.placeholder, opacity: 0.4, borderRadius: 4,
            borderTop: `1px solid ${theme.color.ink}`,
            borderBottom: `1px solid ${theme.color.ink}`,
          }}/>
          {heights.map((h, i) => {
            const dist = Math.abs(i - 2);
            const op = dist === 0 ? 1 : dist === 1 ? 0.45 : 0.2;
            const sz = dist === 0 ? 32 : dist === 1 ? 24 : 20;
            return (
              <div key={h} style={{
                textAlign: 'center', padding: '16px 0',
                fontFamily: theme.fontSans, fontSize: sz,
                fontWeight: dist === 0 ? 600 : 400,
                color: theme.color.ink, opacity: op, position: 'relative',
              }}>{h}</div>
            );
          })}
          <div style={{
            padding: '20px 0 0', marginTop: 20,
            borderTop: `0.5px solid ${theme.color.line}`,
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: theme.fontSans, fontSize: 15, color: theme.color.ink,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
            Always visible on profile
          </div>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled/>
    </>
  );
}

function FamilyPlansScreen({ theme }) {
  const opts = ["Don't want children", 'Want children', 'Open to children', 'Not sure', 'Prefer not to say'];
  return (
    <>
      <ScreenBody theme={theme}>
        <StepTitle theme={theme}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"/><path d="M6 20c0-4 3-7 6-7s6 3 6 7M9 13h6"/></svg>}
          title={<>What are your family<br/>plans?</>} step={4} total={16}
        />
        <div style={{ padding: '0 28px' }}>
          {opts.map((o, i) => (
            <div key={o} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 0', borderBottom: `0.5px solid ${theme.color.line}`,
              fontFamily: theme.fontSans, fontSize: 16, color: theme.color.ink,
            }}>
              {o}
              <span style={{
                width: 20, height: 20, borderRadius: 999,
                background: theme.color.placeholder,
              }}/>
            </div>
          ))}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '22px 0 0',
            fontFamily: theme.fontSans, fontSize: 15, color: theme.color.ink,
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: 4,
              border: `2px solid ${theme.color.accent}`,
            }}/>
            Visible on profile
          </div>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled={false}/>
    </>
  );
}

function PhotoGridScreen({ theme }) {
  return (
    <>
      <ScreenBody theme={theme}>
        <div style={{ padding: '28px 28px 24px' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999, border: `1.5px solid ${theme.color.ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 22,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-6 6"/></svg>
          </div>
          <h1 style={{
            fontFamily: displayFontFor(theme), fontSize: 34, fontWeight: 600,
            color: theme.color.ink, letterSpacing: -0.3, margin: 0, lineHeight: 1.05,
          }}>Pick your videos and<br/>photos</h1>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
          padding: '0 22px',
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              aspectRatio: '1 / 1.15', borderRadius: 12,
              border: `1.5px dashed ${theme.color.inkMute}`,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.color.inkMute} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-6 6"/></svg>
              <div style={{
                position: 'absolute', bottom: 6, right: 6,
                width: 28, height: 28, borderRadius: 999,
                background: theme.color.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 20, fontWeight: 400,
              }}>+</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 28px 0', textAlign: 'left' }}>
          <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkMute }}>Tap to edit, drag to reorder</div>
          <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkMute }}>6 photos/videos required</div>
        </div>
        <div style={{
          margin: '22px 28px 100px', padding: '16px 18px',
          border: `1px solid ${theme.color.line}`, borderRadius: 14,
          textAlign: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.color.ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 6 }}><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0012 3z"/></svg>
          <div style={{ fontFamily: theme.fontSans, fontSize: 14, color: theme.color.ink, lineHeight: 1.4 }}>
            Videos bring your profile to life, giving<br/>others a better sense of who you are.
          </div>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled/>
    </>
  );
}

Object.assign(window, {
  NameScreen, DateOfBirthScreen, ConfirmInfoScreen, NotificationsScreen,
  LocationScreen, HeightScreen, FamilyPlansScreen, PhotoGridScreen,
});
