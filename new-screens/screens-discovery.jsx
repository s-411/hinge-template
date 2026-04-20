// screens-discovery.jsx — Discovery card, Likes You list, Boost modal, Modal dialog, What Works, Profile-self-v2

function DiscoveryScreen({ theme, onNavigate }) {
  return (
    <>
      <ScreenHeader theme={theme}
        left={<span/>}
        title=""
        right={
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <IconRewind size={22} color={theme.color.inkMute} stroke={1.6}/>
            <IconSliders size={22} color={theme.color.ink} stroke={1.6}/>
          </div>
        }
      />
      <ScreenBody theme={theme}>
        <div style={{ padding: '6px 22px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{
            fontFamily: displayFontFor(theme), fontSize: 30, fontWeight: 500,
            color: theme.color.ink, margin: 0, letterSpacing: -0.3,
          }}>Kris</h2>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 5,
            color: theme.color.sage, fontSize: 13, fontWeight: 500,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: theme.color.sage }}/>
            Active today
          </span>
          <div style={{ flex: 1 }}/>
          <IconDots size={22} color={theme.color.ink} stroke={1.6}/>
        </div>

        {/* photo card */}
        <div style={{
          margin: '0 22px', borderRadius: 18, overflow: 'hidden',
          background: '#2a2420', aspectRatio: '1 / 1.05',
          position: 'relative',
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 4px, transparent 4px 10px),
            linear-gradient(140deg, oklch(0.45 0.03 30) 0%, oklch(0.28 0.02 40) 100%)
          `,
        }}>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: 1,
            fontFamily: 'ui-monospace, Menlo, monospace',
          }}>PHOTO 1 / 6</div>
          <button style={{
            position: 'absolute', right: 14, bottom: 14,
            width: 44, height: 44, borderRadius: 999,
            background: theme.color.bgElev, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            <IconHeart size={20} color={theme.color.accent} stroke={1.8}/>
          </button>
        </div>

        {/* prompt card */}
        <div style={{
          margin: '16px 22px 0', padding: '22px 22px 30px',
          background: theme.color.bgCard, borderRadius: 18,
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 14, fontWeight: 500, color: theme.color.ink, opacity: 0.8,
          }}>My most irrational fear</div>
          <div style={{
            fontFamily: displayFontFor(theme), fontSize: 28, fontWeight: 500,
            color: theme.color.ink, marginTop: 8, lineHeight: 1.1, letterSpacing: -0.3,
          }}>Talking to a live bard after 11pm.</div>
        </div>

        {/* floating action row */}
        <div style={{
          position: 'absolute', left: 22, right: 22, bottom: 104,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <button style={{
            width: 52, height: 52, borderRadius: 999,
            background: theme.color.bgElev, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <IconX size={20} color={theme.color.ink} stroke={1.8}/>
          </button>
          <button style={{
            width: 52, height: 52, borderRadius: 999,
            background: theme.color.bgElev, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <IconHeart size={20} color={theme.color.accent} stroke={1.8}/>
          </button>
        </div>
      </ScreenBody>
      <TabBar theme={theme} active="discover" onNavigate={onNavigate} badges={{ likes: 3, chats: 1 }}/>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Likes You + Boost modal (sheet)
// ─────────────────────────────────────────────────────────────
function LikesBoostScreen({ theme, onNavigate }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* dimmed background showing likes list */}
      <div style={{ position: 'absolute', inset: 0, background: theme.color.bg }}>
        <ScreenHeader theme={theme}
          left={<h1 style={{
            fontFamily: displayFontFor(theme), fontSize: 32, fontWeight: 500,
            color: theme.color.ink, margin: 0, letterSpacing: -0.3,
          }}>Likes You</h1>}
          title=""
          right={<BoostPill theme={theme}/>}
        />
        <div style={{ padding: '20px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              aspectRatio: '1 / 1.25', background: theme.color.placeholder,
              borderRadius: 14, filter: 'blur(2px)', position: 'relative',
              backgroundImage: `linear-gradient(140deg, oklch(0.82 0.04 ${30 + i * 40}) 0%, oklch(0.6 0.06 ${50 + i * 40}) 100%)`,
            }}/>
          ))}
        </div>
      </div>
      <div style={{
        position: 'absolute', inset: 0, background: theme.color.overlay,
      }}/>
      {/* bottom sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: theme.color.bgElev,
        borderRadius: '28px 28px 0 0',
        padding: '28px 24px 110px',
      }}>
        <div style={{
          position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)',
          width: 64, height: 64, borderRadius: 999,
          background: theme.color.sage,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        }}>
          <IconBolt size={26} color="#fff" fill="#fff" stroke={1.5}/>
        </div>
        <button style={{
          position: 'absolute', top: 22, right: 22, background: 'none', border: 'none', cursor: 'pointer',
        }}>
          <IconX size={22} color={theme.color.ink} stroke={1.6}/>
        </button>
        <h2 style={{
          fontFamily: displayFontFor(theme), fontSize: 32, fontWeight: 500,
          color: theme.color.ink, textAlign: 'center', margin: '18px 0 10px',
          letterSpacing: -0.3, lineHeight: 1.1, textWrap: 'pretty',
        }}>Boost your profile<br/>for more views</h2>
        <p style={{
          fontFamily: theme.fontSans, fontSize: 15, color: theme.color.inkSoft,
          textAlign: 'center', margin: '0 0 24px', lineHeight: 1.4,
        }}>Get seen by 11× more people for<br/>one hour.</p>

        {[
          { n: 1, price: '$9.99', rec: false },
          { n: 3, price: '$8.99', rec: true },
          { n: 5, price: '$7.99', rec: false },
        ].map(o => (
          <div key={o.n} style={{ position: 'relative', marginBottom: 10 }}>
            {o.rec && (
              <span style={{
                position: 'absolute', top: -10, right: 22,
                background: theme.color.sageSoft,
                color: theme.color.sage,
                padding: '4px 10px', borderRadius: 999,
                fontFamily: theme.fontSans, fontSize: 12, fontWeight: 600,
                border: `0.5px solid ${theme.color.sage}`,
              }}>Recommended</span>
            )}
            <div style={{
              padding: '16px 22px', borderRadius: 999,
              background: theme.color.bgCard,
              border: `1.5px solid ${theme.color.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600,
              color: theme.color.ink,
            }}>
              {o.n} Boost{o.n > 1 ? 's' : ''}
              <span style={{ color: theme.color.sage, fontWeight: 600 }}>{o.price} each</span>
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 16, background: theme.color.bgCard, padding: '18px 20px',
          borderRadius: 18, textAlign: 'center',
        }}>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 14, color: theme.color.ink, marginBottom: 14, lineHeight: 1.4,
          }}>Increase your chances of getting more<br/>likes with a 24 hour Superboost</div>
          <button style={{
            width: '100%', padding: '16px 22px', borderRadius: 999,
            background: theme.color.sage, color: '#fff', border: 'none',
            fontFamily: theme.fontSans, fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>Superboost for $19.99</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Modal dialog over likes list
// ─────────────────────────────────────────────────────────────
function ModalScreen({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: theme.color.bg }}>
        <ScreenHeader theme={theme}
          left={<h1 style={{
            fontFamily: displayFontFor(theme), fontSize: 32, fontWeight: 500,
            color: theme.color.ink, margin: 0,
          }}>Likes You</h1>}
          title="" right={<BoostPill theme={theme}/>}
        />
        <div style={{
          margin: '80px auto', width: 140, height: 140, opacity: 0.25,
        }}>
          <svg viewBox="0 0 140 140" width="100%" height="100%">
            <circle cx="70" cy="75" r="40" fill={theme.color.accentSoft}/>
            <path d="M70 50c-8 0-15 7-15 15s15 25 15 25 15-15 15-25-7-15-15-15z"
              fill={theme.color.accent}/>
            {[0,1,2,3,4,5,6,7].map(i => {
              const a = i * 45;
              const r = 58;
              const x = 70 + Math.cos(a * Math.PI / 180) * r;
              const y = 75 + Math.sin(a * Math.PI / 180) * r;
              return <line key={i} x1={70} y1={75} x2={x} y2={y} stroke={theme.color.ink} strokeWidth="1.5" strokeLinecap="round"/>;
            })}
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: theme.color.overlay }}/>
      <div style={{
        position: 'absolute', left: 22, right: 22, top: '30%',
        background: theme.color.bgElev, borderRadius: 18,
        padding: '34px 28px 26px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
      }}>
        <h2 style={{
          fontFamily: displayFontFor(theme), fontSize: 30, fontWeight: 500,
          color: theme.color.ink, margin: 0, letterSpacing: -0.3,
          lineHeight: 1.1, textWrap: 'pretty',
        }}>You choose whether<br/>to connect with the<br/>people that like you.</h2>
        <div style={{ height: 1, background: theme.color.line, margin: '22px 0 18px' }}/>
        <div style={{
          fontFamily: theme.fontSans, fontSize: 16, fontWeight: 600,
          color: theme.color.accent,
        }}>OK got it</div>
      </div>
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 110,
        background: theme.color.bgElev,
        borderRadius: 999, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 14, opacity: 0.6,
      }}>
        <button style={{
          background: theme.color.ink, color: theme.color.bg,
          padding: '10px 18px', borderRadius: 999, border: 'none',
          fontFamily: theme.fontSans, fontSize: 13, fontWeight: 600, flexShrink: 0,
        }}>Upgrade</button>
        <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.ink, lineHeight: 1.35 }}>
          Upgrade to Preferred to access all your likes at once.
        </div>
      </div>
      <TabBar theme={theme} active="likes"/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// What Works — 4-card grid of editorial guides
// ─────────────────────────────────────────────────────────────
const WW_ITEMS = [
  { t: 'Photos', s: 'How to pick your best 6 photos.', ill: 'camera' },
  { t: 'Prompts', s: 'Show your personality with unique answers.', ill: 'quote' },
  { t: 'Matching', s: 'Every match starts with a like — make it count.', ill: 'sun' },
  { t: 'Conversation', s: 'Learn how to move your convos to a date.', ill: 'chat' },
];

function WhatWorksScreen({ theme }) {
  return (
    <>
      <ScreenHeader theme={theme}
        left={<span/>} title="What Works" center
        right={<IconX size={22} color={theme.color.ink} stroke={1.6}/>}
        borderBottom
      />
      <ScreenBody theme={theme}>
        <p style={{
          fontFamily: theme.fontSans, fontSize: 16, color: theme.color.ink,
          textAlign: 'center', padding: '20px 40px', margin: 0, lineHeight: 1.45,
        }}>Expert dating guides to help you along your Connect journey.</p>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          padding: '8px 22px 110px',
        }}>
          {WW_ITEMS.map(it => (
            <div key={it.t} style={{
              background: theme.color.bgCard, borderRadius: 16,
              padding: '18px 16px', display: 'flex', flexDirection: 'column',
              minHeight: 220,
              border: `0.5px solid ${theme.color.line}`,
            }}>
              <div style={{
                fontFamily: displayFontFor(theme), fontSize: 26, fontWeight: 500,
                color: theme.color.ink, letterSpacing: -0.2,
              }}>{it.t}</div>
              <div style={{
                fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkSoft,
                marginTop: 4, lineHeight: 1.4,
              }}>{it.s}</div>
              <div style={{
                flex: 1, marginTop: 12, borderRadius: 10,
                background: theme.color.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <WWIllo kind={it.ill} theme={theme}/>
              </div>
            </div>
          ))}
        </div>
      </ScreenBody>
    </>
  );
}

function WWIllo({ kind, theme }) {
  const ink = theme.color.ink;
  const acc = theme.color.accent;
  if (kind === 'camera') return (
    <svg viewBox="0 0 120 80" width="90%">
      <rect x="18" y="18" width="84" height="52" rx="6" fill="none" stroke={ink} strokeWidth="1.5"/>
      <circle cx="60" cy="44" r="16" fill="none" stroke={ink} strokeWidth="1.5"/>
      <circle cx="60" cy="44" r="10" fill={theme.color.accentSoft}/>
      <rect x="48" y="12" width="24" height="10" fill="none" stroke={ink} strokeWidth="1.5"/>
      <circle cx="92" cy="28" r="2" fill={ink}/>
    </svg>
  );
  if (kind === 'quote') return (
    <svg viewBox="0 0 120 80" width="90%">
      <rect x="12" y="16" width="96" height="42" rx="4" fill="none" stroke={ink} strokeWidth="1.5"/>
      <path d="M22 28h60M22 36h72M22 44h50" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="96" cy="66" r="14" fill={theme.color.accentSoft}/>
      <path d="M92 62c1 2 1 4 0 6M100 62c1 2 1 4 0 6" stroke={ink} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (kind === 'sun') return (
    <svg viewBox="0 0 120 80" width="90%">
      <circle cx="60" cy="44" r="18" fill={theme.color.accentSoft} stroke={ink} strokeWidth="1.5"/>
      <path d="M56 42a4 4 0 018 0 6 6 0 01-4 6 6 6 0 01-4-6z" fill={acc}/>
      {[0,1,2,3,4,5,6,7].map(i => {
        const a = i * 45 - 90;
        const x1 = 60 + Math.cos(a * Math.PI / 180) * 26;
        const y1 = 44 + Math.sin(a * Math.PI / 180) * 26;
        const x2 = 60 + Math.cos(a * Math.PI / 180) * 34;
        const y2 = 44 + Math.sin(a * Math.PI / 180) * 34;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth="1.5" strokeLinecap="round"/>;
      })}
    </svg>
  );
  return (
    <svg viewBox="0 0 120 80" width="90%">
      <rect x="16" y="18" width="70" height="38" rx="4" fill={theme.color.accentSoft} stroke={ink} strokeWidth="1.5"/>
      <path d="M30 56l-4 8 12-8" fill={theme.color.accentSoft} stroke={ink} strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="40" y="32" width="60" height="38" rx="4" fill={theme.color.bg} stroke={ink} strokeWidth="1.5"/>
      <path d="M90 70l4 8-12-8" fill={theme.color.bg} stroke={ink} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

// Profile v2 with prompt-poll banner (matches last screenshot)
function ProfileDaisyScreen({ theme, onNavigate }) {
  return (
    <>
      <ScreenBody theme={theme}>
        <div style={{
          padding: '16px 22px 0', display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 54, height: 54, borderRadius: 999, overflow: 'hidden',
            background: `linear-gradient(140deg, oklch(0.84 0.04 60) 0%, oklch(0.55 0.06 40) 100%)`,
          }}>
            <ProfileAvatar size={54} seed="daisy"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: displayFontFor(theme), fontSize: 28, fontWeight: 500,
              color: theme.color.ink, letterSpacing: -0.3,
            }}>Daisy</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5, marginTop: 2,
              fontFamily: theme.fontSans, fontSize: 13, color: theme.color.inkSoft,
            }}>
              Connect member
              <svg width="12" height="12" viewBox="0 0 24 24" fill={theme.color.ink}>
                <path d="M12 2l2 2 3-.5.5 3 2 2-2 2-.5 3-3-.5-2 2-2-2-3 .5-.5-3-2-2 2-2 .5-3 3 .5 2-2z"/>
              </svg>
            </div>
          </div>
          <BoostPill theme={theme}/>
        </div>
        <div style={{ margin: '22px', background: theme.color.accentSoft, borderRadius: 18, padding: '28px 24px 22px', textAlign: 'center' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 999, background: `oklch(0.7 0.08 35 / 0.6)`,
            margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconList size={22} color={theme.color.accent} stroke={1.8}/>
          </div>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 18, fontWeight: 700,
            color: theme.color.ink,
          }}>Add a Prompt Poll</div>
          <div style={{
            fontFamily: theme.fontSans, fontSize: 14, color: theme.color.ink,
            marginTop: 6, lineHeight: 1.4,
          }}>Kick-start the conversation with<br/>your matches.</div>
          <button style={{
            marginTop: 18, padding: '14px 40px', borderRadius: 999,
            background: theme.color.accent, color: '#fff', border: 'none',
            fontFamily: theme.fontSans, fontSize: 15, fontWeight: 600,
            cursor: 'pointer',
          }}>Check it out</button>
        </div>
        <div style={{ padding: '0 22px' }}>
          {['Edit Profile','Dating Preferences','Settings','Help Center'].map((l, i, arr) => {
            const icons = [<IconPencil size={20} color={theme.color.ink} stroke={1.6}/>,
                           <IconSliders size={20} color={theme.color.ink} stroke={1.6}/>,
                           <IconGear size={20} color={theme.color.ink} stroke={1.6}/>,
                           <IconBulb size={20} color={theme.color.ink} stroke={1.6}/>];
            return (
              <div key={l} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 0',
                borderBottom: i < arr.length - 1 ? `0.5px solid ${theme.color.line}` : 'none',
                fontFamily: theme.fontSans, fontSize: 17, color: theme.color.ink,
              }}>
                {l}
                {icons[i]}
              </div>
            );
          })}
        </div>
        <div style={{
          margin: '14px 22px 120px', padding: '12px 16px',
          background: theme.color.bgElev, borderRadius: 999,
          display: 'flex', alignItems: 'center', gap: 14,
          border: `0.5px solid ${theme.color.line}`,
        }}>
          <button style={{
            background: theme.color.ink, color: theme.color.bg,
            padding: '10px 18px', borderRadius: 999, border: 'none',
            fontFamily: theme.fontSans, fontSize: 13, fontWeight: 600, flexShrink: 0,
          }}>Learn more</button>
          <div style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.color.ink, lineHeight: 1.35 }}>
            Preferred Members go on twice as many dates.
          </div>
        </div>
      </ScreenBody>
      <TabBar theme={theme} active="profile" onNavigate={onNavigate} badges={{ likes: 2, chats: 2 }}/>
    </>
  );
}

Object.assign(window, { DiscoveryScreen, LikesBoostScreen, ModalScreen, WhatWorksScreen, ProfileDaisyScreen });
