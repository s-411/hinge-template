// screens-prompts.jsx — profile answers + prompt library

const PROMPT_CATEGORIES = ['Self-care', 'About me', "Let's chat about", 'My type', 'Dating me'];

const PROMPTS_BY_CAT = {
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
    "I geek out on",
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
    "Dating me is like",
    'The key to my heart is',
    'My love language is',
    "Let's make sure we're on the same page about",
  ],
};

function PromptLibraryScreen({ theme }) {
  const [cat, setCat] = React.useState('Self-care');
  return (
    <>
      <ScreenHeader theme={theme}
        left={<span style={{ color: theme.color.accent, fontSize: 16, fontWeight: 500 }}>View All</span>}
        title="Select a Prompt"
        right={<IconX size={22} color={theme.color.ink} stroke={1.6}/>}
        borderBottom
      />
      <ScreenBody theme={theme}>
        {/* category pills */}
        <div style={{
          display: 'flex', gap: 10, padding: '16px 20px 10px',
          overflowX: 'auto', borderBottom: `0.5px solid ${theme.color.line}`,
        }}>
          {PROMPT_CATEGORIES.map(c => {
            const active = c === cat;
            const isNew = c === 'Self-care';
            return (
              <button key={c} onClick={() => setCat(c)} style={{
                position: 'relative', flexShrink: 0,
                padding: '8px 18px', borderRadius: 999,
                background: active ? theme.color.accent : 'transparent',
                color: active ? '#fff' : theme.color.accent,
                border: `1.5px solid ${theme.color.accent}`,
                fontFamily: theme.fontSans, fontSize: 15, fontWeight: 500,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                {isNew && (
                  <span style={{
                    position: 'absolute', top: -9, left: -6,
                    background: theme.color.bgElev,
                    color: theme.color.accent,
                    fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                    padding: '2px 6px', borderRadius: 6,
                    border: `1px solid ${theme.color.accent}`,
                  }}>NEW</span>
                )}
                {c}
              </button>
            );
          })}
        </div>
        <div style={{ padding: '4px 0 110px' }}>
          {PROMPTS_BY_CAT[cat].map((p, i) => (
            <div key={p} style={{
              padding: '22px 22px', borderBottom: `0.5px solid ${theme.color.lineSoft}`,
              fontFamily: theme.fontSans, fontSize: 16, color: theme.color.ink,
              cursor: 'pointer',
            }}>{p}</div>
          ))}
        </div>
      </ScreenBody>
    </>
  );
}

function ProfileBuilderScreen({ theme, onOpenLibrary }) {
  return (
    <>
      <ScreenBody theme={theme}>
        <StepTitle
          theme={theme}
          icon={<IconQuote size={22} color={theme.color.ink} stroke={1.6}/>}
          title={<>Write your profile<br/>answers</>}
          step={5} total={11}
        />
        <div style={{ padding: '0 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[0, 1, 2].map(i => (
            <button key={i} onClick={onOpenLibrary} style={{
              position: 'relative',
              border: `1.5px dashed ${theme.color.inkMute}`,
              borderRadius: 14, background: 'transparent',
              padding: '22px 22px', textAlign: 'left', cursor: 'pointer',
              fontFamily: theme.fontSans,
            }}>
              <div style={{
                fontStyle: 'italic', fontSize: 16, color: theme.color.inkMute, marginBottom: 4,
              }}>Select a Prompt</div>
              <div style={{
                fontStyle: 'italic', fontSize: 16, color: theme.color.inkMute, opacity: 0.7,
              }}>And write your own answer</div>
              <span style={{
                position: 'absolute', top: -14, right: 16,
                width: 34, height: 34, borderRadius: 999,
                background: theme.color.accent, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconPlus size={18} color="#fff" stroke={2.2}/>
              </span>
            </button>
          ))}
          <div style={{
            fontFamily: theme.fontSans, fontSize: 14, color: theme.color.inkMute,
            marginTop: 4,
          }}>3 answers required</div>
        </div>
      </ScreenBody>
      <ArrowFAB theme={theme}/>
    </>
  );
}

Object.assign(window, { PromptLibraryScreen, ProfileBuilderScreen });
