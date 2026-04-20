// screens-onboarding.jsx — Welcome, sign-in, intro, education

function WelcomeScreen({ theme }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `
        radial-gradient(ellipse at 70% 40%, oklch(0.45 0.08 35 / 0.4) 0%, transparent 50%),
        repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 6px),
        linear-gradient(170deg, #3a2419 0%, #0e0806 100%)
      `,
    }}>
      <div style={{
        position: 'absolute', top: '18%', left: 0, right: 0, textAlign: 'center',
        color: '#fff', zIndex: 2,
      }}>
        <h1 style={{
          fontFamily: theme.fontSans, fontSize: 54, fontWeight: 300,
          margin: 0, letterSpacing: -1, lineHeight: 1,
        }}>connect</h1>
        <p style={{
          fontFamily: displayFontFor(theme), fontSize: 20, fontWeight: 400,
          margin: '18px 0 0', opacity: 0.88, letterSpacing: 0.1,
        }}>For people who date slowly.</p>
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 32,
        padding: '0 24px', zIndex: 2,
      }}>
        <p style={{
          fontFamily: theme.fontSans, fontSize: 12, lineHeight: 1.55,
          color: 'rgba(255,255,255,0.7)', textAlign: 'center', margin: '0 0 20px',
        }}>
          By tapping 'Sign in' / 'Create account', you agree to our{' '}
          <span style={{ textDecoration: 'underline', fontWeight: 500 }}>Terms of Service</span>. Learn how we process your data in our{' '}
          <span style={{ textDecoration: 'underline', fontWeight: 500 }}>Privacy Policy</span>.
        </p>
        <button style={{
          width: '100%', height: 56, borderRadius: 999,
          background: theme.color.accent, color: '#fff',
          border: 'none', fontFamily: theme.fontSans,
          fontSize: 16, fontWeight: 600, cursor: 'pointer',
          marginBottom: 16, letterSpacing: 0.1,
        }}>Create account</button>
        <div style={{
          textAlign: 'center', color: '#fff', fontSize: 15, fontWeight: 500,
          fontFamily: theme.fontSans,
        }}>Sign in</div>
      </div>
    </div>
  );
}

function IntroScreen({ theme }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        paddingTop: 110, paddingLeft: 32, paddingRight: 32,
      }}>
        <h1 style={{
          fontFamily: displayFontFor(theme), fontWeight: 500,
          fontSize: 44, lineHeight: 1.05, color: theme.color.ink,
          letterSpacing: -0.5, margin: 0,
        }}>A warmer way<br/>to meet someone.</h1>

        {/* Abstract "mascot" — concentric strokes with two dots */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 20,
        }}>
          <svg width="220" height="220" viewBox="0 0 220 220">
            <circle cx="110" cy="108" r="82" fill={theme.color.accentSoft} opacity="0.6"/>
            <circle cx="110" cy="108" r="82" fill="none" stroke={theme.color.ink} strokeWidth="1.5" strokeDasharray="2 4"/>
            <line x1="60" y1="155" x2="160" y2="155" stroke={theme.color.ink} strokeWidth="2" strokeLinecap="round"/>
            <circle cx="90" cy="150" r="10" fill={theme.color.bg} stroke={theme.color.ink} strokeWidth="2"/>
            <circle cx="90" cy="150" r="4" fill={theme.color.ink}/>
            <circle cx="130" cy="150" r="10" fill={theme.color.bg} stroke={theme.color.ink} strokeWidth="2"/>
            <circle cx="130" cy="150" r="4" fill={theme.color.ink}/>
          </svg>
        </div>
      </div>
      <div style={{
        background: theme.color.accent, padding: '28px 0 46px',
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          color: '#fff', fontFamily: theme.fontSans, fontSize: 17, fontWeight: 600,
        }}>Continue</div>
      </div>
    </div>
  );
}

function EducationScreen({ theme }) {
  const [selected, setSelected] = React.useState('Undergrad');
  const opts = ['High School', 'Undergrad', 'Postgrad', 'Prefer not to say'];
  return (
    <>
      <ScreenBody theme={theme} scroll={false}>
        <StepTitle
          theme={theme}
          icon={<IconCap size={22} color={theme.color.ink} stroke={1.6}/>}
          title={<>What's the highest<br/>level you attained?</>}
          step={2} total={11}
        />
        <div style={{ padding: '0 28px' }}>
          {opts.map((o, i) => (
            <button key={o} onClick={() => setSelected(o)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '22px 0', background: 'none', border: 'none',
              borderBottom: `0.5px solid ${theme.color.line}`,
              fontFamily: theme.fontSans, fontSize: 17, fontWeight: 400,
              color: theme.color.ink, cursor: 'pointer', textAlign: 'left',
            }}>
              {o}
              <span style={{
                width: 22, height: 22, borderRadius: 999,
                background: selected === o ? theme.color.accent : theme.color.placeholder,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selected === o && <IconCheck size={12} color="#fff" stroke={2.5}/>}
              </span>
            </button>
          ))}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '28px 0 0',
            fontFamily: theme.fontSans, fontSize: 15, color: theme.color.ink,
          }}>
            <IconEyeOff size={18} color={theme.color.ink} stroke={1.6}/>
            Hidden on profile
          </div>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme} enabled={!!selected}/>
    </>
  );
}

Object.assign(window, { WelcomeScreen, IntroScreen, EducationScreen });
